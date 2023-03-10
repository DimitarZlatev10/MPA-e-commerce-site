window.onload = (event) => {
  if (sessionStorage.getItem("userData") != null) {
    // alert("You are already logged in!");
    window.stop();
    window.location = "home.html";
  }
};

import { register } from "../api/api.js";

const formElement = document.querySelector(".register-form");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  await register(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    e.target[3].value,
    e.target[4].value
  );
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
