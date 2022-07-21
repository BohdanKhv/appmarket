import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Input, Avatar } from '../'
import { homeIcon, homeFillIcon, logoIcon, searchIcon, institutionIcon, institutionFillIcon, dataFillIcon, dataIcon, gameIcon, gameFillIcon } from '../../assets/img/icons'
import "./styles/Nav.css"


const Nav = () => {
  const location = useLocation()
  const activeRef = useRef(null);
  const indicatorRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
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
  }, [location.pathname]);

  return (
    <>
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className="logo">
          <span className="filter-shadow">
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
          <span className="nav-indicator" ref={indicatorRef}
            style={{
              left: indicatorLeft,
            }}
          />
        </div>
      </div>
        <div className="nav-right">
          <div className="me-2">
            <Input
              placeholder="Search"
              type="text"
              name="search"
              label="Search"
              icon={searchIcon}
            />
          </div>
          <Avatar
            src=''
            name="John Doe"
            size="md"
          />
        </div>
    </nav>
    {windowWidth <= 768 && 
      <header className="nav-mobile">
        <div className="logo">
          {logoIcon}
        </div>
        <div className="mx-5 flex-grow-1">
          <Input
            placeholder="Search"
            type="text"
            name="search"
            label="Search"
            icon={searchIcon}
            variant="outline"
            size="sm"
          />
        </div>
        <Avatar
          src=''
          name="John Doe"
          size="sm"
        />
      </header>
    }
    </>
  )
}

export default Nav