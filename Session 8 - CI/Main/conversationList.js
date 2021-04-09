import CreateConversationModal from "./createConversationModal.js";
import Conversation from "./conversation.js";

class ConversationList {
    $btnCreateConversation;
    $conversationListContainer;

    createConversationModal;

    conversationList;
    activeConversation;
    onChangeActiveConversation;

    constructor (onChangeActiveConversation) {
        this.$btnCreateConversation = document.createElement("button");
        this.$btnCreateConversation.innerHTML = "New";
        this.$btnCreateConversation.addEventListener("click", this.openCreateModal);

        this.$conversationListContainer = document.createElement("div");

        this.createConversationModal = new CreateConversationModal();
        this.setUpConversationListener();

        this.conversationList = [];

        this.onChangeActiveConversation = onChangeActiveConversation;
    }

    setUpConversationListener = () => {
        db.collection("conversations")
        .where("users", "array-contains", firebase.auth().currentUser.email)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type === "added"){
                    const conversation = new Conversation(
                        change.doc.id,
                        change.doc.data().name,
                        change.doc.data().users,
                        (conversation) => {
                            this.onChangeActiveConversation(conversation);
                        }
                    );
                    this.conversationList.push(conversation);
                    conversation.initRender(this.$conversationListContainer);
                }

                if(change.type === "modified"){
                    const conversation = this.conversationList.find((item) => {
                        return item.id === change.doc.id;
                    })
                    conversation.updateData(change.doc.data())
                }
                
            })
        })
    }

    openCreateModal = () => {
        this.createConversationModal.setVisible(true);
    }

    setActiveConversation = (conversation) => {
        if (this.activeConversation) {
            this.activeConversation.setActive(false);   
        }    
        
        this.activeConversation = conversation;
        this.activeConversation.setActive(true);

    }

    initRender = (container) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.style.width = "200px";

        div.appendChild(this.$btnCreateConversation);
        div.appendChild(this.$conversationListContainer);
        this.createConversationModal.initRender(div);

        container.appendChild(div);
    }
}

export default ConversationList;

