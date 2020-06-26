import axios from "axios";
import store from "../store";

 const materialsServices={
    getMaterials:()=>{
        console.log("in reducer function")
        axios.get("/materials/getMaterials")
        .then(resp=>{
            store.dispatch({
                type:"materialsRecieved",
                payload:resp.data
            })
        })
        
    },
    updateMaterials:(info)=>{
        axios.post("/materials/updateMaterial",info)
        .then(resp=>{
            console.log("response is : ",resp);
            alert('update success')
        })
        
    }
}

export default materialsServices;