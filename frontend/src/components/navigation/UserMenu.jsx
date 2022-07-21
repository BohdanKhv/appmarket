import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../features/local/localSlice';
import { logout } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { Menu, Avatar, IconButton } from '../';
import { loginIcon, logoutIcon, registerIcon, sunIcon, moonIcon, userIcon, settingsIcon, appIcon, likeIcon } from '../../assets/img/icons';

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
                    <Link to="/profile" className="menu-item"><span className="menu-item-icon">{userIcon}</span><span>Profile</span></Link>
                    <Link to="/developer" className="menu-item"><span className="menu-item-icon">{appIcon}</span><span>Developer</span></Link>
                    <Link to="/favorite" className="menu-item"><span className="menu-item-icon">{likeIcon}</span><span>Favorite</span></Link>
                    <Link to="/setting" className="menu-item"><span className="menu-item-icon">{settingsIcon}</span><span>Settings</span></Link>
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