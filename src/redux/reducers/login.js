import loginServices from "../services/login";
import history from "../../history";

const loginReducer = (state = {
    login: {}, signupSuccess: false, logedIn: false, user: {},
    openSignup: false, contactRequests: []
}, action) => {
    switch (action.type) {
        case "login":
            loginServices.login(action.payload);
            return state
        case "loginSuccess":
            // state.user = action.payload;
            // history.push("/dashboard")
            console.log("login services user :", action.payload)
            return { logedIn: true, user: action.payload }
        case "logout":
            loginServices.logout();
            history.push("/")
            return { logedIn: false, }
        case "logoutSuccess":
            // state.user = action.payload;
            // history.push("/dashboard")
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
            return {contactRequests:action.payload}
        default:
            return state
    }
}

export default loginReducer;