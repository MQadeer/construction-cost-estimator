import builderServices from "../services/builders";

const buildersReducer = (state = { builders: [],chats:[] }, action) => {
    switch (action.type) {
        case "getBuilders":
            builderServices.getBuilders();
            return state
        case "buildersRecieved":
            console.log("all architects",action.payload)
            return { builders: action.payload }
        case "getchats":
            builderServices.getChats()
            return state
        case "chatsRecieved":
            console.log("chats in reducer",action.payload )
            return { chats: action.payload }
        default:
            return state
    }
}

export default buildersReducer;