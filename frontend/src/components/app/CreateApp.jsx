import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Header, FsModal, Button } from '../../components';
import { plusIcon } from '../../assets/img/icons';


const CreateApp = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [isFsmOpen, setIsFsmOpen] = useState(false)

    return (
        <div className="mx-w-md mx-auto">
            <Header label="Become a developer" secondary="Create free publisher page and start publishing your apps." />
            <div className="">
                <div className="flex justify-center p-3">

                    <Button
                        onClick={() => setIsFsmOpen(true)}
                        className="box justify-center align-center bg-primary text-light flex-col"
                    >
                        <div className="icon icon-xl pb-2 fill-light">{plusIcon}</div>
                        <div className="fs-2">
                            Become a developer
                        </div>
                    </Button>
                </div>
            </div>
            <FsModal
                title={'Create a publisher page'}
                fsmOpen={isFsmOpen}
                setIsFsmOpen={setIsFsmOpen}
            />
        </div>
    )
}

export default CreateApp