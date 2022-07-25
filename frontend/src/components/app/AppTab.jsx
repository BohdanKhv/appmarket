import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { trashIcon } from '../../assets/img/icons';
import { CreateApp, UpdateMeta, Skeleton, AppItem, Image } from '../';
import { getMe, resetApp, deleteApp } from '../../features/app/appSlice';


const AppTab = () => {
    const dispatch = useDispatch();
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
        <div>
            <CreateApp />
            <div className="flex flex-wrap gap-3 mt-3">
                {apps.map((app, index) => (
                    <AppItem key={index} app={app} showMenu />
                ))}
            </div>
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