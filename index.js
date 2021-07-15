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


//Client Endpoints
 app.get('/checkout',(req,res)=>{
    res.sendFile(path.resolve('pages/checkout.html'))
 })

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

 app.post("/api/initiatePayment", async(req,res) => {
    try {
       const orderRef = uuidv4();
       console.log("orderRef " + orderRef)
       console.log("payment method: " + JSON.stringify(req.body.paymentMethod))
       const axiosconfigInitiate = {
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
               currency:"USD",
               value:1
            } ,
            reference: orderRef,
            returnUrl: `http://localhost:8080/api/handleShopperRedirect?orderRef=${orderRef}`,
         }
      } 
      const paymentResult = await axios(axiosconfigInitiate);

      console.log("response: " + JSON.stringify(paymentResult.data))

      const {resultCode}=paymentResult.data;
      const {action} = paymentResult.data;
      const {pspReference} = paymentResult.data

      console.log("result code: " + resultCode);
      console.log("action: " + action);

      if (action) {
         console.log("there's an action");
         tempPaymentData[orderRef]=action.paymentData
      }
      //if action code is non-null, send result code and action back to client
      res.json({resultCode, action});      
   }
      catch (err){
         const eCode = err.errorCode || 500;
         console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
         res.status(err.statusCode).json(err.message);
    }
 });

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