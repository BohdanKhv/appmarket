import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../features/local/localSlice';
import { logout } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { Menu, Avatar, IconButton } from '../';
import { loginIcon, logoutIcon, registerIcon, sunIcon, moonIcon, userIcon } from '../../assets/img/icons';
import { navUser } from '../../assets/data/tabs';

const UserMenu = ({openMenu, setOpenMenu}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.local);

    return (
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
                <>
                    {navUser.map((item, index) => (
                        <Link to={item.path} className="menu-item"><span className="menu-item-icon">{item.icon}</span><span>{item.label}</span></Link>
                    ))}
                    <div onClick={() => {dispatch(logout());}} className="menu-item border-top"><span className="menu-item-icon">{logoutIcon}</span>Sign out</div>
                </>
                :
                <>
                    <Link to="/auth/login" className="menu-item"><span className="menu-item-icon">{loginIcon}</span>Login</Link>
                    <Link to="/auth/register" className="menu-item"><span className="menu-item-icon">{registerIcon}</span>Register</Link>
                </>
            }
            </Menu>
        </div>
    )
}

export default UserMenu