
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Register from "../Components/Register"
import ChatPage from '../Components/Chats'

export default function Routing() {
  return (
    <div>

        <BrowserRouter>
        <Routes>
            <Route path='/Logout' element={<Login></Login>}></Route>
            <Route path='/' element={<Register></Register>}></Route>
            <Route path='/index/Chat/start/welcome/Chatrix' element={<ChatPage></ChatPage>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
