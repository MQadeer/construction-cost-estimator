import Axios from "axios";
import store from "../store";
import swal from "sweetalert";

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
    getChats: (info) => {
        console.log("builders chat services ",info)
        Axios.post('/chats/getChats',info)
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
                    swal({
                        title: "Builder removed!",
                        icon: "success",
                      });
                }
            })
    }
}

export default builderServices;