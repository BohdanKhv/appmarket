import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import {
  Home,
  Categories,
  Developer,
  Profile,
  Favorite,
  Settings,
  Dashboard,

  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from './pages';


const App = () => {
  const theme = useSelector((state) => state.local.theme);

  useEffect(() => {
      if (theme === 'dark') {
          document.body.setAttribute('data-theme', 'dark');
      } else {
          document.body.setAttribute('data-theme', 'light');
      }
  }, [theme]);

    return (
      <>
        <Router>
          <Nav/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/categories' element={<Categories/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/developer/:id' element={<Developer/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/favorite' element={<Favorite/>} />
            <Route path='/settings' element={<Settings/>} />

            <Route path='/auth/login' element={<Login/>} />
            <Route path='/auth/register' element={<Register/>} />
            <Route path='/auth/forgotPassword' element={<ForgotPassword/>} />
            <Route path='/auth/resetPassword' element={<ResetPassword/>} />
            <Route path='/categories' element={<Categories/>} />
          </Routes>
        </Router>
      </>
    );

}

export default App;