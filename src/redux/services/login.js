import axios from "axios";
import store from "../store";
import history from "../../history";

const loginServices = {
    login: (info) => {
        axios.post('/login/signIn', info)
            .then(res => {
                console.log("login success resp ", res)
                localStorage.setItem("logedUser", JSON.stringify(res.data._id))
                localStorage.setItem("logedIn", JSON.stringify(true))
                if (res.data.name == "admin") {
                    history.push("/dashboard")
                }
                else if (res.data.user == "publicUser") {
                    history.push("/")
                }
                else if (res.data.user == "architechturer") {
                    history.push("/architecturersDshboard")
                } else if (res.data.user == "builder") {
                    history.push("/buildersDshboard")
                }
                return store.dispatch({
                    type: "loginSuccess",
                    payload: res.data
                })

            })
            .catch(err => {
                history.push("/")

                alert("signIn failed check email or password")

                console.log("login service error ", err)
            })

    },
    logout: () => {
        console.log("in logout reducer function")
        axios.get('/login/signOut')
            .then(res => {
                console.log("logout succes resp ", res)
                localStorage.removeItem("logedUser")
                return store.dispatch({
                    type: "logoutSuccess",
                    payload: res.data
                })

            })
            .catch(err => {
                alert("logout failed")
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
                    alert("New Account Created")
                }
            })
            .catch(err => {
                alert("signUp failed")

                console.log(err.message)
            })
    },
    contactRequest: (info) => {
        console.log("in contatct request ", info)
        axios.post('/login/contactRequest', info)
            .then(res => {
                console.log(res)
                if (res.data == "success") {
                    alert("Message sent")
                }
            })
            .catch(err => {
                alert("Sending failed")

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
                alert("Sending failed")

                console.log(err.message)
            })
    }
}

export default loginServices;