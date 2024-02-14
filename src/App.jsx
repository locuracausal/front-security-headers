import { useState } from 'react'
import reactLogo from './assets/react.svg'
import AppBar from './components/AppBar'
import {Button, Container } from '@mui/material'
import viteLogo from '/vite.svg'
import Home from './pages/index'
import Home2 from './pages/home2'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const primary = '#0dafb6';
  const secondary = '#FFC107';
  const white='ffffff'

  const theme = createTheme({
    components: {
      Button: {
        sizes: {
          small: "16px",
          medium: "24px",
          large: "90px",
        },
      },
    },
    shape: {
      borderRadius: 0,
    },
    palette: {
      primary: {
        main: primary,
        contrastText: "#ffffff",
      },
      secondary: {
        main: secondary,
      },
      white: {
        main: white
      }
      
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <AppBar/>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/home2' element={<Home2 />}/>
      </Routes>
        {/* <Container sx={{mt:6}}>
        <Outlet />
        
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <Button variant="contained" color="primary" size="large">
          Large Button
        </Button>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        </Container> */}
      </BrowserRouter>

    </ThemeProvider>

    </>
  )
}

export default App
