import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../features/local/localSlice';
import { logout } from '../../features/user/userSlice';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Avatar, IconButton, CreateDev, UpdateMeta } from '../';
import { loginIcon, logoutIcon, registerIcon, sunIcon, trashIcon, dotsIcon, developerIcon, spinnerIcon, bugIcon } from '../../assets/img/icons';
import { getMe, resetApp, deleteApp, updateAppMeta } from '../../features/app/appSlice';
import { navUser } from '../../assets/data/tabs';

const AppMenu = ({app}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const { appLoading, updateSuccess } = useSelector(state => state.app);
    const { user } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.local);
    const [isFsmOpen, setIsFsmOpen] = useState(false)

    useEffect(() => {
        if(updateSuccess) {
            setOpenMenu(false);
        }
    }, [updateSuccess]);

    return (
    <>
        <div className="pos-relative">
            <IconButton
                icon={dotsIcon}
                onClick={() => setOpenMenu(!openMenu)}
                className="ms-4 menu-btn"
                size="sm"
                color="secondary"
            />
            <Menu open={openMenu} setOpen={setOpenMenu}>
                <div className={`menu-item text-capitalize${appLoading === app.domain ? ' bg-secondary spinner' : ''}`}
                    onClick={
                    () => {
                        if(appLoading === app.domain) {
                            return;
                        } else {
                            dispatch(dispatch(updateAppMeta(app.domain)))
                        }
                    }}
                ><span className="menu-item-icon">{appLoading === app.domain ? spinnerIcon : bugIcon}</span>Update Meta</div>

                <div className={`menu-item text-capitalize${appLoading === app.domain ? ' bg-secondary spinner' : ''}`}
                    onClick={
                    () => {
                        if(appLoading === app.domain) {
                            return;
                        } else {
                            dispatch(deleteApp(app.domain))
                        }
                    }}
                ><span className="menu-item-icon">{appLoading === app.domain ? spinnerIcon : trashIcon}</span>Delete App</div>
            </Menu>
        </div>
    </>
    )
}

export default AppMenu