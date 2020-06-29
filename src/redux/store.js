import {createStore,combineReducers} from "redux";
import materialsReducer from "./reducers/materials";
import architectsReducer from "./reducers/architects";
import loginReducer from "./reducers/login";
import buildersReducer from "./reducers/builder";

const store =createStore(combineReducers({materialsReducer,architectsReducer,loginReducer,buildersReducer}));

export default store;