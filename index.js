const http = require('http')
const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const { mainModule } = require('process')
const { json } = require('express')

dotenv.config();

const app = express();
app.set('view engine','ejs')
app.set ('view options', {layout: 'main.ejs'})
app.use(express.json());

//Template directory
app.use(express.static(path.join(__dirname, "/public")));

//create Config object manually
const config = {
   apiKey:process.env.API_KEY,
   merchantAccount:process.env.merchantAccount
}

const demoPaymentMethodConfig = {
   merchantAccount: config.merchantAccount,
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



//----------------//SERVER Endpoints//----------------//


app.post("/api/initiatePayment", async (req, res) => {
   try {
      const orderRef = uuidv4();
      console.log("orderRef " + orderRef)
      const axiosInitiatePayment = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/payments',
         headers: {
            'x-API-key': config.apiKey,
            'content-type': 'application-json'
         },
         data: {
            merchantAccount: config.merchantAccount,
            paymentMethod: req.body.paymentMethod,
            browserInfo: req.body.browserInfo,
            amount: {
               currency: demoPaymentMethodConfig.amount.currency,
               value: demoPaymentMethodConfig.amount.value
            },
            reference: orderRef,
            returnUrl: `http://localhost:${process.env.PORT}/api/handleShopperRedirect?orderRef=${orderRef}`,
            additionalData: {
               allow3DS2: true
            },
            channel: 'web',
            origin: `http://localhost:${process.env.PORT}`,
            billingAddress: req.body.billingAddress,
            shopperEmail: req.body.shopperEmail,
            shopperIP: req.body.shopperIP
         }
      }
      console.log("initiating payment: " + JSON.stringify(axiosInitiatePayment.data))
      
      const paymentResult = await axios(axiosInitiatePayment);

      console.log("initial payment response: " + JSON.stringify(paymentResult.data))

      const { resultCode } = paymentResult.data;
      const { action } = paymentResult.data;
      const { pspReference } = paymentResult.data

      console.log("result code: " + resultCode);
      
      if (action) {
         console.log("there's an action - storing tempPaymentData");
         tempPaymentData[orderRef] = action.paymentData
         //console.log("tempPaymentData: " + JSON.stringify(tempPaymentData))
      }
      //if action code is non-null, send result code and action back to client
      //res.json({ action , resultCode });
      res.json(paymentResult.data);
   }
   catch (error){
      console.log(`Initiate payment Error Response:: ` + JSON.stringify(error.response.data))
      res.status(error.response.data.status).json(error.message);
   }

  });

  
     
  

      
      /*
      
      err) {
      console.log(err)
      const eCode = err.data.status || 500;
      console.error(`Error: ${err.message}, error code: ${eCode}`);
      res.status(eCode).json(err.message);
   }*/


//receive payload from iDeal redirect
//get order ref number (will depend on if GET or POST)
//decode redirect URL to get orderRef number and redirect result
//pass details object (with redirect result) to /payments/details
//get resultcode and psp reference 
//To DO: POLi and AliPay methods
app.all("/api/handleShopperRedirect", async(req,res) => {

  const orderRef = req.query.orderRef;

  //if GET, extract redirect from URL ; if POST, extract from body
  const redirect = req.method === "GET" ? req.query : req.body;
  const details = {};

   //create details object for submission to /payments/details
  if (redirect.redirectResult) {
   details.redirectResult = redirect.redirectResult;
   } 
 
   //todo: investigate
   else {
      details.MD = redirect.MD;
      details.PaRes = redirect.PaRes;
   }
   
   //create payload for /payments/details
   const detailsPayload = {
      details,
      paymentData: tempPaymentData[orderRef],
    };
   
   
   try {
      console.log("submitting payment details" + JSON.stringify(detailsPayload));
      const axiosConfigPaymentDetails = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/payments/details',
         headers: {
             'x-API-key': config.apiKey,
             'content-type': 'application-json'
         },
         data: {
            details: detailsPayload.details
            } 
         }

      const paymentDetailsResult = await axios(axiosConfigPaymentDetails);
      
      const detailsResultCode=paymentDetailsResult.data.resultCode;
      const detailsPSPRef=paymentDetailsResult.data.pspReference;
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
     catch (error){
      console.log(`Handle Redirect server Error Response:: ` + JSON.stringify(error.response.data))
      res.status(error.response.data.status).json(error.message);
   }
});

app.post('/api/submitAdditionalDetails', async (req, res) => {
   console.log("submitting Additional payment details: " + JSON.stringify(req.body.details));
//figure out why this call is failing with 400
   /*
   const requestBodyDetails = req.body.details;
   let requestBodyDetails2 = {}
      console.log("requestBodyDetails: " + JSON.stringify(requestBodyDetails));

   if (requestBodyDetails["threeds2.fingerprint"]){
      requestBodyDetails2 = {
         threeDSResult: requestBodyDetails["threeds2.fingerprint"]
      }
   }
   else {
      requestBodyDetails2  = req.body.details;
   }*/

   //console.log ("requestBodyDetails2: " + JSON.stringify(requestBodyDetails2));
   try {
      
      const axiosConfigAdditionalDetails = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/payments/details',
         headers: {
            'x-API-key': config.apiKey,
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
            cconsole.log(`Additional Details server call Error Response:: ` + JSON.stringify(error.response.data))
      res.status(error.response.data.status).json(error.message);
   }

});

//Client Endpoints
 app.get('/checkout', async (req,res)=>{
   console.log("checkout page loaded"); 
   try {
      //call /paymentMethods on page load
      const axiosconfig = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/paymentMethods',
         headers: {
             'x-API-key': config.apiKey,
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
      
      let response = await axios(axiosconfig)
      console.log(JSON.stringify(response.data))
       res.render("payment", {
          clientKey: process.env.CLIENT_KEY,
          response: JSON.stringify(response.data)
       });
    }
    catch (error){
      console.error(error.response);
    }
 })

 app.get('/success', async (req,res)=>{
      res.render("success");
      //To do: update route to include psp ref and result code
})

app.get('/pending', async (req,res)=>{
   res.render("pending");
})

app.get('/failed', async (req,res)=>{
   res.render("failed");
})

app.get('/error', async (req,res)=>{
   res.render("error");
})

app.get('/', function(req, res){
   res.redirect('/checkout');
});

 //Start Server
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, () => {
   console.log(`Server started on port ${PORT}`)
})