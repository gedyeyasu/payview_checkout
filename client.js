// load paview index.js from cdn
<script async src="payview cdn url" onload="onPayViewLoaded()"></script>;

let paymentsClient = null;

// put all the clients detail in this object
const clientConfiguration = {
  apiVersion: 1,
  merchant_id: "test_id",
  merchant_token: "merchant_test_token",
};

function onPayViewLoaded() {
  payViewClient = new payview.payments.api.PaymentsClient({
    environment: "TEST/PRODUCTION",
  });

  // function to check if the merchant has a valid account and token
  payViewClient
    .isReadyToPay(clientConfiguration)
    .then(function (response) {
      if (response.result) {
        // if evrything is correct render payview payment button
        payViewClient.createButton({
          // defualts to black if default or empty
          buttonColor: "default",
          buttonType: "long", //default is long
          language: "en/amha", // default is English
          onClick: onPaymentViewButtonClicked,
        });
      }
    })
    .catch(function (err) {
      console.log("merchant  not ready ", err.message);
    });
}

const PaymentDataRequest = Object.assign({}, clientConfiguration);

PaymentDataRequest.transactionInfo = {
  totalPriceStatus: "Final",
  totalPrice: "120.45",
  currencyCode: "ETB",
  username: "test_user",
  password: "test_pass",
};

PaymentDataRequest.merchantInfo = {
  merchantID: "012345",
  merchantToken: "token",
  merchantName: "Test",
};

// function to send payment data to payview and return payment status
payViewClient
  .loadPaymentData(PaymentDataRequest)
  .then(function (paymentData) {
    // validate payment data and perform api request
    processPayment(paymentData);
    // if payment is succcess full return true
    // if payment failed error with reason
  })
  .catch(function (err) {
    console.log("unable to process payment");
  });
