import app from "./index.js";
import Register from "./register.js";

class Login {
    $txtEmail;
    $txtPassword;

    $formLogin; //form
    $btnSubmit; // nút submit
    
    constructor() {
        this.$txtEmail = document.createElement("input"); // tạo thẻ input
        this.$txtEmail.type = "email"; // loại thẻ
        this.$txtEmail.placeholder = "Enter your email";

        this.$txtPassword = document.createElement("input");
        this.$txtPassword.type = "password";
        this.$txtPassword.placeholder = "Enter your password";

        this.$formLogin = document.createElement("form");
        this.$formLogin.addEventListener("submit", this.login);

        this.$btnSubmit = document.createElement("button");
        this.$btnSubmit.type = "submit";
        this.$btnSubmit.innerHTML = "Login";
    }

    login = (event) => {
        event.preventDefault;
        const email = this.$txtEmail.value;
        const password = this.$txtPassword.value;

        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential);
        });
    }

    gotoRegister = () => {
        const register = new Register();
        app.changeActiveScreen(register);
    }

    initRender = (container) => {  // để hiển thị ra màn hình những cái trên
        const flexContainer = document.createElement("div");
        flexContainer.classList.add("d-flex", "flex-column", "centering");
            
        const title = document.createElement("h2");
        title.innerHTML = "Login";
        flexContainer.appendChild(title);


        flexContainer.appendChild(this.$txtEmail); // append các thẻ này vào flexContainer để chỉnh CSS
        flexContainer.appendChild(this.$txtPassword);
        flexContainer.appendChild(this.$btnSubmit);

        const linkTogether = document.createElement("a");
        linkTogether.innerHTML = "Go to Register";
        linkTogether.addEventListener("click", this.gotoRegister);

        flexContainer.appendChild(linkTogether);

        this.$formLogin.appendChild(flexContainer);
        container.appendChild(this.$formLogin);

    }
}

export default Login;