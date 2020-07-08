import loginServices from "../services/login";
import history from "../../history";
import swal from "sweetalert";

const loginReducer = (state = {
    login: {}, signupSuccess: false, logedIn: false, user: {},
    openSignup: false, contactRequests: [], allChats: []
}, action) => {
    switch (action.type) {
        case "login":
            loginServices.login(action.payload);
            return state
        case "loginSuccess":
            swal({
                title: "Logged in!",
                icon: "success",
            });
            console.log("login services user :", action.payload)
            return { logedIn: true, user: action.payload }
        case "logout":
            loginServices.logout();
            history.push("/")


            return { logedIn: false, }
        case "logoutSuccess":
            swal({
                title: "Logged out!",
                icon: "success",
            });
            return { logedIn: false }

        case "signup":
            loginServices.signup(action.payload)
            return state
        case "signupSuccess":
            state.signupSuccess = true
            return state
        case "ContactMessage":
            loginServices.contactRequest(action.payload)
            return state
        case "getContactRequest":
            loginServices.getContactRequest(action.payload)
            return state
        case "contactRequestRecieved":
            console.log("contact requests  :", action.payload)
            return { contactRequests: action.payload }
        case "getchatsU":
            loginServices.getChats(action.payload)
            return state
        case "UchatsRecieved":
            console.log("chats login reducer ", action.payload)
            return { allChats: action.payload }
        case "PublicchatsRecieved":
            console.log("chats login reducer ", action.payload)
            return { allChats: action.payload }
        default:
            return state
    }
}

export default loginReducer;