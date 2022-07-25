import { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FsModal, Avatar, UploadImage, IconButton, Input, Textarea, Button } from "../"
import { settingsIcon } from "../../assets/img/icons"
import { updateUser } from "../../features/user/userSlice"


const ProfileInfo = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const { user, isLoading, isError, msg, isSuccess } = useSelector(state => state.user)
    const [errMsg, setErrMsg] = useState('')
    const [isFsmOpen, setIsFsmOpen] = useState(false)

    const [fullName, setFullName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)


    const onSubmit = () => {
        if (!fullName) {
            setErrMsg('Please fill all fields')
            return
        }
        const data = {
            fullName,
            email,
            bio
        }
        dispatch(updateUser(data))
    }

    useEffect(() => {
        if (isSuccess) {
            setIsFsmOpen(false)
        }
    }, [isSuccess])


    return (
    <>
    <UploadImage
        onImageUpdate={(image) => {
            dispatch(updateUser({ avatar: image }))
        }}
        folder="user_avatar"
        fileName={user._id}
        inputRef={inputRef}
    />
    <div className='py-3 box-shadow border-radius'>
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
            This is your basic information.
        </p>
        <div className="pt-3">
            <div className="flex flex-wrap justify-between align-center py-3 ms-3 pe-3 pointer bg-hover ms-3"
                onClick={() => inputRef.current.click()}
            >
                <div className="fs-4 text-secondary text-uppercase">
                    Avatar
                </div>
                <Avatar
                    image={user.avatar}
                    name={user.fullName}
                    size="md"
                    className="ms-3"
                />
            </div>
            <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                <div className="fs-4 text-secondary text-uppercase">
                    Full Name
                </div>
                <div className="fs-3 ps-3">
                    {user.fullName}
                </div>
            </div>
            <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                <div className="fs-4 text-secondary text-uppercase">
                    Email
                </div>
                <div className="fs-3 ps-3">
                    {user.email}
                </div>
            </div>
            <div className="flex flex-wrap justify-between align-center py-3 border-top pointer bg-hover ms-3 pe-3">
                <div className="fs-4 text-secondary text-uppercase">
                    Bio
                </div>
                <div className="fs-3 ps-3">
                    {user.bio || 'No bio'}
                </div>
            </div>
        </div>
    </div>
    <FsModal
        title={'Update Info'}
        fsmOpen={isFsmOpen}
        setIsFsmOpen={setIsFsmOpen}
    >
        <div className="flex flex-col justify-between h-100 mx-w-md mx-auto">
            <div className="flex-grow-1">
                <div className="fs-2 py-5 px-3">
                    Basic info about <span className="text-primary">{user.fullName}</span>
                </div> 
                <Input
                    label="Full Name"
                    value={fullName}
                    type="text"
                    required
                    placeholder="Full Name"
                    onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                    label="Email"
                    value={email}
                    type="email"
                    placeholder="Email"
                    className="pt-5"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                    label="Bio"
                    value={bio}
                    placeholder="Bio"
                    className="mt-5"
                    maxLength={500}
                    onChange={(e) => setBio(e.target.value)}
                />
                {(isError) && <p className="pt-3 text-danger">{msg}</p>}
                {(errMsg) && <p className="pt-3 text-danger">{errMsg}</p>}
            </div>
            <div className="p-3 flex justify-end gap-3">
                <Button
                    onClick={() => setIsFsmOpen(false)}
                    variant="outline"
                    size="lg"
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    color={fullName.length > 0 && email.length > 0 ? 'primary' : 'disabled'}
                    onClick={onSubmit}
                    loading={isLoading}
                    size="lg"
                    disabled={fullName.length === 0 || email.length === 0 || isLoading}
                >
                    Save
                </Button>
            </div>
        </div>
    </FsModal>
    </>
    )
}

export default ProfileInfo