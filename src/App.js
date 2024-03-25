import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Component/Home'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import Navbar from './Component/Navbar/Navbar';
import Resources from './Component/Resources/Resources';
import Chat from './Component/Chat/Chat';
import Username from './Component/Username/Username';
import ForgotPassword from './Component/password/ForgotPassword';
import ResetPassword from './Component/password/ResetPassword';
import PostHistory from './Component/MyPost/PostHistory';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={user? <Resources/> :<Login/>} />
        <Route path="/chat" element={user? <Chat/> :<Login/>} />
        <Route path="/username" element={user? <Username/> :<Signup/>} />
        <Route path="/login" element={user? <Home/> :<Login/>}/>
        {/* <Route path="/login" exact component={() => (!user ? <Login /> : <Home/>)} /> */}
        <Route path="/signup" element={user? <Home/> :<Signup/>} />
        <Route path="/posthistory" element={<PostHistory />} />
        {/* <Route path="/sendpost" element={<SendPost />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token/:email" element={<ResetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
