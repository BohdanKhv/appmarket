import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Input, Avatar } from '../'
import { homeIcon, jobIcon, hatIcon, homeFillIcon, jobFillIcon, hatFillIcon, logoIcon, searchIcon } from '../../assets/img/icons'
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
          <NavLink to="/jobs" className="nav-item" 
            ref={location.pathname === '/jobs' ? activeRef : null}>
            {location.pathname === "/jobs" ? jobFillIcon : jobIcon}
            <span>Popular</span>
          </NavLink>
          <NavLink to="/education" className="nav-item" 
            ref={location.pathname === '/education' ? activeRef : null}>
            {location.pathname === "/education" ? hatFillIcon : hatIcon}
            <span>Categories</span>
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