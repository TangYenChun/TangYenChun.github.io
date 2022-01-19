let ipadImg, navPrice, totalPrice, ipadAirData, storageValue, colorIndex, networkValue, price;

const url = "https://raw.githubusercontent.com/TangYenChun/FileStorage/main/ipadAirArray.json";
let xhr = new XMLHttpRequest();

window.onload = function(){
    requestJSON();
    SetElement();
}

function SetElement(){
    //color btn
    ipadImg = document.querySelector(".aside_img>img");
    document.querySelector("#outward__btn_gray").addEventListener("click", () => { setColorBtn(0) });
    document.querySelector("#outward__btn_silver").addEventListener("click", () => { setColorBtn(1) });
    document.querySelector("#outward__btn_green").addEventListener("click", () => { setColorBtn(2) });
    document.querySelector("#outward__btn_gold").addEventListener("click", () => { setColorBtn(3) });
    document.querySelector("#outward__btn_blue").addEventListener("click", () => { setColorBtn(4) });

    //storage btn
    document.querySelector(".btn64gb").addEventListener("click", () => { setStorageBtn(true) });
    document.querySelector(".btn256gb").addEventListener("click", () =>{ setStorageBtn(false) });

    //network btn
    document.querySelector(".btnWifi").addEventListener("click", () => { setNetworkBtn(true) });
    document.querySelector(".btnWifiInter").addEventListener("click", () => { setNetworkBtn(false) });

    //price
    navPrice = document.querySelector(".navPrice");
    totalPrice = document.querySelector(".totalPrice");
}

function requestJSON(){
    xhr.onload = function(){
        ipadAirData = JSON.parse(this.responseText);
    }
    xhr.open('GET', url);
    xhr.send();
}

function setColorBtn(i){
    ipadImg.setAttribute("src", `${ipadAirData[i]["picture"]}`);
    colorIndex = 1;

    //change storage btn state
    document.querySelector(".capacity").classList.remove("disabled");
    document.querySelector(".storageRemind").disabled = false;
    document.querySelector(".btn64gb").disabled = false;
    document.querySelector(".btn256gb").disabled = false;

    //add btn hover
    addBtnHover("capacity");
}

function addBtnHover(sectionName){
    var css = `.${sectionName} .button:hover{ border-color: #272729; }`;
    var style = document.createElement("style");

    style.appendChild(document.createTextNode(css));

    document.querySelector("head").appendChild(style);
}

function setStorageBtn(storageType){
    storageValue = storageType ? "64GB" : "256GB";

    let newPrice = ipadAirData.find(p => p["storage"] == storageValue)["price"];

    navPrice.innerText = `NT$${priceHandler(newPrice)} 起`;
    totalPrice.innerText = `NT$${priceHandler(newPrice)} 起`;

    //netBtnPrice
    let netBtnPrice;
    netBtnPrice = ipadAirData.find(p => p["storage"] == storageValue && p["network"] == "Wi-Fi")["price"];
    document.querySelector(".WifiBtnPrice").innerText = `NT$${priceHandler(netBtnPrice)}`;
    
    netBtnPrice = ipadAirData.find(p => p["storage"] == storageValue && p["network"] == "Cellular")["price"];
    document.querySelector(".CelBtnPrice").innerText = `NT$${priceHandler(netBtnPrice)}`;

    //change network btn state
    document.querySelector(".network").classList.remove("disabled");
    document.querySelector(".networkRemind").disabled = false;
    document.querySelector(".btnWifi").disabled = false;
    document.querySelector(".btnWifiInter").disabled = false;

    //add btn hover
    addBtnHover("network");
}

function setNetworkBtn(networkType){
    let newPrice;
    networkValue = networkType ? "Wi-Fi" : "Cellular";
    
    newPrice = ipadAirData.find(p => p["storage"] == storageValue && p["network"] == networkValue)["price"];

    navPrice.innerText = `NT$${priceHandler(newPrice)}`;
    totalPrice.innerText = `NT$${priceHandler(newPrice)}`;
    
    //change price section state
    if (colorIndex != undefined && storageValue != undefined && networkValue != undefined){
        document.querySelector(".btnContinue").disabled = false;
        document.querySelector(".price").classList.remove("disabled");
    }
}

function priceHandler(price){
    let strPrice = price.toString();
    return strPrice.slice(0, 2) + "," + strPrice.slice(2, 5);
}