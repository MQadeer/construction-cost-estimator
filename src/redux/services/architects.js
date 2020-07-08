import Axios from "axios";
import store from "../store";
import swal from "sweetalert";
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
    getChats:(info)=>{
        console.log("chat services ",info)
        Axios.post('/chats/getChats',info)
        .then(response=>{
            store.dispatch({
                type: "AchatsRecieved",
                payload: response.data
            })
        })
    },
    removeArchitect:(info)=>{
        Axios.post('/architects/removeArchitect',info)
        .then(response=>{
            swal({
                title: "Architect removed !",
                icon: "success",
              });
        })
    },
    saveoffer:(info)=>{
        Axios.post('/architects/addOffer',info)
        .then(response=>{
            swal({
                title: "Offer sent!",
                text: "!",
                icon: "success",
              });
        })
    },
    getOffers:(info)=>{
        console.log("offers services")
        Axios.post('/architects/getOffers',info)
        .then(response=>{
            console.log(response.data)
            store.dispatch({
                type: "offersRecieved",
                payload: response.data
            })
        })
    }
}

export default architectServices;