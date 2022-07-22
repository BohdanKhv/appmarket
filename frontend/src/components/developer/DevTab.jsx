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
            
        </div>
        </>
    )
}

export default DevTab