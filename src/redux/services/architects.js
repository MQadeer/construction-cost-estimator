import Axios from "axios";
import store from "../store";

 const materialsServices={
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
    }
}

export default materialsServices;