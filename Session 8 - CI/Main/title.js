class Title {
    name;
    noOfUsers;

    $txtName;
    $txtNoOfUsers;

    constructor(name, noOfUsers) {
        this.name = name;
        this.noOfUsers = noOfUsers;

        this.$txtName = document.createElement("span");
        this.$txtName.innerHTML = this.name;

        this.$txtNoOfUsers = document.createElement("small");
        this.$txtNoOfUsers.innerHTML = this.noOfUsers;
    }

    setActiveConversation = (activeConversation) => {
        this.name = activeConversation.name;
        this.noOfUsers = activeConversation.users.length;
        this.$txtName.innerHTML = this.name;
        this.$txtNoOfUsers.innerHTML = this.noOfUsers;
    }

    initRender = (container) => {
        const div = document.createElement("div");
        div.classList.add("d-flex", "item", "justify-between");

        div.appendChild(this.$txtName);
        div.appendChild(this.$txtNoOfUsers);

        container.appendChild(div);
    }
}

export default Title;