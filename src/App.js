import React from 'react';
import { Router, Route } from "react-router-dom"
import history from "./history"
import Home from "./components/home/index";
import About from "./components/about/index";
import PrivacyPolicy from "./components/privacyPolicy/index";
import TermsOfUse from "./components/termsOfUse/index";
import { Provider } from "react-redux";
import store from './redux/store';
import nDashboard from './components/dashboard/materials';
import MaterialPricing from "./components/materialPrices/index";
import NArchitechturers from "./components/architechturers/index";
import Chatbox from "./components/chatbox/index";
import ArchitectsChatbox from "./components/chatbox/architectChatbox";
import ArchitectDashboard from "./components/architectDashboard/index";
import Builders from "./components/builders/index";
import BuilderDashboard from "./components/builderDashboard/index";
import ContactUs from "./components/contactus/index";


function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <header className="App-header">
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route exact path='/contactUs' component={ContactUs}></Route>
          <Route exact path='/privacy-policy' component={PrivacyPolicy}></Route>
          <Route exact path='/terms-of-use' component={TermsOfUse}></Route>
          <Route exact path='/materialsPage' component={MaterialPricing}></Route>
          <Route exact path='/dashboard' component={nDashboard}></Route>
          <Route exact path='/architecturers' component={NArchitechturers}></Route>   
          <Route exact path='/architecturersDshboard' component={ArchitectDashboard}></Route>
          <Route exact path='/builders' component={Builders}></Route>
          <Route exact path='/buildersDshboard' component={BuilderDashboard}></Route>
          <Route exact path='/chatRoom' component={Chatbox}></Route>
          <Route exact path='/chatBox' component={ArchitectsChatbox}></Route>
        </header>
      </Router>
    </Provider>
  );
}

export default App;
