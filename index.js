const http = require('http')
const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const { mainModule } = require('process')
const { json } = require('express')
const fetch = require('node-fetch')

dotenv.config();

const app = express();
app.set('view engine', 'ejs')
app.set('view options', { layout: 'main.ejs' })
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//----------------//Environment Config//----------------//


const envConfig = {
   apiKey: process.env.API_KEY,
   merchantAccount: process.env.merchantAccount,
   clientKey: process.env.CLIENT_KEY
}

const demoPaymentMethodConfig = {
   merchantAccount: envConfig.merchantAccount,
   countryCode: "AU",
   amount: {
      currency: "AUD",
      value: 100
   },
   channel: "Web",
   shopperLocale: "en-AU"
}

const payerInfo = {
   holderName: "P Sherman",
   shopperEmail: "psherman@sherman.com",
   shopperIP: '127.0.0.1',
   billingAddress: {
     street: "42 Wallaby Way",
     postalCode: "2000",
     houseNumberOrName: "Apartment 2",
     city: "Sydney",
     stateOrProvince: "New South Wales",
     country: "Australia"
   },
   amount: {
      value: demoPaymentMethodConfig.amount.value,
      currency: demoPaymentMethodConfig.amount.currency
   }
 }

//----------------//Utilities//----------------//


//Temporary data store if additional details are needed
const tempPaymentData = {};

//Helper function to call Adyen APIs
async function callExternalApi(url, data, method) {
   try {

      const axiosConfig = {
         method: method,
         url: url,
         headers: {
            'x-API-key': envConfig.apiKey,
            'content-type': 'application-json'
         },
         data: data
      }

      console.log('External API Request to ' + axiosConfig.url + ': ' + JSON.stringify(axiosConfig.data) + `\n`);

      const externalApiResponse = await axios(axiosConfig);

      console.log('External API Response from ' + axiosConfig.url + ': ' + JSON.stringify(externalApiResponse.data) + `\n`);

      return externalApiResponse.data;

   } catch (error) {
      console.log(`External API Call Error: ` + JSON.stringify(error.response.data))
      return (error.response.data);
   }
   
}

//----------------//SERVER ENDPOINTS//----------------//


//Submit payment to Adyen /payments API
app.post("/api/initiatePayment", async (req, res) => {

   const orderRef = uuidv4();

   const paymentPayload = {
      paymentMethod: req.body.paymentMethod,
      browserInfo: req.body.browserInfo,
      billingAddress: req.body.billingAddress,
      shopperEmail: req.body.shopperEmail,
      shopperIP: req.body.shopperIP,
      merchantAccount: envConfig.merchantAccount,
      amount: {
         currency: demoPaymentMethodConfig.amount.currency,
         value: demoPaymentMethodConfig.amount.value
      },
      reference: orderRef,
      origin: `http://localhost:${process.env.PORT}`,
      //Redirect URL if payment requires redirect
      returnUrl: `http://localhost:${process.env.PORT}/api/handleShopperRedirect?orderRef=${orderRef}`,
      additionalData: {
         //Flag to indicate that payment should utilize native 3DS2
         allow3DS2: true
      },
      channel: 'web'
   }

   const paymentResult = await callExternalApi('https://checkout-test.adyen.com/v67/payments', paymentPayload, 'post')

   const { resultCode } = paymentResult;
   const { action } = paymentResult;
   const { pspReference } = paymentResult

   if (paymentResult.status) {
      const status = paymentResult.status;
      const message = paymentResult.message;
      const psp = paymentResult.pspReference;
      res.redirect(`/service_error?pspReference=${psp}&message=${message}&status=${status}`);
      return;
   }

   //If Action code is non-null, cache PaymentData reference value
   //Then send result code and action back to client

   if (action) {
      console.log("Action required - caching PaymentData and sending action to Dropin: " + JSON.stringify(paymentResult) + `\n`);
      tempPaymentData[orderRef] = action.paymentData
   }
   res.json(paymentResult);

});

/*Handle redirects when Drop-in client sends user to returnURL after 
  user completes additional actions (e.g. redirect, 3DS)       */
app.all("/api/handleShopperRedirect", async (req, res) => {

   const orderRef = req.query.orderRef;
   
   //If GET, extract redirect from URL ; if POST, extract from body
   const redirect = req.method === "GET" ? req.query : req.body;
   const details = {};
   console.log("Received redirect from Drop-in: " + JSON.stringify(redirect) + `\n`)

   //Create details object for submission to /payments/details
   if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult;
   }

   //Create payload for /payments/details
   const detailsPayload = {
      details,
      //paymentData: tempPaymentData[orderRef]
   };

   const redirectDetailsResult = await callExternalApi('https://checkout-test.adyen.com/v67/payments/details', detailsPayload, 'post')

   //Redirect to service_error page if Adyen API returns an error
   if (redirectDetailsResult.errorCode) {
      const status = redirectDetailsResult.status;
      const message = redirectDetailsResult.message;
      const psp = redirectDetailsResult.pspReference;
      res.redirect(`/service_error?pspReference=${psp}&message=${message}&status=${status}`);
      return;
   }

   //Send user to results page based on resultCode received
   switch (redirectDetailsResult.resultCode) {
      case "Authorised":
         res.redirect(`/success?pspreference=${redirectDetailsResult.pspReference}&merchantreference=${redirectDetailsResult.merchantReference}`);
         break;
      case "Pending":
      case "Received":
         res.redirect("/pending");
         break;
      case "Refused":
         res.redirect("/failed");
         break;
      default:
         res.redirect(`/error?resultcode=${res.resultCode}&refusalreason=${res.refusalReason}&pspreference=${res.pspReference}&refusalreasoncode=${res.refusalReasonCode}&merchantreference=${res.merchantReference}`);
         break;
   }

});

//Submit additional details to Adyen API when required
app.post('/api/submitAdditionalDetails', async (req, res) => {

   const additionalDetailsPayload = {
      details: req.body.details,
      paymentData: req.body.paymentData
   }

   const additionalDetailsResult = await callExternalApi('https://checkout-test.adyen.com/v67/payments/details', additionalDetailsPayload, 'post')

   if (additionalDetailsResult.errorCode) {
      const status = additionalDetailsResult.status;
      const message = additionalDetailsResult.message;
      const psp = additionalDetailsResult.pspReference;
      res.redirect(`/service_error?pspReference=${psp}&message=${message}&status=${status}`);
      return;
   }

   res.json(additionalDetailsResult);

});



//----------------//CLIENT ENDPOINTS//----------------//


//Home page for this demo
app.get('/checkout', async (req, res) => {

   const paymentMethodsPayload = {
      merchantAccount: demoPaymentMethodConfig.merchantAccount,
      countryCode: demoPaymentMethodConfig.countryCode,
      amount: {
         value: demoPaymentMethodConfig.amount.value
      },
      channel: demoPaymentMethodConfig.channel,
      shopperLocale: demoPaymentMethodConfig.shopperLocale
   }

   const paymentMethodsResult = await callExternalApi('https://checkout-test.adyen.com/v67/paymentMethods', paymentMethodsPayload, 'post')

   if (paymentMethodsResult.errorCode){
      const status = paymentMethodsResult.status;
      const message = paymentMethodsResult.message;
      const psp = paymentMethodsResult.pspReference;
      res.redirect(`/service_error?pspreference=${psp}&message=${message}&status=${status}`)
      return;
   }
   
   res.render("payment", {
      clientKey: envConfig.clientKey,
      paymentMethodsResponse: JSON.stringify(paymentMethodsResult),
      payerInfo: JSON.stringify(payerInfo)
   });
})

app.get('/success', async (req, res) => {
   res.render("success")
})

app.get('/pending', async (req, res) => {
   res.render("pending");
})

app.get('/failed', async (req, res) => {
   res.render("failed");
})

app.get('/error', async (req, res) => {
   res.render("error");
})

app.get('/service_error', async (req, res) => {
   res.render("service_error");
})

app.get('/', function (req, res) {
   res.redirect('/checkout');
});

//Start Server
const PORT = process.env.PORT || 3000

app.listen(process.env.PORT, () => {
   console.log(`Server started on port ${PORT}`)
})