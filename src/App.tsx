import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { useFirebaseApp, AuthProvider } from 'reactfire';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { getAuth } from 'firebase/auth';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';

function App() {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const location=useLocation();
    const isLandingPage = location.pathname==="/"
    return (
        <AuthProvider sdk={auth}>
            
            {!isLandingPage && <Header />}
            <Routes>
                <Route path='/' element={<Landing />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
            
        </AuthProvider>
    );
}

export default App;
