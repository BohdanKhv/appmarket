import { useDispatch, useSelector } from 'react-redux';
import { updateAppMeta } from '../../features/app/appSlice';
import { IconButton } from '../';
import { bugIcon } from '../../assets/img/icons';


const UpdateMeta = ({domain}) => {
    const dispatch = useDispatch();
    const { appLoading } = useSelector(state => state.app);

    return (
        <div className="p-2">
            <IconButton
                icon={bugIcon}
                title="Update Meta"
                disabled={domain === appLoading}
                isLoading={domain === appLoading}
                color="secondary"
                size="sm"
                onClick={() => dispatch(updateAppMeta(domain))}
            />
        </div>
    )
}

export default UpdateMeta