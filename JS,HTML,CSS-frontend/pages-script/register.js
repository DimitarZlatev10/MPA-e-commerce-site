import { register } from "../api/api.js";

window.onload = (event) => {
  if (sessionStorage.getItem("userData") != null) {
    alert("You are already logged in!");
    window.location = "home.html";
  }
};

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
