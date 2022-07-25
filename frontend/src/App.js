import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, AuthGate } from './components';
import {
  Home,
  Developer,
  Profile,

  Dashboard,
  DetailedApp,
  Category,

  Favorite,

  Login,
  Register,
  ResetPassword,
  ForgotPassword,
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

            <Route path='/user/developer' element={<AuthGate><Dashboard/></AuthGate>} />
            <Route path='/user/profile' element={<AuthGate><Profile/></AuthGate>} />

            <Route path='/store/dev' element={<Developer/>} />
            <Route path='/store/details' element={<DetailedApp/>} />
            <Route path='/store/category' element={<Category/>} />

            <Route path='/library/favorite' element={<Favorite/>} />

            <Route path='/auth/login' element={<Login/>} />
            <Route path='/auth/register' element={<Register/>} />
            <Route path='/auth/forgotPassword' element={<ForgotPassword/>} />
            <Route path='/auth/resetPassword' element={<ResetPassword/>} />
          </Routes>
        </Router>
      </>
    );

}

export default App;