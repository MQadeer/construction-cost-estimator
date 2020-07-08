import builderServices from "../services/builders";

const buildersReducer = (state = { builders: [], chats: [] }, action) => {
    switch (action.type) {
        case "getBuilders":
            builderServices.getBuilders();
            return state
        case "buildersRecieved":
            console.log("all builders", action.payload)
            return { builders: action.payload }
        case "getchatsB":
            console.log("chat reducer ",action.payload)
            builderServices.getChats(action.payload)
            return state
        case "chatsRecieved":
            console.log("chats in reducer", action.payload)
            return { chats: action.payload }
        case "removeBuilder":
            builderServices.removeBuilder(action.payload);
        default:
            return state
    }
}

export default buildersReducer;