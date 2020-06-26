import {createStore,combineReducers} from "redux";
import materialsReducer from "./reducers/materials";
import architectsReducer from "./reducers/architects";
import loginReducer from "./reducers/login";

const store =createStore(combineReducers({materialsReducer,architectsReducer,loginReducer}));

export default store;