const http = require('http')
const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const { mainModule } = require('process')

dotenv.config();

//init app
const app = express();

//Set Templating Engine
app.set('view engine','ejs')
app.set ('view options', {layout: 'main.ejs'})

//JSON Parser
app.use(express.json());

//Template directory
app.use(express.static(path.join(__dirname, "/public")));

//create Config object manually
const config = {
   apiKey:process.env.API_KEY,
   merchantAccount:process.env.merchantAccount
}

//temporary data store if additional details are needed
const tempPaymentData = {};

//Server Endpoints
app.post("/api/initiatePayment", async(req,res) => {
   try {
      const orderRef = uuidv4();
      console.log("orderRef " + orderRef)
      console.log("payment method: " + JSON.stringify(req.body.paymentMethod))
      const axiosConfigInitiatePayment = {
        method: 'post',
        url: 'https://checkout-test.adyen.com/v67/payments',
        headers: {
            'x-API-key': config.apiKey,
            'content-type': 'application-json'
        },
        data: {
           merchantAccount: config.merchantAccount,
           paymentMethod: req.body.paymentMethod,
           amount: {
              currency:"EUR",
              value:1
           } ,
           reference: orderRef,
           returnUrl: `http://localhost:8080/api/handleShopperRedirect?orderRef=${orderRef}`,
        }
     } 
     const paymentResult = await axios(axiosConfigInitiatePayment);

     console.log("response: " + JSON.stringify(paymentResult.data))

     const {resultCode}=paymentResult.data;
     const {action} = paymentResult.data;
     const {pspReference} = paymentResult.data

     console.log("result code: " + resultCode);

     if (action) {
        console.log("there's an action");
        tempPaymentData[orderRef]=action.paymentData
        console.log("tempPaymentData: " + JSON.stringify(tempPaymentData))
     }
     //if action code is non-null, send result code and action back to client
     res.json({resultCode, action});      
  }
     catch (err){
        const eCode = err.errorCode || 500;
        console.error(`Error: ${err.message}, error code: ${eCode}`);
        res.status(err.statusCode).json(err.message);
   }
});

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
     catch (err){
        const eCode = err.errorCode || 500;
        console.error(`Error: ${err.message}, error code: ${eCode}`);
        res.status(err.statusCode).json(err.message);
   }
});

//Client Endpoints
 app.get('/', async (req,res)=>{
    try {
      //Axios config object to make paymentMethods call 
      const axiosconfig = {
         method: 'post',
         url: 'https://checkout-test.adyen.com/v67/paymentMethods',
         headers: {
             'x-API-key': config.apiKey,
             'content-type': 'application-json'
         },
         data: {
             merchantAccount: 'AdyenRecruitmentCOM',
             channel: "Web"
         }
      } 
      
      let response = await axios(axiosconfig)
               
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
 

 //Start Server
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, () => {
   console.log(`Server started on port ${PORT}`)
})