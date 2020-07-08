import axios from "axios";
import store from "../store";
import swal from "sweetalert";
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
            swal({
                title: "update success!",
                icon: "success",
              });
        })
        
    }
}

export default materialsServices;