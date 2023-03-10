window.onload = (event) => {
  if (sessionStorage.getItem("userData") != null) {
    // alert("You are already logged in!");
    window.stop();
    window.location = "home.html";
  }
};

import { login } from "../api/api.js";

const formElement = document.querySelector(".login-form");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  await login(e.target[0].value, e.target[1].value);
});

// menu
const menuBar = document.getElementById("menu-btn");
const sideBarMenu = document.querySelector(".side-bar");
const closeSideBarMenu = document.getElementById("close-side-bar");

menuBar.onclick = () => {
  sideBarMenu.style.left = "0";
  sideBarMenu.style.boxShadow = "0 0 0 100vw rgba(0, 0, 0, 0.7)";
};

closeSideBarMenu.onclick = () => {
  sideBarMenu.style.left = "-120%";
  sideBarMenu.style.boxShadow = "";
};
