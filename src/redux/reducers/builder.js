import builderServices from "../services/builders";

const buildersReducer = (state = { builders: [], chats: [],buildersOffers:[] }, action) => {
    switch (action.type) {
        case "getBuilders":
            builderServices.getBuilders();
            return state
        case "buildersRecieved":
            console.log("all builders", action.payload)
            return { builders: action.payload }
        case "saveBuilderOffer":
            builderServices.saveoffer(action.payload)
            return state
        case "getchatsB":
            console.log("chat reducer ", action.payload)
            builderServices.getChats(action.payload)
            return state
        case "chatsRecieved":
            console.log("chats in reducer", action.payload)
            return { chats: action.payload }
        case "getOffersB":
            builderServices.getOffers(action.payload)
            return { buildersOffers: [] }
        case "offersRecieved":
            return { buildersOffers: action.payload }
        case "removeBuilder":
            builderServices.removeBuilder(action.payload);
        default:
            return state
    }
}

export default buildersReducer;