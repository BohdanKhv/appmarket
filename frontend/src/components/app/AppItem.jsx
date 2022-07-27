import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { arrowUpIcon, commentIcon, likeFillIcon, upVoteIcon, trashIcon } from '../../assets/img/icons';
import { IconButton, UpdateMeta, Skeleton, Image, AppMenu } from '../';
import { getMe, resetApp, deleteApp } from '../../features/app/appSlice';

const AppItem = ({ app, showMenu }) => {
    const dispatch = useDispatch();
    const { isLoading, apps, appLoading } = useSelector(state => state.app);
    const { user } = useSelector(state => state.user);


    return (
        <div className="bg-hover p-3 border-radius pointer">
            <div className="flex justify-between">
                <Link to={`/store/details?domain=${app.domain}`}
                    style={{
                        width: '150px',
                        height: '75px',
                        minWidth: '150px',
                    }}
                    className="me-3 overflow-hidden border-radius box-shadow-sm"
                >
                    <img
                        src={app?.ogMeta?.image ? app?.ogMeta?.image.startsWith('http') ? app?.ogMeta?.image : `http://${app.domain}/${app?.ogMeta?.image}` : app?.meta?.icon}
                        alt={app?.ogMeta?.title ? app.ogMeta.title : app.meta.title ? app.meta.title : app.domain.split('.')[0]}
                        className="obj-cover z-1"
                        width={150}
                        height={75}
                    />
                </Link>
                <div className="flex flex-col flex-grow-1 justify-between flex-grow">
                    <div className="fs-4 text-capitalize">
                        {app?.ogMeta?.title?.length >= app.domain.length ? app.domain.split('.')[0] : app?.ogMeta?.title ? app.ogMeta.title : app.meta.title ? app.meta.title : app.domain}
                    </div>
                    <div className="fs-5 text-secondary">
                        {app.domain}
                    </div>
                    <div className="flex gap-3 fs-5 mt-2">
                        <div className=" flex flex-col text-secondary align-center">
                            <div>
                                {app.upVotes} <div className="icon icon-xs ms-2">{upVoteIcon}</div>
                            </div>
                            <div>
                                Up votes
                            </div>
                        </div>
                        <div className=" flex flex-col text-secondary align-center">
                            <div>
                                {app.favorites} <div className="icon icon-xs ms-2">{likeFillIcon}</div>
                            </div>
                            <div>
                                Favorites
                            </div>
                        </div>
                        <div className=" flex flex-col text-secondary align-center">
                            <div>
                                {app.comments} <div className="icon icon-xs ms-2">{commentIcon}</div>
                            </div>
                            <div>
                                Comments
                            </div>
                        </div>
                    </div>
                </div>
            {showMenu &&
                <AppMenu app={app} />
            }
            </div>
        </div>
    )
}

export default AppItem