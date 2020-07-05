import Axios from "axios";
import store from "../store";

const builderServices = {
    getBuilders: () => {
        Axios.get('/builders/getBuilders')
            .then(response => {
                store.dispatch({
                    type: "buildersRecieved",
                    payload: response.data
                })
            })
    },
    getChats: () => {
        Axios.get('/chats/getChats')
            .then(response => {
                // console.log("all chats",response.data)
                store.dispatch({
                    type: "chatsRecieved",
                    payload: response.data
                })
            })
    },
    removeBuilder: (info) => {
        Axios.post('/builders/removeBuilder', info)
            .then(response => {
                if (response == "success") {
                    alert("Architect removed ")
                }
            })
    }
}

export default builderServices;