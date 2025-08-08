import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Register from '../pages/Register';   

function PageRouters(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/profile' element={<Profile/>}/> 
            <Route path='/register' element={<Register/>}/> 
        </Routes>
        </BrowserRouter>
    )
}

export default PageRouters;