import AppBar from './components/AppBar'
import { Toaster } from 'react-hot-toast'
import Home from './pages/index'
import Detail from './pages/detail'
import Summary from './pages/summary'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'

function App() {
  const primary = '#0dafb6';
  const secondary = '#FFC107';
  const white='ffffff'
  const red = '#f05654'

  const theme = createTheme({
    shape: {
      // borderRadius: 0,
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
      },
      red: {
        main: red
      }
    },
  });
  

  return (
    <>
    <ThemeProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <AppBar/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/detail' element={<Detail />}/>
          <Route path='/summary' element={<Summary />}/>
        </Routes>
      </BrowserRouter>

    </ThemeProvider>

    </>
  )
}

export default App
