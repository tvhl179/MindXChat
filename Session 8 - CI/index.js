
// các tính năng: register, login, logout, create conversation
//, send message, (optional)share files, invite/remove users

// import Register from "./register.js";
import Login from "./login.js";
import Main from "./main.js";


// register.initRender(container); //truyền tham số vào hàm tạo

// login.initRender(container);



class App {
    activeScreen
    container

    constructor (container) {
        this.container = container;
        this.setUpFirebaseAuthListener();
    }

    setUpFirebaseAuthListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                const main = new Main();
                this.changeActiveScreen(main);
            } else {
                const login = new Login();
                this.changeActiveScreen(login);
            }
        })
    }

    changeActiveScreen(screen){
        if (this.activeScreen !== undefined) { // nếu màn hình cũ còn gì => xóa
            this.container.innerHTML = "";
        }
        this.activeScreen = screen;
        this.activeScreen.initRender(this.container); // render màn hình mới
    }
}


const container = document.getElementById("app");
// const register = new Register();
const login = new Login();
const app = new App(container);
app.changeActiveScreen(login);

export default app;
