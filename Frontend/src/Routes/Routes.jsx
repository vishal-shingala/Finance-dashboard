import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Register from '../pages/Register';   
import { useContext } from 'react';
import { UserContext } from '../context/User.context';
import TransactionPage from '../pages/TransactionPage';

function PageRouters(){
    const {currUser} = useContext(UserContext);
    console.log(currUser);
    
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={currUser ? <Dashboard/> : <Login/>}/>
            <Route path='/profile' element={currUser ? <Profile/> : <Login/>}/> 
            <Route path='/register' element={<Register/>}/> 
            <Route path='/transactions' element={currUser ? <TransactionPage/> : <Login/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default PageRouters;