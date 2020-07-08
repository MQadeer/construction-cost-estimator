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
        console.log("builders chat services ", info)
        Axios.post('/chats/getChats', info)
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
    },
    saveoffer: (info) => {
        Axios.post('/builders/addOffer', info)
            .then(response => {
                swal({
                    title: "Offer sent!",
                    text: "!",
                    icon: "success",
                });
            })
    },
    getOffers: (info) => {
        console.log("offers services")
        Axios.post('/builders/getOffers', info)
            .then(response => {
                console.log(response.data)
                store.dispatch({
                    type: "offersRecieved",
                    payload: response.data
                })
            })
    }
}

export default builderServices;