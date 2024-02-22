import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { HomePage } from './components/Homepage/HomePage';
import './App.css'
import { NavBar } from './components/Navbar/NavBar';
import { ThemeProvider } from "@/Controllers/theme-provider"
import { People } from './components/People/People';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/ >} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/user' element={<People/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
