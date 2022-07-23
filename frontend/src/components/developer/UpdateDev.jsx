import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, Input, Textarea, FsModal } from '../../components';
import { updateDeveloper } from '../../features/developer/developerSlice';
import { useEffect } from 'react';


const UpdateDev = ({isFsmOpen, setIsFsmOpen}) => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)

    const { isLoading, isError, msg, developer, isSuccess } = useSelector(state => state.developer)

    const [name, setName] = useState(developer.name || '')
    const [email, setEmail] = useState(developer.email || '')
    const [website, setWebsite] = useState(developer.website || '')
    const [bio, setBio] = useState(developer.bio || '')

    const [errMsg, setErrMsg] = useState('')


    useEffect(() => {
        if(isSuccess) {
            setIsFsmOpen(false)
        }
    }, [isSuccess])


    const onSubmit = () => {
        setErrMsg('')
        if(name) {
            dispatch(updateDeveloper({ name, email, website, bio }))
        } else {
            setErrMsg("Please enter developer name")
        }
    }

    return (
        <FsModal
            title={'Update Info'}
            fsmOpen={isFsmOpen}
            setIsFsmOpen={setIsFsmOpen}
        >
            <div className="flex flex-col justify-between h-100 mx-w-md mx-auto">
                <div className="flex-grow-1">
                    <div className="fs-1 py-5 px-3">
                        Step <span className="text-primary">{step}</span> of 2
                    </div> 
                    {step === 1 && (
                        <>
                            <div className="fs-3 px-3">
                                Basic info about the developer.
                            </div>
                            <Input
                                label="Name"
                                value={name}
                                type="text"
                                required
                                placeholder="Name"
                                className="pt-5"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Textarea
                                label="Bio"
                                value={bio}
                                placeholder="Bio"
                                className="mt-5"
                                maxLength={500}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="fs-3 px-3">
                                Contact info about the developer.
                            </div>
                            <Input
                                label="Email"
                                value={email}
                                type="email"
                                placeholder="Email"
                                className="pt-5"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Website"
                                value={website}
                                type="text"
                                placeholder="Website"
                                className="pt-5"
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </>
                    )}
                    {(isError) && <p className="pt-3 text-danger">{msg}</p>}
                    {(errMsg) && <p className="pt-3 text-danger">{errMsg}</p>}
                </div>
                <div className="p-3 flex justify-end gap-3">
                    <Button
                        onClick={() => {
                            if (step === 1) {
                                setStep(1)
                                setIsFsmOpen(false)
                            } else {
                                setStep(step - 1)
                            }
                        }}
                        variant="outline"
                        size="lg"
                        color="secondary"
                    >
                        {(step === 1) ? 'Cancel' : 'Back'}
                    </Button>
                    <Button
                        color={name.length > 0 && email.length > 0 ? 'primary' : 'disabled'}
                        onClick={() => {
                            step === 1 ? setStep(step + 1) : onSubmit()
                        }}
                        loading={isLoading}
                        size="lg"
                        disabled={name.length === 0 || email.length === 0 || isLoading}
                    >
                        {(step === 2) ? 'Save' : 'Next'}
                    </Button>
                </div>
            </div>
        </FsModal>
    )
}

export default UpdateDev