import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { arrowUpIcon, starFillIcon, trashIcon } from '../../assets/img/icons';
import { IconButton, UpdateMeta, Skeleton, Image, AppMenu } from '../';
import { getMe, resetApp, deleteApp } from '../../features/app/appSlice';

const AppItem = ({ app, showMenu }) => {
    const dispatch = useDispatch();
    const { isLoading, apps, appLoading } = useSelector(state => state.app);
    const { user } = useSelector(state => state.user);


    return (
        <div className="flex bg-hover p-3 border-radius pointer flex-grow-1">
            <Link to={`/store/details?id=${app._id}`}
                style={{
                    width: '150px',
                    height: '75px',
                    minWidth: '150px',
                }}
                className="me-3 overflow-hidden border-radius box-shadow-sm"
            >
                <img
                    src={app?.ogMeta?.image ? app?.ogMeta?.image : app?.meta?.icon}
                    alt={app?.ogMeta?.title ? app.ogMeta.title : app.meta.title ? app.meta.title : app.domain.split('.')[0]}
                    className="obj-cover z-1"
                    width={150}
                    height={75}
                />
            </Link>
            <div className="flex flex-col flex-grow-1 justify-between flex-grow">
                <div className="fs-4">
                    {app?.ogMeta?.title ? app.ogMeta.title : app.meta.title ? app.meta.title : app.domain}
                </div>
                <div className="fs-4 mt-1 text-secondary">
                    {app.domain}
                </div>
                <div className="fs-4 mt-1 text-secondary flex align-center">
                    {app.upVotes} <div className="icon icon-sm ms-1">{starFillIcon}</div>
                </div>
            </div>
            {showMenu &&
                <AppMenu app={app} />
            }
        </div>
    )
}

export default AppItem