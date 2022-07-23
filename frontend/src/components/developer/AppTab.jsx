import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CreateApp } from '../../components';
import { getMe, resetApp } from '../../features/app/appSlice';
import { plusIcon } from '../../assets/img/icons';


const AppTab = () => {
    const dispatch = useDispatch();
    const [isFsmOpen, setIsFsmOpen] = useState(false);
    const { isLoading, apps } = useSelector(state => state.app);


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
                <Link
                    to={`/store/details?id=${app._id}`}
                    key={index} 
                    className="box flex-col justify-between"
                    style={{
                        backgroundImage: `url(${app?.ogMeta?.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="fs-4 p-3 text-uppercase bold text-black">
                        {app.ogMeta.title ? app.ogMeta.title : app.meta.title ? app.meta.title : app.domain}
                    </div>
                    <div className="fs-4 p-3 text-end text-black">
                        {app.domain}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default AppTab