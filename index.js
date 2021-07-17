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

//Template directory
app.use(express.static(path.join(__dirname, "/public")));

//create Config object manually
const envConfig = {
   apiKey: process.env.API_KEY,
   merchantAccount: process.env.merchantAccount,
   clientKey: process.env.CLIENT_KEY
}

const demoPaymentMethodConfig = {
   merchantAccount: envConfig.merchantAccount,
   countryCode: "NL",
   amount: {
      currency: "EUR",
      value: 1000
   },
   channel: "Web",
   shopperLocale: "en-US"
}

//temporary data store if additional details are needed
const tempPaymentData = {};


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

      const externalApiResponse = await axios(axiosConfig);

      console.log('External API Response: ' + JSON.stringify(externalApiResponse.data));

      return externalApiResponse.data;

   } catch (error) {
      console.log(`External API Call Error: ` + JSON.stringify(error.response.data))
      return (error.response.data);
   }
 }


//----------------//SERVER Endpoints//----------------//


app.post("/api/initiatePayment", async (req, res) => {
   //try {
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
               //flag to indicate that integration can handle native 3DS2
               allow3DS2: true
            },
            channel: 'web'     
      }

      console.log(`Submitting payment for order reference number : ${orderRef}`);

      const paymentResult = await callExternalApi ('https://checkout-test.adyen.com/v67/payments',paymentPayload, 'post')
      
      console.log("Initial payment response: " + JSON.stringify(paymentResult.data))
/*
      const axiosInitiatePayment = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/payments',
         headers: {
            'x-API-key': envConfig.apiKey,
            'content-type': 'application-json'
         },
         data: {
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
               //flag to indicate that integration can handle native 3DS2
               allow3DS2: true
            },
            channel: 'web'            
         }
      }
      console.log(`Submitting payment for order reference number : ${orderRef}`);

      const paymentResult = await axios(axiosInitiatePayment);

      console.log("Initial payment response: " + JSON.stringify(paymentResult.data))*/

      const { resultCode } = paymentResult;
      const { action } = paymentResult;
      const { pspReference } = paymentResult

      /*
      console.log(`Result code: ${resultCode}`);
      console.log(`Action: ${action.type}`);
      console.log(`PSP Reference: ${pspReference}`);
      console.log('Full Action:' + JSON.stringify(action));*/

      if (paymentResult.status){
         const status = redirectDetailsResult.status;
         const message = redirectDetailsResult.message;
         const psp = redirectDetailsResult.pspReference;
         res.redirect(`/service_error?pspReference=${psp}&message=${message}&status=${status}`);
         return;
      }

      //If Action code is non-null, cache PaymentData reference value
      //Then send result code and action back to client
      
      if (action) {
         console.log("Action required - caching PaymentData");
         tempPaymentData[orderRef] = action.paymentData
      }
      
      res.json(paymentResult);
   //}
/*
   catch (error) {
      res.render("error", {
         errorResponseStatus: error.response.status,
         errorURL: error.response.config.url
      })
   }*/

});


//receive payload from Drop-in for redirect (based on returnURL in initial payment)
//get order ref number (will depend on if GET or POST)
//decode redirect URL to get orderRef number and redirect result
//pass details object (with redirect result) to /payments/details
//get resultcode and psp reference 
//To DO: POLi and AliPay methods
app.all("/api/handleShopperRedirect", async (req, res) => {

   const orderRef = req.query.orderRef;

   //if GET, extract redirect from URL ; if POST, extract from body
   const redirect = req.method === "GET" ? req.query : req.body;
   const details = {};

   console.log("Redirect payload: " + JSON.stringify(redirect))

   //create details object for submission to /payments/details
   if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult;
   }

   //3DS1 parameters?
   else {
      details.MD = redirect.MD;
      details.PaRes = redirect.PaRes;
   }

   //create payload for /payments/details
   const detailsPayload = {
      details
      //paymentData: tempPaymentData[orderRef] + '_'
      //to do: delete cached PaymentData[orderRef]
   };

   console.log (JSON.stringify(detailsPayload));

   const redirectDetailsResult = await callExternalApi ('https://checkout-test.adyen.com/v67/payments/details',detailsPayload, 'post')
   console.log ('Redirect result: ' + JSON.stringify(redirectDetailsResult));

   if (redirectDetailsResult.status){
      const status = redirectDetailsResult.status;
      const message = redirectDetailsResult.message;
      const psp = redirectDetailsResult.pspReference;
      res.redirect(`/service_error?pspReference=${psp}&message=${message}&status=${status}`);
      return;
   }

   //res.json(redirectDetailsResult);
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
   /*
   try {
      console.log("Sending from redirect to submit details" + JSON.stringify(detailsPayload));
      const axiosConfigPaymentDetails = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/payments/details',
         headers: {
            'x-API-key': envConfig.apiKey,
            'content-type': 'application-json'
         },
         data: {
            details: detailsPayload.details
         }
      }

      const paymentDetailsResult = await axios(axiosConfigPaymentDetails);

      const detailsResultCode = paymentDetailsResult.data.resultCode;
      const detailsPSPRef = paymentDetailsResult.data.pspReference;
      console.log("detailsResultCode: " + detailsResultCode)
      console.log("detailsPSPRef: " + detailsPSPRef)


      // Conditionally handle different result codes for the shopper
      switch (detailsResultCode) {
         case "Authorised":
            res.redirect("/success");
            break;
         case "Pending":
         case "Received":
            res.redirect("/pending");
            break;
         case "Refused":
            res.redirect("/failed");
            break;
         default:
            res.redirect("/error");
            break;
      }
   }
   catch (error) {
      console.log(`Handle Redirect server Error Response:: ` + JSON.stringify(error.response.data))
      res.status(error.response.data.status).json(error.message);
   }
});*/

app.post('/api/submitAdditionalDetails', async (req, res) => {
   
   console.log("Submitting additional payment details: " + JSON.stringify(req.body.details));
   
   try {

      const axiosConfigAdditionalDetails = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/payments/details',
         headers: {
            'x-API-key': envConfig.apiKey,
            'content-type': 'application-json'
         },
         data: {
            details: req.body.details,
            paymentData: req.body.paymentData
         }
      }

      const additionalDetailsResult = await axios(axiosConfigAdditionalDetails);

      const additionalDetailsResultCode = additionalDetailsResult.data.resultCode;
      const additionalDetailsPSPRef = additionalDetailsResult.data.pspReference;

      console.log("additionalDetails full result: " + JSON.stringify(additionalDetailsResult.data))
      console.log("additionalDetailsResultCode: " + additionalDetailsResultCode);
      console.log("additionalDetailsPSPRef: " + additionalDetailsPSPRef);

      res.json(additionalDetailsResult.data);

   } catch (error) {
      console.log(`Additional Details server call Error Response:: ` + JSON.stringify(error.response.data))
      res.status(error.response.data.status).json(error.message);
   }

});

//Client Endpoints
app.get('/checkout', async (req, res) => {
   console.log("checkout page loaded");
   try {
      //call /paymentMethods on page load
      const axiosConfigPaymentMethods = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/paymentMethods',
         headers: {
            'x-API-key': envConfig.apiKey,
            'content-type': 'application-json'
         },
         data: {
            "merchantAccount": demoPaymentMethodConfig.merchantAccount,
            countryCode: demoPaymentMethodConfig.countryCode,
            amount: {
               "currency": demoPaymentMethodConfig.currency,
               "value": demoPaymentMethodConfig.value
            },
            channel: demoPaymentMethodConfig.channel,
            shopperLocale: demoPaymentMethodConfig.shopperLocale
         }
      }

      let response = await axios(axiosConfigPaymentMethods)

      console.log(JSON.stringify(response.data))
      res.render("payment", {
         clientKey: envConfig.clientKey,
         response: JSON.stringify(response.data),
      });
   }
   catch (error) {
      console.log(error.response)
      res.render("error", {
         errorResponseStatus: error.response.status,
         errorURL: error.response.config.url
      })
   }

})

//to do: look into this payload
app.get('/success', async (req, res) => {
   res.render("success", {
      pspReference: JSON.stringify(req.query.psp)
   });


   //To do: update route to include psp ref and result code
   //write server method to securely retrieve customer information
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