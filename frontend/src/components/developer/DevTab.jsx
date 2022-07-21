import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, FsModal } from '../../components';
import { plusIcon } from '../../assets/img/icons';


const DevTab = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [isFsmOpen, setIsFsmOpen] = useState(false)

    return (
        <>
        <div className="flex justify-center">
            <div
                onClick={() => setIsFsmOpen(true)}
                className="box justify-center align-center bg-main flex-col"
            >
                <div className="icon icon-xl pb-2">{plusIcon}</div>
                <div>
                    Become a developer
                </div>
            </div>
        </div>
        <FsModal
            title={'Create developer page'}
            fsmOpen={isFsmOpen}
            setIsFsmOpen={setIsFsmOpen}
        />
        </>
    )
}

export default DevTab