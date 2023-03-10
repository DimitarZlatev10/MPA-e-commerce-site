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
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));
        window.location = "home.html";
      }
    });
}
