import { login } from "../api/api.js";

window.onload = (event) => {
  if (sessionStorage.getItem("userData") != null) {
    alert("You are already logged in!");
    window.location = "home.html";
  }
};

const formElement = document.querySelector(".login-form");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  await login(e.target[0].value, e.target[1].value);
});
