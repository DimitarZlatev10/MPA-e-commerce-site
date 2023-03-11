import { addProductComment } from "../api/api.js";

window.onload = async (event) => {
  fetch("http://localhost:3000/products/getProductById", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: JSON.parse(localStorage.getItem("productId")) }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.querySelector(".product-container>img").src = response.image;
      document.querySelector(".product-container>h1").textContent =
        response.title;
      // document.querySelector(".product-container>p").textContent =
      //   response.shortDescription;
      document.querySelector(
        ".product-container>h2"
      ).textContent = `Price: ${response.price}$`;
      document.querySelector(".product-container>h3").textContent =
        response.description;
    });
};

//menu
const menuBar = document.getElementById("menu-btn");
const sideBarMenu = document.querySelector(".side-bar");
const closeSideBarMenu = document.getElementById("close-side-bar");
const swiperContainer = document.querySelector(".swiper-wrapper");

menuBar.onclick = () => {
  sideBarMenu.style.left = "0";
  sideBarMenu.style.boxShadow = "0 0 0 100vw rgba(0, 0, 0, 0.7)";
};

closeSideBarMenu.onclick = () => {
  sideBarMenu.style.left = "-120%";
  sideBarMenu.style.boxShadow = "";
};

//payment

const productButton = document.querySelector(".product-container>button");
const payment = document.querySelector(".payment");
const closeButton = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  payment.style.display = "none";
});

//review
const reviewForm = document.querySelector(".comment-form");
reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addProductComment(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    JSON.parse(sessionStorage.getItem("userData")).id,
    JSON.parse(localStorage.productId)
  );

  window.location = "details.html";
});
