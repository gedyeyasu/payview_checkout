/*

 Copyright PayView Financial Technologies Addis Ababa, Ethiopia.
 PayView.js payment gateway extension for PayView Payment Processor.
*/
API_BASE = "https://19ce-213-55-102-49.ngrok.io/gateway/payonline/";
class PayViewClient {
  constructor({ environment, clientConfiguration }) {
    this.envrionment = environment;
    this.url = API_BASE;
    this.clientConfiguration = clientConfiguration;
    localStorage.setItem("api-url", API_BASE);
    localStorage.setItem("client-detail", JSON.stringify(clientConfiguration));
    console.log("client", clientConfiguration);
  }

  onPayViewButtonClicked() {
    console.log("handler function called");
    var frame = document.getElementById("payview-container");
    return true;
  }

  onPaymentProcessed() {
    data = localStorage.getItem("result");
    // recive payment status data from the frame
    if (data.status === true) {
      // payment done successfully
      console.log("suc");
      return true;
    } else {
      console.log("err");
      return false;
    }
  }

  createButton({
    buttonColor = "blue",
    buttonType = "long",
    lang = "en",
    onClick = null,
  }) {
    var button = document.createElement("button");
    button.type = "button";
    if (lang === "amh") {
      // AMHARIC LANGAUGE
      button.innerHTML = "ፕይቪው";
    } else {
      button.innerHTML = "PayView";
    }
    if (buttonType === "long") {
      button.style.backgroundColor = "#2196f3";
      button.style.borderRadius = "5px";
      button.style.display = "inline-block";
      button.style.cursor = "pointer";
      button.style.color = "#ffffff";
      button.style.fontFamily = "Trebuchet MS";
      button.style.fontSize = "18px";
      button.style.padding = "10px 10px";
      button.style.textDecoration = "none";
      button.style.textShadow = "0px 1px 0px #2f6627";
      button.style.border = "none";
      // button. = "

      // hover {
      //   background-color:#286ed6;
      // }
      // "
      // .myButton:active {
      //   position:relative;
      //   top:1px;
      // }

      // "
    } else {
      button.className = "btn-short-styled";
    }
    button.style.color = buttonColor;

    button.onclick = function () {
      console.log("payView Button clicked");
      // result = this.onPayViewButtonClicked();
      // -------------------------
      console.log("handler function called");
      if (onClick !== null) {
        const transactionDetail = onClick;
        console.log("transaction detail", transactionDetail);
        localStorage.setItem(
          "transaction-detail",
          JSON.stringify(transactionDetail)
        );
      }
      var frame = window.open(
        "index.html",
        "PayView Payment Gateway",
        "width=auto,height=320,left=100,top=200, overflow=hidden"
      );
    };

    var container = document.getElementById("payview-container");
    container.style.padding = "5px";
    container.appendChild(button);
  }
}
