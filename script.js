document.addEventListener("DOMContentLoaded", function () {
  displayUserData()

  document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.querySelector("#name").value;
      var password = document.getElementById("password").value;

      var usernames = JSON.parse(localStorage.getItem("usernames")) || [];
      var passwords = JSON.parse(localStorage.getItem("passwords")) || [];
      usernames.push(name);
      passwords.push(password);

      localStorage.setItem("usernames", JSON.stringify(usernames));
      localStorage.setItem("passwords", JSON.stringify(passwords));

      document.getElementById("name").value = "";
      document.getElementById("password").value = "";

      displayUserData();
  });

  function displayUserData() {
      var usernames = JSON.parse(localStorage.getItem("usernames")) || [];
      var passwords = JSON.parse(localStorage.getItem("passwords")) || [];
      var tableBody = document.querySelector("#userData table tbody");

      tableBody.innerHTML = "";
      for (var i = 0; i < usernames.length; i++) {
          var newRow = tableBody.insertRow();

          var usernameCell = newRow.insertCell(0);
          usernameCell.textContent = usernames[i];

          var passwordCell = newRow.insertCell(1);
          passwordCell.textContent = passwords[i];

          var actionCell = newRow.insertCell(2);

          var editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.dataset.index = i;
          editButton.addEventListener("click", handleEditUser);
          editButton.classList.add("actionButton");
          actionCell.appendChild(editButton);

          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.dataset.index = i;
          deleteButton.addEventListener("click", handleDeleteUser);
          deleteButton.classList.add("actionButton");
          actionCell.appendChild(deleteButton);
      }
  }

  function handleEditUser(event) {
      var index = parseInt(event.target.dataset.index);
      var usernames = JSON.parse(localStorage.getItem("usernames")) || [];
      var passwords = JSON.parse(localStorage.getItem("passwords")) || [];

      var updateForm = document.createElement("form");
      updateForm.addEventListener("submit", function (event) {
          event.preventDefault();

          var newName = updateForm.querySelector("input[name='newName']").value;
          var newPassword = updateForm.querySelector("input[name='newPassword']").value;

          if (newName.trim() !== "") {
              usernames[index] = newName;
          }
          if (newPassword.trim() !== "") {
              passwords[index] = newPassword;
          }

          localStorage.setItem("usernames", JSON.stringify(usernames));
          localStorage.setItem("passwords", JSON.stringify(passwords));

          displayUserData();
          redirectToLoginPage();
          document.querySelector("h1").textContent = "User Management App"; // Reset heading text
      });

      var nameLabel = document.createElement("label");
      nameLabel.textContent = "New Name:";
      var nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.name = "newName";
      nameInput.placeholder = "Enter new username";
      nameInput.value = usernames[index];
      updateForm.appendChild(nameLabel);
      updateForm.appendChild(nameInput);

      var passwordLabel = document.createElement("label");
      passwordLabel.textContent = "New Password:";
      var passwordInput = document.createElement("input");
      passwordInput.type = "password";
      passwordInput.name = "newPassword";
      passwordInput.placeholder = "Enter new password";
      passwordInput.value = passwords[index];
      updateForm.appendChild(passwordLabel);
      updateForm.appendChild(passwordInput);

      var updateButton = document.createElement("button");
      updateButton.type = "submit";
      updateButton.textContent = "Update";
      updateForm.appendChild(updateButton);

      document.getElementById("loginForm").replaceWith(updateForm); 
      document.querySelector("h1").innerHTML = "Edit User"; 
  }
    // delet the event
  function handleDeleteUser(event) {
      var index = parseInt(event.target.dataset.index);
      var usernames = JSON.parse(localStorage.getItem("usernames")) || [];
      var passwords = JSON.parse(localStorage.getItem("passwords")) || [];

      usernames.splice(index, 1);
      passwords.splice(index, 1);

      localStorage.setItem("usernames", JSON.stringify(usernames));
      localStorage.setItem("passwords", JSON.stringify(passwords));

      displayUserData();
  }

  function redirectToLoginPage() {
      window.location.href = window.location.href;
  }
});
