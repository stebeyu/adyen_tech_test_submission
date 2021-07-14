const http = require('http')
const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config();
const axios = require('axios')
const { mainModule } = require('process')

//init app
const app = express();
//Set Templating Engine
app.set('view engine','ejs')
app.set ('view options', {layout: 'main.ejs'})
//JSON Parser
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

//create config object manually (merchant account, apikey)
const config = {
   apiKey:process.env.API_KEY,
   merchantAccount:process.env.merchantAccount
}
//create client object manually by passing in config (client object needs environment)
const client = {
   
}
//create checkout object passing in client object?
const checkout = {

}
 

/*//API Endpoints
app.post("/api/getPaymentMethods", async (req,res) => {
   try {
      const response = await ()
   } catch () {
      
   }
}*/



const axiosconfig = {
   method: 'post',
   url: 'https://checkout-test.adyen.com/v67/paymentMethods',
   headers: {
       'x-API-key': 'AQEyhmfxLI3MaBFLw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFitRvbe4N1XqH1eHaH2AksaEQwV1bDb7kfNy1WIxIIkxgBw==-y3qzswmlmALhxaVPNjYf74bqPotG12HroatrKA066yE=-W+t7NF;s4}%=kUSD',
       'content-type': 'application-json'
   },
   data: {
       merchantAccount: 'AdyenRecruitmentCOM',
       countryCode: 'NL',
       shopperLocale: "nl-NL",
       amount: { currency: "EUR", value: 100, },
       channel: "Web"
   }
}


//Client Endpoints
 app.get('/checkout',(req,res)=>{
    res.sendFile(path.resolve('pages/checkout.html'))
 })

 app.get('/', async (req,res)=>{
    try {
       let response = await axios(axiosconfig)
               /*let response = [
                  { details: [Array], name: 'iDEAL', type: 'ideal' 
                     },
                  {
                  brands: [Array],
                  details: [Array],
                  name: 'Credit Card',
                  type: 'scheme'
                  },
                  {
                  details: [Array],
                  name: 'SEPA Direct Debit',
                  type: 'sepadirectdebit'
                  },
                  { name: 'AliPay', type: 'alipay' },
                  {
                  configuration: [Object],
                  details: [Array],
                  name: 'Google Pay',
                  type: 'paywithgoogle'
                  },
                  { name: 'WeChat Pay', type: 'wechatpayQR' },
                  { name: 'WeChat Pay', type: 'wechatpayWeb' }
               ]*/
       //console.log (response)
       res.render("payment", {
          clientKey: process.env.CLIENT_KEY,
          response: JSON.stringify(response.data)
          //response: response
       });
    }
    catch (error){
      console.error(error.response);
    }
 })
 

 //Start Server
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, () => {
   console.log(`Server started on port ${PORT}`)
})