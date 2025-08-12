import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Register from '../pages/Register';   
import { useContext } from 'react';
import { UserContext } from '../context/user.context';

function PageRouters(){
    const {currUser} = useContext(UserContext);
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={currUser ? <Dashboard/> : <Login/>}/>
            <Route path='/profile' element={currUser ? <Profile/> : <Login/>}/> 
            <Route path='/register' element={<Register/>}/> 
        </Routes>
        </BrowserRouter>
    )
}

export default PageRouters;