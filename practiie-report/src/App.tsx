import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Register from './components/Register';
import Home from './components/Home'; // Suponiendo que Home es un componente de PrimeReact

const theme = createTheme();

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;


