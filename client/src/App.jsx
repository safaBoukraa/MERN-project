import './Appp.css'
import Cat from './components/Cat'
import Dog from './components/Dog'
import Fish from './components/Fish'
import Footer from './components/Footer'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import Loginn from './pages/Loginn'
import Reg from './pages/Reg'
import Navbar from './pages/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import Create from './components/Create'
import Update from './components/Update'
import ShowOne from './components/ShowOne'
import About from './pages/About'




import AdminUser from './pages/AdminUser'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Wishlist from './pages/Wishlist'
function App() {
  const [loggedUser, setLoggedUser] = useState(null); // Initialize loggedUser state
  const token = localStorage.getItem('token')
  useEffect(() => {
    const GetLoggedUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', { withCredentials: true });
        console.log('Server Response:', response);

        const { token, loggedUser } = response.data;
        setLoggedUser(loggedUser);
      } catch (error) {
        console.log('Frontend Request Error:', error);
      }
    };

    if (token) {
      GetLoggedUser();
    }
  }, [token]);
  console.log(loggedUser)
  return (
    <>
      <Navbar loggedUser={loggedUser} />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/categorie/cat' element={<Cat />} />
        <Route path='/categorie/dog' element={<Dog />} />
        <Route path='/categorie/fish' element={<Fish />} />
        <Route path='/login' element={<Loginn />} />
        <Route path='/reg' element={<Reg />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/product/new' element={<Create />} />
        <Route path='/product/edit/:id' element={<Update />} />
        <Route path='/product/:id' element={<ShowOne />} />
        <Route path='/about' element={<About />} />
        <Route path='/users' element={<AdminUser />} />
        <Route path='/product/wishlist' element={<Wishlist />} />
    
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
