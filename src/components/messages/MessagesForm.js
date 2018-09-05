makeChat = (chatList) => {
    chatList.reverse().forEach((messageObject, index) => {
        this.props.get("messages", messageObject.userId)
        .then(userObject => userObject.username)
        .then(username => {
            let chatHistory = document.getElementById("chatHistory");
            let messageBox = document.createElement("div");
            messageBox.setAttribute("id", `messageBox--${index}`);
            messageBox.setAttribute("class", "messages");
            let messageArea = document.createElement("div");
            messageArea.setAttribute("class", "chatMessage");
            messageArea.innerText = `${messageObject.message}`;
            let userBox = document.createElement("div");
            userBox.innerText = username;
            let editButton = document.createElement("div");
            editButton.setAttribute("id", `editchatButton--${messageObject.id}`);
            editButton.setAttribute("class", `editChatButton`);
            editButton.innerText = "Edit";
            let deleteButton = document.createElement("div");
            deleteButton.setAttribute("id", `deletechatButton--${messageObject.id}`);
            deleteButton.setAttribute("class", `deleteChatButton`);
            deleteButton.innerText = "Delete";
            messageBox.appendChild(userBox, messageArea, editButton, deleteButton);
            chatHistory.appendChild(messageBox);
        })
    })
}