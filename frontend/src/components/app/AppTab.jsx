import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { trashIcon } from '../../assets/img/icons';
import { CreateApp, UpdateMeta, Skeleton, IconButton } from '../../components';
import { getMe, resetApp, deleteApp } from '../../features/app/appSlice';


const AppTab = () => {
    const dispatch = useDispatch();
    const [isFsmOpen, setIsFsmOpen] = useState(false);
    const { isLoading, apps, appLoading } = useSelector(state => state.app);
    const { user } = useSelector(state => state.user);


    useEffect(() => {
        const promise = dispatch(getMe());

        return () => {
            promise.abort();
            dispatch(resetApp());
        }
    }, []);

    return (
        <div className="grid grid-col-min-4 gap-3">
            <CreateApp />
            {apps.map((app, index) => (
                <div
                    key={index} 
                    className="box flex-col justify-between"
                    style={{
                        backgroundImage: `url(${app?.ogMeta?.image ? app?.ogMeta?.image : app?.meta?.icon})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex justify-between align-center">
                        <div className="fs-4 p-3 text-uppercase bold text-black">
                            {app?.ogMeta?.title ? app.ogMeta.title : app.meta.title ? app.meta.title : app.domain}
                        </div>
                        {user &&
                            <UpdateMeta domain={app.domain}/>
                        }
                    </div>
                    <div className="flex justify-between align-center">
                        <div className="p-2">
                            <IconButton
                                icon={trashIcon}
                                isLoading={app.domain === appLoading}
                                disabled={app.domain === appLoading}
                                size="sm"
                                color="secondary"
                                onClick={() => dispatch(deleteApp(app.domain))}
                            />
                        </div>
                        <Link
                            to={`/store/details?id=${app._id}`}
                            className="fs-4 p-3 text-end text-black"
                        >
                            {app.domain}
                        </Link>
                    </div>
                </div>
            ))}
            {isLoading &&
                Array
                    .from({ length: 7 })
                    .map((_, index) => (
                        <Skeleton key={index} height={200} animation="wave" index={index} />
                    ))
                }
            </div>
    )
}

export default AppTab