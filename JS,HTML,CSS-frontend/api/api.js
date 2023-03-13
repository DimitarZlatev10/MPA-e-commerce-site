//users
export async function register(firstName, lastName, image, email, password) {
  fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      image: image,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        console.log(response.message);
      } else {
        console.log(response);
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          id: response._id,
          image: response.image,
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));
        window.location = "home.html";
      }
    });
}

export async function login(email, password) {
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        console.log(response.message);
      } else {
        console.log(response);
        const userData = {
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          image: response.image,
          id: response._id,
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));

        if (document.referrer == "http://127.0.0.1:5500/details.html") {
          window.location = "details.html";
        } else {
          window.location = "home.html";
        }
      }
    });
}

//products
export async function addProductComment(
  rating,
  comment,
  userId,
  productId,
  userImage,
  commentId
) {
  fetch("http://localhost:3000/products/addProductComment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: JSON.parse(sessionStorage.getItem("userData")).firstName,
      rating: rating,
      comment: comment,
      userId: userId,
      productId: productId,
      userImage: userImage,
      commentId: commentId,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
}

export async function deleteProductComment(commentId, productId) {
  fetch("http://localhost:3000/products/deleteProductComment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId: commentId,
      productId: productId,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
}
