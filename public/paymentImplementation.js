//Storing paymentMethods and clientKey, passed when page is rendered
const paymentMethodsResponse = JSON.parse(document.getElementById("paymentMethodsResponse").innerHTML);
const clientKey = document.getElementById("clientKey").innerHTML;

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


//Utility function to call backend server endpoints

async function callServer(url, data) {
  console.log("call server")
  const res = await fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : "",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Calling server: " + url)
  return await res.json();
}

//Utility function to handle server responses and send back to Drop-in if needed

function handleServerResponse(res, dropin) {

  if (res.action) {
    //To do: lookin to the value of dropin
    action = res.action;

    //Transform 3DS2 action.type before passing into Drop-in
    switch (true) {
      case (action.type === 'threeDS2' && action.subtype === 'fingerprint'): {
        action.type = 'threeDS2Fingerprint'
        break;
      }

      case (action.type === 'threeDS2' && action.subtype === 'challenge'): {
        action.type = 'threeDS2Challenge'
        break;
      }

      default: //No action.type transformation needed if not 3DS2 action
        break
    }

    //Pass action to Drop-in component for handling (redirect or 3DS)
    dropin.handleAction(action);

  }

  else {
    
    //Send user to results page based on resultCode received
    switch (res.resultCode) {
      case "Authorised":
        window.location.href = `/success?pspreference=${res.pspReference}&merchantreference=${res.merchantReference}`;
        break;
      case "Pending":
      case "Received":
        window.location.href = "/pending";
        break;
      case "Refused":
        window.location.href = `/error?resultcode=${res.resultCode}&refusalreason=${res.refusalReason}&pspreference=${res.pspReference}&refusalreasoncode=${res.refusalReasonCode}&merchantreference=${res.merchantReference}`; 
        break;
      default:
        window.location.href = `/error?resultcode=${res.resultCode}&refusalreason=${res.refusalReason}&pspreference=${res.pspReference}&refusalreasoncode=${res.refusalReasonCode}&merchantreference=${res.merchantReference}`;
        break;
    }
  }
}

//Utility function to handle request/response from server endpoints
async function submissionHandler(state, dropin, url) {

  try {
    const res = await callServer(url, state.data);
    handleServerResponse(res, dropin);
  }
  
  catch (error) {
    console.error(error);
  }
}

//----------------//INITIALIZE DROP-IN//----------------//

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

      //Drop-in Event Handler when user submits Payment
      onSubmit: (state, dropin) => {
        if (state.isValid) {
          submissionHandler(state, dropin, "/api/initiatePayment");
        }
      },

      //Drop-in Event Handler when payment requires additional details
      onAdditionalDetails: (state, dropin) => {
        submissionHandler(state, dropin, "/api/submitAdditionalDetails");
      },

      onReady: () => {
        console.log("Drop-in component initialized successfully")
      }
    }

    const checkout = new AdyenCheckout(configuration);

    const dropinIntegration = checkout.create("dropin").mount("#dropin");

  }

  catch (error) {
    console.error(error)
  }

}

initializeCheckout();