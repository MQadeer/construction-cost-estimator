import materialsServices from "../services/materials";

const materialsReducer = (state = { materials: [] }, action) => {
    switch (action.type) {
        case "getMaterials":
            materialsServices.getMaterials();
            return state
        case "materialsRecieved":
            console.log("reducer : ", action.payload)
            return { materials: action.payload }
        case "updateMaterials":
            materialsServices.updateMaterials(action.payload)
            console.log("reducer updated materials : ", action.payload)
            return state
        default:
            return state
    }
}

export default materialsReducer;