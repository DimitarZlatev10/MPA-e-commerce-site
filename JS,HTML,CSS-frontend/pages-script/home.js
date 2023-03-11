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

//swiper
new Swiper(".home-slider", {
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

window.onload = async (event) => {
  fetch("http://localhost:3000/products", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((products) => {
      for (const product of products) {
        const swiperSlide = document.createElement("div");
        swiperSlide.className = "swiper-slide slide";

        const imageDiv = document.createElement("div");
        imageDiv.className = "image";

        const image = document.createElement("img");
        image.src = product.image;

        imageDiv.appendChild(image);

        const contentDiv = document.createElement("div");
        contentDiv.className = "content";

        const pElement = document.createElement("p");
        pElement.textContent = `${product.price}$`;

        const h3Element = document.createElement("h3");
        h3Element.textContent = product.type;

        const h4Element = document.createElement("h4");
        h4Element.textContent = product.shortDescription;

        let aElement = document.createElement("a");
        aElement.href = "javascript:(0)";
        aElement.id = product._id;
        aElement.className = "btn";
        aElement.text = "Shop Now!";

        aElement.addEventListener("click", (e) => {
          console.log(e.target.id);
          localStorage.setItem("productId", JSON.stringify(e.target.id));
          window.location = `details.html`;
        });

        contentDiv.appendChild(pElement);
        contentDiv.appendChild(h3Element);
        contentDiv.appendChild(h4Element);
        contentDiv.appendChild(aElement);

        swiperSlide.appendChild(imageDiv);
        swiperSlide.appendChild(contentDiv);

        swiperContainer.appendChild(swiperSlide);
      }
    });
};
