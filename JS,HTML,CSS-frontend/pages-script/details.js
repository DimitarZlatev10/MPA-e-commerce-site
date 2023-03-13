import { addProductComment, deleteProductComment } from "../api/api.js";
import { checkForUser } from "../utils/menuFunction.js";
import { guidGenerator } from "../utils/idGenerator.js";

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
      //display product info
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

      //display product comments

      let totalReviews = response.comments.length;
      let totalRating = 0;

      for (const product of response.comments) {
        totalRating += Number(product.rating);
        const userCommentsContainer = document.querySelector(".user-comments");

        const divComment = document.createElement("div");
        divComment.className = "comment";
        divComment.id = product.commentId;
        const divUserImage = document.createElement("div");
        divUserImage.className = "user-image";

        const divUserImageImg = document.createElement("img");
        divUserImageImg.src = product.userImage;
        const divUserImageUsername = document.createElement("h1");
        divUserImageUsername.textContent = product.username;

        if (sessionStorage.getItem("userData") != null) {
          if (
            product.username ==
            JSON.parse(sessionStorage.getItem("userData")).firstName
          ) {
            const divDeleteComment = document.createElement("div");
            divDeleteComment.className = "delete-comment";
            divDeleteComment.textContent = "Delete";

            divDeleteComment.addEventListener("click", (e) => {
              if (window.confirm("Do you really want to delete your comment?")) {
                deleteProductComment(
                  product.commentId,
                  JSON.parse(localStorage.getItem("productId"))
                );
                window.location = "details.html";
              }
            });

            divUserImage.appendChild(divDeleteComment);
          }
        }

        divUserImage.appendChild(divUserImageImg);
        divUserImage.appendChild(divUserImageUsername);
        divComment.appendChild(divUserImage);

        const h3Element = document.createElement("h3");
        h3Element.textContent = product.comment;

        const pElement = document.createElement("p");
        pElement.textContent = `Rating: ${product.rating}/5`;

        divComment.appendChild(h3Element);
        divComment.appendChild(pElement);

        userCommentsContainer.appendChild(divComment);
      }

      if (totalReviews != 0) {
        document.querySelector(".product-container>p").innerHTML = `Rating: ${(
          totalRating / totalReviews
        ).toFixed(1)}/5 <span> (${totalReviews} reviews) </span>`;
        document.querySelector(".comment-form>h1").textContent =
          "Leave your review here!";
      } else {
        document.querySelector(
          ".product-container>p"
        ).textContent = `There are no reviews for this product`;
        document.querySelector(".comment-form>h1").textContent =
          "Be the first to leave a review!";
      }
    });

  checkForUser();
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

//review
const reviewForm = document.querySelector(".comment-form");
const noUser = document.querySelector(".noUser");

if (sessionStorage.getItem("userData") != null) {
  reviewForm.style.display = "flex";
  noUser.style.display = "none";

  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (
      (e.target[0].value > 6 && e.target[0].value < 1) ||
      e.target[0].value == ""
    ) {
      console.log(`review stars are required`);
      return;
    }

    await addProductComment(
      e.target[0].value,
      e.target[1].value,
      JSON.parse(sessionStorage.getItem("userData")).id,
      JSON.parse(localStorage.productId),
      JSON.parse(sessionStorage.getItem("userData")).image,
      guidGenerator()
    );

    window.location = "details.html";
  });
} else {
  noUser.style.display = "flex";
  reviewForm.style.display = "none";
}
