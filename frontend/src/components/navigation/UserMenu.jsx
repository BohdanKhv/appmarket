import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../features/local/localSlice';
import { logout } from '../../features/user/userSlice';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Avatar, IconButton, CreateDev } from '../';
import { loginIcon, logoutIcon, registerIcon, sunIcon, moonIcon, userIcon, developerIcon } from '../../assets/img/icons';
import { navUser } from '../../assets/data/tabs';

const UserMenu = ({openMenu, setOpenMenu}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.local);
    const [isFsmOpen, setIsFsmOpen] = useState(false)

    useEffect(() => {
        setOpenMenu(false)
    }, [location.pathname]);

    return (
    <>
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
                {user &&
                <>
                    <div className="flex justify-between menu-item align-center border-bottom">
                        <span
                            className="menu-item-icon"
                        >
                            <Avatar
                                name={user.fullName}
                                image={user.avatar ? user.avatar : null}
                                size="sm"
                                width={24}
                                height={24}
                                fontSize={12}
                            />
                        </span>
                        <span>
                            {user.fullName}
                        </span>
                    </div>
                    {navUser.map((item, index) => (
                        item.path === "/user/developer" && user.type === "user" ? (
                            <div key={index} className="menu-item" onClick={() => setIsFsmOpen(true)}><span className="menu-item-icon">{developerIcon}</span><span>Become a developer</span></div>
                        ) : (
                            <Link key={`user-menu-${index}`} to={item.path} className="menu-item"><span className="menu-item-icon">{item.icon}</span><span>{item.label}</span></Link>
                        ) 
                    ))}
                </>
                }
                    <div className="menu-item border-top text-capitalize" onClick={() => {dispatch(setTheme(theme === "light" ? 'dark' : 'light'))}}><span className="menu-item-icon">{theme === "light" ? sunIcon : moonIcon}</span>Theme {theme}</div>
                {user ?
                    <div onClick={() => {dispatch(logout());}} className="menu-item border-top"><span className="menu-item-icon">{logoutIcon}</span>Sign out</div>
                :
                <>
                    <Link to="/auth/login" className="menu-item"><span className="menu-item-icon">{loginIcon}</span>Login</Link>
                    <Link to="/auth/register" className="menu-item"><span className="menu-item-icon">{registerIcon}</span>Register</Link>
                </>
                }
            </Menu>
        </div>
        {user && user.type === "user" &&
            <CreateDev isFsmOpen={isFsmOpen} setIsFsmOpen={setIsFsmOpen} />
        }
    </>
    )
}

export default UserMenu