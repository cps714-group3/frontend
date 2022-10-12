import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { useFirebaseApp, AuthProvider } from 'reactfire';
import './App.css';
import { Header } from './components/header/Header';
import { getAuth } from 'firebase/auth';

function App() {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    return (
        <AuthProvider sdk={auth}>
            <Box w='100vw' h='100vh'>
                <Header />
            </Box>
        </AuthProvider>
    );
}

export default App;
