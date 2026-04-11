document.addEventListener("DOMContentLoaded", function () {
  var logoutLinks = document.querySelectorAll('[data-logout="true"]');
  if (!logoutLinks.length) {
    return;
  }

  function clearSession() {
    [
      "currentuser",
      "loggedInUser",
      "authToken",
      "authTokenType",
      "authTokenExpiresAt",
      "authHeader"
    ].forEach(function (key) {
      localStorage.removeItem(key);
    });
  }

  logoutLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      clearSession();
      window.location.href = "menu.html";
    });
  });
});