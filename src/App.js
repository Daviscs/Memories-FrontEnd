import React from 'react'
import { Container} from '@material-ui/core'
import {GoogleOAuthProvider} from '@react-oauth/google'

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PostDetails from './components/PostDetails/PostDetails'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () =>{
    const user = JSON.parse(localStorage.getItem('profile'))

    return(
        <BrowserRouter>
        <GoogleOAuthProvider clientId="875519259731-7d3104b64bb8o09alo10p19q6lkm8m89.apps.googleusercontent.com">
            <Container maxWidth="xl">
                <Navbar/>
                <Routes>
                    <Route path="/" element={ <Navigate to="/posts" /> }></Route>
                    <Route path="/posts" element={<Home/>}></Route>
                    <Route path="/posts/search" element={<Home/>}></Route>
                    <Route path="/posts/:id" element={<PostDetails/>}></Route>
                    <Route path="/auth" element={!user ? (<Auth/>) : (<Navigate to="/posts"/>)}></Route>
                </Routes>
            </Container>
        </GoogleOAuthProvider>
        </BrowserRouter>
    )
}

export default App;