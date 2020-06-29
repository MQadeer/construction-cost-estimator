import materialsServices from "../services/materials";
import history from "../../history";

const materialsReducer = (state = { materials: [],buildingValues:{} }, action) => {
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
        case "calculateCost":
            history.push("./materialsPage")
            return {buildingValues:action.payload}
        default:
            return state
    }
}

export default materialsReducer;