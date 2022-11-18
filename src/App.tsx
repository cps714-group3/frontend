import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { useFirebaseApp, AuthProvider } from 'reactfire';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { getAuth } from 'firebase/auth';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { LandingNav } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Reports } from './pages/Reports';
import { ProjectSettings } from './pages/ProjectSettings';

function App() {
    const app = useFirebaseApp();
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <LandingNav />
            <Routes>
                <Route path='/' element={<Landing />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />} />
                <Route path='/reports' element={<Reports />}></Route>
                <Route path='/project-settings' element={<ProjectSettings />}></Route>
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;
