document.addEventListener("DOMContentLoaded", function () {
  var logoutLinks = document.querySelectorAll('[data-logout="true"]');
  if (!logoutLinks.length) {
    return;
  }

  function hasActiveSession() {
    var token = localStorage.getItem("authToken");
    var user = localStorage.getItem("loggedInUser");
    return Boolean((token && token.trim()) || (user && user.trim()));
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
      if (hasActiveSession()) {
        event.preventDefault();
        clearSession();
        window.location.href = "menu.html";
        return;
      }

      window.location.href = "login.html";
    });
  });
});