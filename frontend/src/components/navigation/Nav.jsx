import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserMenu, Search } from '../'
import { logoIcon } from '../../assets/img/icons'
import { navMenu } from '../../assets/data/tabs'
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
          {navMenu.slice(0, windowWidth > 768 ? 5 : 4).map((item, index) => (
            <NavLink 
              to={item.path}
              className="nav-item" 
              key={`nav-item-${index}`}
              ref={location.pathname === item.path ? activeRef : null}
            >
              {location.pathname === item.path ? item.fillIcon : item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
          { (navMenu.map(a => a.path).includes(location.pathname)) &&
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