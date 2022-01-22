
import { $ge } from '../modules/helpers.js';
const url = "https://raw.githubusercontent.com/TangYenChun/FileStorage/main/ipadAirArray.json";
let xhr = new XMLHttpRequest();

window.onload = function(){
    requestJSON();
    SetElement();
}

function SetElement(){
    //color btn
    ipadImg = $ge(".aside_img>img");
    $ge("#outward__btn_gray").addEventListener("click", () => { setColorBtn(0) });
    $ge("#outward__btn_silver").addEventListener("click", () => { setColorBtn(1) });
    $ge("#outward__btn_green").addEventListener("click", () => { setColorBtn(2) });
    $ge("#outward__btn_gold").addEventListener("click", () => { setColorBtn(3) });
    $ge("#outward__btn_blue").addEventListener("click", () => { setColorBtn(4) });

    //storage btn
    $ge(".btn64gb").addEventListener("click", () => { setStorageBtn(true) });
    $ge(".btn256gb").addEventListener("click", () =>{ setStorageBtn(false) });

    //network btn
    $ge(".btnWifi").addEventListener("click", () => { setNetworkBtn(true) });
    $ge(".btnWifiInter").addEventListener("click", () => { setNetworkBtn(false) });
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
    $ge(".capacity").classList.remove("disabled");
    $ge(".storageRemind").disabled = false;
    $ge(".btn64gb").disabled = false;
    $ge(".btn256gb").disabled = false;

    //add btn hover
    addBtnHover("capacity");
}

function addBtnHover(sectionName){
    var css = `.${sectionName} .button:hover{ border-color: #272729; }`;
    var style = document.createElement("style");

    style.appendChild(document.createTextNode(css));

    $ge("head").appendChild(style);
}

function setStorageBtn(storageType){
    storageValue = storageType ? "64GB" : "256GB";

    let newPrice = ipadAirData.find(p => p["storage"] == storageValue)["price"];

    $ge(".navPrice").innerText = `NT$${priceHandler(newPrice)} 起`;
    $ge(".totalPrice").innerText = `NT$${priceHandler(newPrice)} 起`;

    //netBtnPrice
    let netBtnPrice;
    netBtnPrice = ipadAirData.find(p => p["storage"] == storageValue && p["network"] == "Wi-Fi")["price"];
    $ge(".WifiBtnPrice").innerText = `NT$${priceHandler(netBtnPrice)}`;
    
    netBtnPrice = ipadAirData.find(p => p["storage"] == storageValue && p["network"] == "Cellular")["price"];
    $ge(".CelBtnPrice").innerText = `NT$${priceHandler(netBtnPrice)}`;

    //change network btn state
    $ge(".network").classList.remove("disabled");
    $ge(".networkRemind").disabled = false;
    $ge(".btnWifi").disabled = false;
    $ge(".btnWifiInter").disabled = false;

    //add btn hover
    addBtnHover("network");
}

function setNetworkBtn(networkType){
    let newPrice;
    networkValue = networkType ? "Wi-Fi" : "Cellular";
    
    newPrice = ipadAirData.find(p => p["storage"] == storageValue && p["network"] == networkValue)["price"];

    $ge(".navPrice").innerText = `NT$${priceHandler(newPrice)}`;
    $ge(".totalPrice").innerText = `NT$${priceHandler(newPrice)}`;
    
    //change price section state
    if (colorIndex != undefined && storageValue != undefined && networkValue != undefined){
        $ge(".btnContinue").disabled = false;
        $ge(".price").classList.remove("disabled");
    }
}

function priceHandler(price){
    let strPrice = price.toString();
    return strPrice.slice(0, 2) + "," + strPrice.slice(2, 5);
}