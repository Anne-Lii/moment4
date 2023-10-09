"use strict"

//variabler
let inputEl = document.getElementById("newtodo");//hitta input från HTML
let buttonEl = document.getElementById("newtodobutton");//hitta knappen från HTML
let messageEl = document.getElementById("message");//hitta span från HTML
let listEl = document.getElementById("todolist");//hitta section lista från HTML
let clearEl = document.getElementById("clearbutton");//hitta nollställningsknapp från HTML
let i;



//Events
window.onload = init;
inputEl.addEventListener("keyup", checkInput);
buttonEl.addEventListener("click", addItem);
clearEl.addEventListener("click", clearAll);

//vid uppstart
function init() {
    buttonEl.disabled = true;

    loadChore();
}

//kontrollerar input samt aktiverar knapp
function checkInput() {

    if (inputEl.value.length < 5) {
        messageEl.innerHTML = "minst 5 tecken";
        buttonEl.disabled = true;

    } else if (inputEl.value.length > 4) {
        messageEl.innerHTML = "";
        buttonEl.disabled = false;

    }

}

function addItem() {
    let inputEl = document.getElementById("newtodo").value;
    let textInput = document.createTextNode(inputEl);//skapa text element från input
    let articleEl = document.createElement("article");//<article>
    articleEl.className = "chores";

    listEl.appendChild(articleEl);//<section><article></article></section>
    articleEl.appendChild(textInput);//slå ihop textInput med listan
    storeChore();

    articleEl.addEventListener("click", function (e) {
        e.target.remove();

    });

    newtodo.value = "";
    buttonEl.disabled = true;
}
//lagra input
function storeChore() {

    let listChores = document.getElementsByClassName("chores");

    let myArr = [];
    for (let i = 0; i < listChores.length; i++) {
        myArr.push(listChores[i].innerHTML);
    }

    //konvertera array till JSON-sträng
    let jsonString = JSON.stringify(myArr);

    //lagrar i local storage
    localStorage.setItem("chore", jsonString);

}
//töm listan
function clearAll() {
    listEl.innerHTML = "";//tömmer listan på sidan
    localStorage.clear();//tömmer listan i local storage

}

//läs in lagrad input
function loadChore() {

    let allChores = JSON.parse(localStorage.getItem("chore"));//läser in json till array i local storage

    for (i = 0; i < allChores.length; i++) {


        let articleEl = document.createElement("article");
        let textInput = document.createTextNode(allChores[i]);
        articleEl.appendChild(textInput);
        articleEl.className = "chores";
        listEl.appendChild(articleEl);

        articleEl.addEventListener("click", function (e) {
            e.target.remove();

            //lagrar om listan
            storeChore();
        });
    }

}
