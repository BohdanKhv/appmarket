import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserMenu, Search } from '../'
import { homeIcon, homeFillIcon, logoIcon, institutionIcon, institutionFillIcon, dataFillIcon, dataIcon, gameIcon, gameFillIcon } from '../../assets/img/icons'
import "./styles/Nav.css"


const Nav = () => {
  const location = useLocation();
  const activeRef = useRef(null);
  const indicatorRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);


  useEffect(() => {
    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    }, false);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          if(windowWidth > 768) {
            document.querySelector('.nav').classList.remove('border-bottom');
            document.querySelector('.nav').classList.add('box-shadow');
          } else {
            document.querySelector('.nav-mobile').classList.remove('border-bottom');
            document.querySelector('.nav-mobile').classList.add('box-shadow');
          }
        } else {
          if(windowWidth > 768) {
            document.querySelector('.nav').classList.add('border-bottom');
            document.querySelector('.nav').classList.remove('box-shadow');
          } else {
            document.querySelector('.nav-mobile').classList.add('border-bottom');
            document.querySelector('.nav-mobile').classList.remove('box-shadow');
          }
        }
    }, false);

    return () => {
        window.removeEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        }, false);
    }
  }, []);

  useEffect(() => {
      const activeTab = activeRef.current;
      const indicator = indicatorRef.current;
      if (indicator && activeTab) {
          const activeTabLeft = activeTab.offsetLeft;
          setIndicatorLeft(activeTabLeft);
      }
  }, [location.pathname, windowWidth]);

  return (
    <>
    <nav className="nav border-bottom">
      <div className="nav-left">
        <NavLink to="/" className="logo">
          <span>
            {logoIcon}
          </span>
        </NavLink>
        <div className="nav-left-links">
          <NavLink to="/" className="nav-item" 
              ref={location.pathname === '/' ? activeRef : null}>
              {location.pathname === "/" ? homeFillIcon : homeIcon}
            <span>Home</span>
          </NavLink>
          <NavLink to="/categories" className="nav-item" 
            ref={location.pathname === '/categories' ? activeRef : null}>
            {location.pathname === "/categories" ? dataFillIcon : dataIcon}
            <span>Categories</span>
          </NavLink>
          <NavLink to="/categories/games" className="nav-item" 
            ref={location.pathname === '/categories/games' ? activeRef : null}>
            {location.pathname === "/categories/games" ? gameFillIcon : gameIcon}
            <span>Games</span>
          </NavLink>
          <NavLink to="/categories/finance" className="nav-item" 
            ref={location.pathname === '/categories/finance' ? activeRef : null}>
            {location.pathname === "/categories/finance" ? institutionFillIcon : institutionIcon}
            <span>Finance</span>
          </NavLink>
          { (location.pathname === "/categories/finance" ||
            location.pathname === "/categories/games" ||
            location.pathname === "/categories" ||
            location.pathname === "/") &&
            <span className="nav-indicator" ref={indicatorRef}
              style={{
                left: indicatorLeft,
              }}
            />
          }
        </div>
      </div>
      <div className="nav-right">
        <div className="me-2">
          <Search />
        </div>
        <UserMenu
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      </div>
    </nav>
    {windowWidth <= 768 && 
      <header className="nav-mobile border-bottom">
        <div className="logo">
          {logoIcon}
        </div>
        <div className="mx-3 flex-grow-1">
          <Search mobile={true} />
        </div>
        <UserMenu
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      </header>
    }
    </>
  )
}

export default Nav