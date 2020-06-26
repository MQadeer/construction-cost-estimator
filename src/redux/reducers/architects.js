import materialsServices from "../services/architects";

const architectsReducer = (state = { architects: [],chats:[] }, action) => {
    switch (action.type) {
        case "getArchitects":
            materialsServices.getArchitects();
            return state
        case "architectsRecieved":
            console.log("all architects",action.payload)
            return { architects: action.payload }
        case "getchats":
            materialsServices.getChats()
            return state
        case "chatsRecieved":
            console.log("chats in reducer",action.payload )
            return { chats: action.payload }
        default:
            return state
    }
}

export default architectsReducer;