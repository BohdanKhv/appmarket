import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components';
import {
  Home,
  Jobs,
  Educations
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
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/jobs' element={<Jobs/>} />
            <Route path='/educations' element={<Educations/>} />
          </Routes>
        </Router>
      </>
    );

}

export default App;