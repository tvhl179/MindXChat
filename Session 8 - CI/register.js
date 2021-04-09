// gmail, pass, displayName, confirmation, button (submit form)ư

import app from "./index.js";
import Login from "./login.js";
class Register {
    // $: trường liên quan đến hiển thị
    $formRegister;
    $txtEmail;
    $txtDisplayName;
    $txtPassword;
    $txtConfirmPassword;
    $btnSubmit;
    $errorMessage;

    constructor () {
        this.$txtEmail = document.createElement("input");
        this.$txtEmail.type = "email";
        this.$txtEmail.placeholder = "Enter email ...";

        this.$txtDisplayName = document.createElement("input");
        this.$txtDisplayName.type = "text";
        this.$txtDisplayName.placeholder = "Enter display name ...";

        this.$txtPassword = document.createElement("input");
        this.$txtPassword.type = "password";
        this.$txtPassword.placeholder = "Enter password ...";

        this.$txtConfirmPassword = document.createElement("input");
        this.$txtConfirmPassword.type = "password";
        this.$txtConfirmPassword.placeholder = "Confirm password ...";

        this.$formRegister = document.createElement("form");
        this.$formRegister.addEventListener('submit', this.handleSubmit)

        this.$btnSubmit = document.createElement("button");
        this.$btnSubmit.type = "submit";
        this.$btnSubmit.innerHTML = "Register";

        this.$errorMessage = document.createElement("p");
        this.$errorMessage.classList.add('error-message'); //style trong css
    }

    handleSubmit = (event) => {
        event.preventDefault(); // ngăn k cho trang reload từ nút submit
        const email = this.$txtEmail.value;
        const displayName = this.$txtDisplayName.value;
        const password = this.$txtPassword.value;
        const confirmPassword = this.$txtConfirmPassword.value;

        if (email === ""){
            this.setErrorMessage("Email cannot be empty");
            return;
        }
        if (displayName === ""){
            this.setErrorMessage("Display name cannot be empty");
            return;
        }
        if (password === "") {
            this.setErrorMessage("Password cannot be empty");
            return;
        }
        if (confirmPassword === "") {
            this.setErrorMessage("C.P cannot be empty");
            return;
        }
        if (password != confirmPassword) {
            this.setErrorMessage("Not match");
            return;
        }
        this.setErrorMessage("");

        firebase
        .auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential);
            firebase.auth().currentUser.updateProfile({
                displayName: displayName
            })
            firebase.auth().currentUser.sendEmailVerification();
        });



        console.log(email, displayName, password, confirmPassword);

    }
    

    setErrorMessage = (content) => { //function để báo lỗi
        this.$errorMessage.innerHTML = content;
        if (content !==  ""){
            this.$errorMessage.style.display = "block";
        } else {
            this.$errorMessage.style.display = "none";
        } 
    }

    gotoLogin = () => {
        const login = new Login();
        app.changeActiveScreen(login);
    }


    initRender = (container) => {
        const flexContainer = document.createElement("div");
        flexContainer.classList.add("d-flex", "flex-column",  "centering");
        const title = document.createElement('h2');
        title.innerHTML = "Create an account";
        flexContainer.appendChild(title);
        flexContainer.appendChild(this.$errorMessage);

        flexContainer.appendChild(this.$txtEmail);
        flexContainer.appendChild(this.$txtDisplayName);
        flexContainer.appendChild(this.$txtPassword);
        flexContainer.appendChild(this.$txtConfirmPassword);
        flexContainer.appendChild(this.$btnSubmit);

        const linkToLogin = document.createElement("a");
        linkToLogin.href = "#";
        linkToLogin.innerHTML = "Back to Login";
        linkToLogin.addEventListener("click", this.gotoLogin);

        flexContainer.appendChild(linkToLogin);

        this.$formRegister.appendChild(flexContainer);
        // lần render đầu tiên, container là thẻ div chứa form
        container.appendChild(this.$formRegister);     
    }
}



export default Register;



