import Axios from "axios";
import store from "../store";

 const architectServices={
    getArchitects:()=>{
        Axios.get('/architects/getArchitects')
        .then(response=>{
            store.dispatch({
                type: "architectsRecieved",
                payload: response.data
            })
        })
    },
    getChats:()=>{
        Axios.get('/chats/getChats')
        .then(response=>{
            // console.log("all chats",response.data)
            store.dispatch({
                type: "chatsRecieved",
                payload: response.data
            })
        })
    },
    removeArchitect:(info)=>{
        Axios.post('/architects/removeArchitect',info)
        .then(response=>{
            alert("Architect removed ")
        })
    },
    saveoffer:(info)=>{
        Axios.post('/architects/addOffer',info)
        .then(response=>{
            alert("success")
        })
    }
}

export default architectServices;