import architectServices from "../services/architects";

const architectsReducer = (state = { architects: [], chats: [], offers: [] }, action) => {
    switch (action.type) {
        case "getArchitects":
            architectServices.getArchitects();
            return { architects: [] }
        case "architectsRecieved":
            console.log("all architects", action.payload)
            return { architects: action.payload }
        case "saveoffer":
            architectServices.saveoffer(action.payload)
            return state
        case "getchats":
            architectServices.getChats()
            return state
        case "getOffers":
            architectServices.getOffers(action.payload)
            return { offers: [] }
        case "offersRecieved":
            return { offers: action.payload }
        case "chatsRecieved":
            console.log("chats in reducer", action.payload)
            return { chats: action.payload }
        case "removeArchitect":
            architectServices.removeArchitect(action.payload);
        default:
            return state
    }
}

export default architectsReducer;