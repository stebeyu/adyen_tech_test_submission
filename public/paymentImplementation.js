/*Storing paymentMethods, clientKey, and payerInfo to be used to
  instantiate Drop-in Compnent */
const paymentMethodsResponse = JSON.parse(document.getElementById("paymentMethodsResponse").innerHTML);
const clientKey = document.getElementById("clientKey").innerHTML;
const payerInfo = JSON.parse(document.getElementById("payerInfo").innerHTML);


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

    //Transform 3DS2 action if there is a subtype before passing into Drop-in
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

    console.log("Action transformed: sending to Dropin to handle: " + JSON.stringify(action) + `\n`);
    //Drop-in component for handles action (redirect or 3DS)
    dropin.handleAction(action);

  }

  else {

    //If no action, send user to results page based on resultCode received
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
            holderName: payerInfo.holderName,
            shopperEmail: payerInfo.shopperEmail,
            shopperIP: payerInfo.shopperIP,
            amount: {
              value: payerInfo.value,
              currency: payerInfo.currency
            },
            billingAddress: {
              street: payerInfo.billingAddress.street,
              postalCode: payerInfo.billingAddress.postalCode,
              city: payerInfo.billingAddress.city,
              houseNumberOrName: payerInfo.billingAddress.houseNumberOrName,
              country: payerInfo.billingAddress.country,
              stateOrProvince: payerInfo.billingAddress.stateOrProvince
            }
          }
        }
      },
      //Drop-in Event Handler when user submits Payment
      onSubmit: (state, dropin) => {
        if (state.isValid) {
          submissionHandler(state, dropin, "/api/initiatePayment");
        }
        else {
          console.log("Invalid state on submit");
        }
      },

      //Drop-in Event Handler when payment requires additional details
      onAdditionalDetails: (state, dropin) => {
        submissionHandler(state, dropin, "/api/submitAdditionalDetails");
      },

      onReady: () => {
        console.log("Drop-in component initialized successfully")
      },

      amount: {
        value: payerInfo.amount.value,
        currency: payerInfo.amount.currency
      },

    }

    const checkout = new AdyenCheckout(configuration);
    const dropinIntegration = checkout.create("dropin").mount("#dropin");
  }

  catch (error) {
    console.error(error)
  }
}

initializeCheckout();