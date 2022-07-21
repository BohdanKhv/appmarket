import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import {
  Home,
  Categories,
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