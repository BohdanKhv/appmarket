import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import {
  Home,
  Categories,
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
            <Route path='/Categories' element={<Categories/>} />
          </Routes>
        </Router>
      </>
    );

}

export default App;