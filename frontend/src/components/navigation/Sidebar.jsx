import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { homeIcon, jobIcon, hatIcon, homeFillIcon, jobFillIcon, hatFillIcon, logoIcon } from '../../assets/img/icons'
import "./styles/Sidebar.css"


const Sidebar = () => {
  const location = useLocation()
  const activeRef = useRef(null);
  const indicatorRef = useRef(null);
  const [indicatorOffset, setIndicatorOffset] = useState(0);

  useEffect(() => {
      const activeTab = activeRef.current;
      const indicator = indicatorRef.current;
      if (indicator && activeTab) {
        const activeTabWidth = activeTab.offsetTop;
        setIndicatorOffset(activeTabWidth);
      }
  }, [location.pathname]);

  return (
    <nav className="sidebar side-bar-width">
      <div className="flex flex-col justify-between flex-grow-1">
        <div className="sidebar-top">
          <NavLink to="/about" className="logo pb-2">
            <span className="filter-shadow">
              {logoIcon}
            </span>
          </NavLink>
          <div className="sidebar-top-links">
            <NavLink to="/" className="sidebar-item" 
                ref={location.pathname === '/' ? activeRef : null}>
                {location.pathname === "/" ? homeFillIcon : homeIcon}
              <span>Home</span>
            </NavLink>
            <NavLink to="/jobs" className="sidebar-item" 
              ref={location.pathname === '/jobs' ? activeRef : null}>
              {location.pathname === "/jobs" ? jobFillIcon : jobIcon}
              <span>Popular</span>
            </NavLink>
            <NavLink to="/education" className="sidebar-item" 
              ref={location.pathname === '/education' ? activeRef : null}>
              {location.pathname === "/education" ? hatFillIcon : hatIcon}
              <span>Categories</span>
            </NavLink>
            <span className="sidebar-indicator" ref={indicatorRef}
              style={{
                  top: indicatorOffset,
              }}
            />
          </div>
        </div>
        <div className="sidebar-footer">
          <p className="text-center bold">
            © 2020
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar