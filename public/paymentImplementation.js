//Grabbing paymentMethods and clientKey, passed when page is rendered
const paymentMethodsResponse = JSON.parse(document.getElementById("paymentMethodsResponse").innerHTML);
const clientKey= document.getElementById("clientKey").innerHTML;

console.log(paymentMethodsResponse);
console.log(clientKey);

//Demo shopper info
const demoPayerConfig = {
  holderName: "P Sherman",
  shopperEmail: "psherman@sherman.com",
  shopperIP: '127.0.0.1',
  billingAddress: {
    street: "42 Wallaby Way",
    postalCode: "94107",
    houseNumberOrName: "2",
    city: "Sydney",
    stateOrProvince: "Ohio",
    country: "United States"
  }
}

//----------------//SERVER FUNCTIONS//----------------//

//used to call Server endpoints
async function callServer(url, data) {
  console.log("call server")  
  const res = await fetch(url, {
        method: "POST",
        body: data ? JSON.stringify(data) : "",
        headers: {
          "Content-Type": "application/json",
        },
      });
    console.log("call server res: " + JSON.stringify(res.body))
    return await res.json();
  }


function handleServerResponse(res, dropin) {
    if (res.action) {
      //receive action payload, Drop-in handles (send to iDEAL URL)
      //To do: lookin to the value of dropin
      //to do: render display with resultCode if payment successful
      action = res.action;

      console.log("here's an action: " + JSON.stringify(res.action) + "of type " + JSON.stringify(res.action.type))

      if (action.type==='threeDS2' && action.subtype==='fingerprint') {
        action.type='threeDS2Fingerprint'
      }
      else if (action.type==='threeDS2' && action.subtype==='challenge') {
        action.type='threeDS2Challenge'
      }
      console.log ("altered action: " + JSON.stringify(action))
      
      dropin.handleAction(action);
    }
      else {
        (console.log("redirecting to page"))
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

async function submissionHandler(state, dropin, url) {
  console.log("submissionHandler")
  try {
    const res = await callServer(url, state.data);
    console.log("sending to handle serverResponse")
    handleServerResponse(res, dropin);
  }
  catch (error) {
    console.error(error);
  }

}
  


//Create config object to instantiate Drop-in component

//TO DO: wrap in async function
async function initializeCheckout() {

  try {

    const configuration = {
      paymentMethodsResponse: paymentMethodsResponse,
      clientKey: clientKey,
      locale: "en_US",
      environment: "test",
      paymentMethodsConfiguration: {
        card: {
          positionHolderNameOnTop: true,
          hasHolderName: true,
          holderNameRequired: true,
          //name: "test name",
          billingAddressRequired: true,
          data: {
            holderName: demoPayerConfig.holderName,
            shopperEmail: demoPayerConfig.shopperEmail,
            shopperIP: demoPayerConfig.shopperIP,
            billingAddress: {
              street: demoPayerConfig.billingAddress.street,
              postalCode: demoPayerConfig.billingAddress.postalCode,
              city: demoPayerConfig.billingAddress.city,
              houseNumberOrName: demoPayerConfig.billingAddress.houseNumberOrName,
              country: demoPayerConfig.billingAddress.country,
              stateOrProvince: demoPayerConfig.billingAddress.stateOrProvince
            }
          }
        }
      },
      //Event Handler when user submits Payment
      onSubmit: (state, dropin) => {
        if (state.isValid) {
          console.log("submitting state: " + JSON.stringify(state))
          submissionHandler(state, dropin, "/api/initiatePayment");
        }
      },
      //Event Handler when payment requires additional details
      onAdditionalDetails: (state, dropin) => {
        console.log("additionalDetails state: " + JSON.stringify(state.data))
        submissionHandler(state, dropin, "/api/submitAdditionalDetails");
      },
    }
    const checkout = new AdyenCheckout(configuration);

    const dropinIntegration = checkout.create("dropin").mount("#dropin");
  } catch (error) {
    console.error(error)
  }
}

initializeCheckout();

// TO DO: add handling if paymentMethods call fails (display sorry error message)

