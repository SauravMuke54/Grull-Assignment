import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import UserSignup from "./component/Signup/UserSignup";
import UserSignin from "./component/Signin/UserSignin";
import CommunitySignup from "./component/Signup/CommunitySignup";
import CommunitySignin from "./component/Signin/CommunitySignin";
import Footer from "./component/Footer/Footer";
import UserDashboard from "./component/Dashboard/UserDashboard";
import PrivateRoute from "./helper/PrivateRoute";
import AdminRoute from "./helper/AdminRoute";
import CommunityManagerDashboard from "./component/Dashboard/CommunityManagerDashboard";
import QuestDetails from "./component/QuestDetails/QuestDetails";
import SearchedQuest from "./component/SearchedQuest/SearchedQuest";


function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/signup" element={<UserSignup/>}/>
        
        <Route path="/user/signin" element={<UserSignin/>}/>
        
        <Route path="/community/signup" element={<CommunitySignup/>}/>
        
        <Route path="/community/signin" element={<CommunitySignin/>}/>
        <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard/></PrivateRoute>}/>
        <Route path="/searched-quests" element={<PrivateRoute><SearchedQuest/></PrivateRoute>}/>       
        <Route path="/quest-details" element={<PrivateRoute><QuestDetails/></PrivateRoute>}/>
        <Route path="/community/dashboard" element={<AdminRoute><CommunityManagerDashboard/></AdminRoute>}/>
        
      </Routes>

      {/* <Footer/> */}
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
