import{BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Signin from './Pages/Signin.jsx'
import Profile from './Pages/Profile.jsx'
import Signup from './Pages/Signup.jsx'
import Header from './Components/Header.jsx'
import ProtectedRoutes from './Components/ProtactedRoutes.jsx';



function App() {
  a

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        
        <Route path="/Sign-Up" element={<Signup />} />
        <Route path="/Sign-In" element={<Signin />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/Profile" element={<Profile />} />
     </Route>
     </Routes>
     </BrowserRouter>
      
  )
}

export default App
