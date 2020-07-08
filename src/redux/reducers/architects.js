import architectServices from "../services/architects";

const architectsReducer = (state = { architects: [], chats: [], offers: [] }, action) => {
    switch (action.type) {
        case "getArchitects":
            architectServices.getArchitects();
            return state
        case "architectsRecieved":
            console.log("all architects", action.payload)
            return { architects: action.payload }
        case "saveoffer":
            architectServices.saveoffer(action.payload)
            return state
        case "getchatsA":
        console.log("chat reducer ",action.payload)
            architectServices.getChats(action.payload)
            return state
        case "getOffers":
            architectServices.getOffers(action.payload)
            return { offers: [] }
        case "offersRecieved":
            return { offers: action.payload }
        case "AchatsRecieved":
            console.log("chats in reducer", action.payload)
            return { chats: action.payload }
        case "removeArchitect":
            architectServices.removeArchitect(action.payload);
        default:
            return state
    }
}

export default architectsReducer;