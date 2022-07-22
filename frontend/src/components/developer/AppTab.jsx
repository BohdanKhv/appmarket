import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CreateApp } from '../../components';
import { plusIcon } from '../../assets/img/icons';


const AppTab = () => {
    const [isFsmOpen, setIsFsmOpen] = useState(false);
    const { apps } = useSelector(state => state.app);


    return (
        <div className="grid">
            <CreateApp />
            {apps.map((app, index) => (
                <Link
                    to={`/store/details?id=${app._id}`}
                    key={index} 
                    className="box justify-center align-center flex-col"
                >
                        {app.name}
                </Link>
            ))}
        </div>
    )
}

export default AppTab