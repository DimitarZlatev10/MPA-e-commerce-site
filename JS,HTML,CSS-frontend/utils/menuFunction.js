export async function checkForUser() {
  if (sessionStorage.getItem("userData") != null) {
    document.querySelector(".user").style.display = "";
    document.querySelector(".user>img").src = JSON.parse(
      sessionStorage.getItem("userData")
    ).image;

    document.querySelector(".user>h3").textContent = `${
      JSON.parse(sessionStorage.getItem("userData")).firstName
    } ${JSON.parse(sessionStorage.getItem("userData")).lastName}`;

    document.querySelector(".user>a").addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.clear();
      window.location = "home.html";
    });
  } else {
    document.querySelector(".user").style.display = "none";
  }
}
