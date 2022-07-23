import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, FsModal, Avatar, UploadImage } from '../../components';
import { getMe, resetDeveloper, updateDeveloper } from '../../features/developer/developerSlice';
import { arrowIcon, settingsIcon } from '../../assets/img/icons';
import UpdateDev from './UpdateDev';


const DevTab = () => {
    const dispatch = useDispatch()
    const { developer } = useSelector(state => state.developer)
    const [isFsmOpen, setIsFsmOpen] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        const promise = dispatch(getMe())

        return () => {
            promise.abort()
            dispatch(resetDeveloper())
        }
    }, [dispatch])

    return (
        <>
            {developer &&
            <>
                <UploadImage
                    onImageUpdate={(image) => {
                        dispatch(updateDeveloper({ avatar: image }))
                    }}
                    folder="developer_avatar"
                    fileName={developer._id}
                    inputRef={inputRef}
                />
                <div className='py-3 border border-radius'>
                    <div className="flex justify-between px-3">
                        <h3 className="fs-2 weight-normal">
                            Basic Info
                        </h3>
                        <div>
                            <IconButton
                                icon={settingsIcon}
                                color="secondary"
                                size="md"
                                onClick={() => setIsFsmOpen(true)}
                            />
                        </div>
                    </div>
                    <p className="pt-3 px-3">
                        This info is used to help other recognize you as a developer.
                    </p>
                    <div className="pt-3">
                        <div className="flex flex-wrap justify-between align-center py-3 ms-3 pe-3 pointer bg-hover ms-3"
                            onClick={() => inputRef.current.click()}
                        >
                            <div className="fs-4 text-secondary text-uppercase">
                                Avatar
                            </div>
                            <Avatar
                                image={developer.avatar}
                                name={developer.name}
                                size="md"
                                className="ms-3"
                            />
                        </div>
                        <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                            <div className="fs-4 text-secondary text-uppercase">
                                Name
                            </div>
                            <div className="fs-3 ps-3">
                                {developer.name}
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                            <div className="fs-4 text-secondary text-uppercase">
                                Bio
                            </div>
                            <div className="fs-3 ps-3">
                                {developer.bio}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-3 border border-radius mt-3'>
                    <h3 className="fs-2 weight-normal px-3">
                        Contact info
                    </h3>
                    <div className="pt-3">
                        <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                            <div className="fs-4 text-secondary text-uppercase">
                                Email
                            </div>
                            <div className="fs-3 ps-3">
                                {developer.email}
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                            <div className="fs-4 text-secondary text-uppercase">
                                Website
                            </div>
                            <div className="fs-3 ps-3">
                                {developer.website}
                            </div>
                        </div>
                    </div>
                </div>
                <UpdateDev
                    isFsmOpen={isFsmOpen}
                    setIsFsmOpen={setIsFsmOpen}
                />
            </>
            }
        </>
    )
}

export default DevTab