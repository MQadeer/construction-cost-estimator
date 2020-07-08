import axios from "axios";
import store from "../store";
import history from "../../history";
import swal from "sweetalert";
const loginServices = {
    login: (info) => {
        
        axios.post('/login/signIn', info)
            .then(res => {
                console.log("login success resp ", res)
                localStorage.setItem("logedUser", JSON.stringify({ id: res.data._id, name: res.data.name, user: res.data.user }))
                localStorage.setItem("logedIn", JSON.stringify(true))
                if (res.data.user == "publicUser") {
                    store.dispatch({
                        type: "getchatsU",
                        payload: { user: JSON.parse(localStorage.getItem("logedUser")) }
                    })
                    history.push("/")
                }
                else if (res.data.name == "admin") {
                    history.push("/dashboard")
                }
                else if (res.data.user == "architechturer") {
                    history.push("/DashboardArchitecturers")
                } else if (res.data.user == "builder") {
                    history.push("/DashboardBuilders")
                }
                return store.dispatch({
                    type: "loginSuccess",
                    payload: res.data
                })

            })
            .catch(err => {
                history.push("/")
                swal({
                    title: "signIn failed !",
                    text: "check email or password",
                    icon: "info",
                });

                console.log("login service error ", err)
            })

    },
    logout: () => {
        console.log("in logout reducer function")
        axios.get('/login/signOut')
            .then(res => {
                console.log("logout succes resp ", res)
                localStorage.removeItem("logedUser")
                localStorage.removeItem("publichats")
                return store.dispatch({
                    type: "logoutSuccess",
                    payload: res.data
                })

            })
            .catch(err => {
                swal({
                    title: "logout failed!",
                    icon: "error",
                });
                console.log(err.message)
            })

    },
    signup: (info) => {
        console.log("in signup reducer function", info)
        axios.post('/login/signUp', info)
            .then(res => {
                console.log(res)
                history.push("/")
                if (res.data == "success") {
                    swal({
                        title: "New Account Created!",
                        icon: "success",
                    });
                }
                else if (res.data == "duplicate") {
                    swal({
                        title: "SignUp failed!",
                        text: "this email already exists!",
                        icon: "error",
                    });
                }
            })
            .catch(err => {
                swal({
                    title: "SignUp failed!",
                    icon: "error",
                });

                console.log(err.message)
            })
    },
    contactRequest: (info) => {
        console.log("in contatct request ", info)
        axios.post('/login/contactRequest', info)
            .then(res => {
                console.log(res)
                if (res.data == "success") {
                    swal({
                        title: "Message sent!",
                        icon: "success",
                    });
                }
            })
            .catch(err => {
                swal({
                    title: "Sending failed!",
                    icon: "error",
                });
                console.log(err.message)
            })
    },
    getContactRequest: () => {
        axios.get('/login/getContactRequest')
            .then(res => {
                store.dispatch({
                    type: "contactRequestRecieved",
                    payload: res.data
                })
            })
            .catch(err => {
                swal({
                    title: "failed!",
                    icon: "error",
                });

                console.log(err.message)
            })
    },
    getChats: (info) => {
        axios.post('/chats/getPublicChats', info)
            .then(response => {
                console.log("public chat",response.data)
                localStorage.setItem("publichats",JSON.stringify(response.data))
                // store.dispatch({
                //     type: "PublicchatsRecieved",
                //     payload: response.data
                // })
                
            }).catch(err=>{
                console.log("publichats error ",err)
            })
    },
}

export default loginServices;