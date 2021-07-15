console.log("script runs")

const paymentMethodsResponse = JSON.parse(document.getElementById("paymentMethodsResponse").innerHTML);
const clientKey= document.getElementById("clientKey").innerHTML;

console.log(paymentMethodsResponse);
console.log(clientKey);

//SERVER FUNCTIONS//

//used to call Server endpoints
async function callServer(url, data) {
    const res = await fetch(url, {
        method: "POST",
        body: data ? JSON.stringify(data) : "",
        headers: {
          "Content-Type": "application/json",
        },
      });
    return await res.json();
  }


function handleServerResponse(res, dropin) {
    if (res.action) {
      //receive action payload, Drop-in handles (send to iDEAL URL)
      //lookin to the value of dropin
      dropin.handleAction(res.action);
    } else {
      switch (res.resultCode) {
        case "Authorised":
          window.location.href = "/success";
          break;
        case "Pending":
        case "Received":
          window.location.href = "/pending";
          break;
        case "Refused":
          window.location.href = "/failed";
          break;
        default:
          window.location.href = "/error";
          break;
      }
    }
  }

  async function submissionHandler(state,dropin,url){
    console.log("submissionHandler")
    try {
      const res = await callServer (url, state.data);
      handleServerResponse (res, dropin);
    }
    catch (error) {
      console.error(error);
    }
      
    }
  


//Create config object to instantiate Drop-in component
const configuration = {
  paymentMethodsResponse: paymentMethodsResponse,
  clientKey: clientKey,
  locale: "en_US",
  environment: "test"
        /*paymentMethodsConfiguration: {
          card: {
            showPayButton: true,
            hasHolderName: true,
            holderNameRequired: true,
            name: "Credit or debit card",
            amount: {
              value: 1000,
              currency: "EUR"
            }
          }
        }*/,
  //Event Handler when user submits Payment
  onSubmit: (state, dropin) => {
    if (state.isValid) {
      console.log("submitting state: " + JSON.stringify(state))
      submissionHandler(state, dropin, "/api/initiatePayment");
    }
  },
  //Event Handler when payment requires additional details
  onAdditionalDetails: (state, dropin) => {
    submissionHandler(state, dropin, "/api/submitAdditionalDetails");
  },
};

const checkout = new AdyenCheckout(configuration);

const dropinIntegration = checkout.create("dropin").mount("#dropin");

//initCheckout();

