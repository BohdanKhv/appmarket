import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { setTheme } from '../../features/local/localSlice';
import { logout } from '../../features/user/userSlice';
import { Input, Avatar, Menu, IconButton } from '../'
import { homeIcon, homeFillIcon, logoIcon, searchIcon, institutionIcon, institutionFillIcon, dataFillIcon, dataIcon, gameIcon, gameFillIcon, loginIcon, registerIcon, sunIcon, moonIcon, logoutIcon, userIcon } from '../../assets/img/icons'
import "./styles/Nav.css"


const Nav = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const activeRef = useRef(null);
  const indicatorRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const { theme } = useSelector(state => state.local);
  const { user } = useSelector(state => state.user);


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
  }, [location.pathname, windowWidth]);

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
          <Input
            placeholder="Search"
            type="text"
            name="search"
            label="Search"
            icon={searchIcon}
          />
        </div>
        <div className="pos-relative">
          {user ? (
            <Avatar
              name={user.fullName}
              image={user.avatar ? user.avatar : null}
              size="md"
              className="menu-btn"
              onClick={() => setOpenMenu(!openMenu)}
            />
          ) : (
            <IconButton className="menu-btn" color="secondary" onClick={() => setOpenMenu(!openMenu)} icon={userIcon} />
          )}
          <Menu open={openMenu} setOpen={setOpenMenu}>
            <div className="menu-item border-bottom" onClick={() => {dispatch(setTheme(theme === "light" ? 'dark' : 'light'))}}><span className="menu-item-icon">{theme === "light" ? sunIcon : moonIcon}</span>Theme</div>
            {user ?
              <div onClick={() => dispatch(logout())} className="menu-item"><span className="menu-item-icon">{logoutIcon}</span>Log out</div>
            :
              <>
                <Link to="/auth/login" className="menu-item"><span className="menu-item-icon">{loginIcon}</span>Login</Link>
                <Link to="/auth/register" className="menu-item"><span className="menu-item-icon">{registerIcon}</span>Register</Link>
              </>
            }
            </Menu>
        </div>
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
        <div className="pos-relative">
          {user ? (
            <Avatar
              name={user.fullName}
              image={user.avatar ? user.avatar : null}
              size="sm"
              className="menu-btn"
              onClick={() => setOpenMenu(!openMenu)}
            />
          ) : (
            <IconButton className="menu-btn" color="secondary" onClick={() => setOpenMenu(!openMenu)} icon={userIcon} />
          )}
          <Menu open={openMenu} setOpen={setOpenMenu}>
            <div className="menu-item border-bottom" onClick={() => {dispatch(setTheme(theme === "light" ? 'dark' : 'light'))}}><span className="menu-item-icon">{theme === "light" ? sunIcon : moonIcon}</span>Theme</div>
            {user ?
              <div onClick={() => dispatch(logout())} className="menu-item"><span className="menu-item-icon">{logoutIcon}</span>Log out</div>
            :
              <>
                <Link to="/auth/login" className="menu-item"><span className="menu-item-icon">{loginIcon}</span>Login</Link>
                <Link to="/auth/register" className="menu-item"><span className="menu-item-icon">{registerIcon}</span>Register</Link>
              </>
            }
            </Menu>
        </div>
      </header>
    }
    </>
  )
}

export default Nav