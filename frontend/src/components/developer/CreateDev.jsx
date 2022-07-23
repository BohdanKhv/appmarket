import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, Input, Textarea, FsModal } from '../../components';
import { plusIcon } from '../../assets/img/icons';
import { createDeveloper } from '../../features/developer/developerSlice';


const CreateDev = ({isFsmOpen, setIsFsmOpen}) => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const { isLoading, isError, msg } = useSelector(state => state.developer)


    const onSubmit = () => {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(emailReg.test(email)) {
            setErrMsg('')
            if(name) {
                dispatch(createDeveloper({ name, email, website, bio }))
            }
        } else {
            setErrMsg("Please enter correct email")
        }
    }

    return (
        <FsModal
            title={'Become a developer'}
            fsmOpen={isFsmOpen}
            setIsFsmOpen={setIsFsmOpen}
        >
            <div className="flex flex-col justify-between h-100">
                <div className="flex-grow-1">
                    <div className="fs-1 py-5 px-3">
                        Step <span className="text-primary">{step}</span> of 3
                    </div> 
                    {step === 1 && (
                        <>
                            <div className="fs-3 pb-3 px-3">
                                Developer's name
                            </div>
                            <Input
                                label="Name *"
                                value={name}
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="fs-3 pt-5 pb-3 px-3">
                                Developer's email
                            </div>
                            <Input
                                label="Email *"
                                value={email}
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="fs-3 pb-3 px-3">
                                Developer's website
                            </div>
                            <Input
                                label="Website"
                                value={website}
                                type="text"
                                placeholder="Website"
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                            <div className="fs-3 pt-5 pb-3 px-3">
                                Developer's bio
                            </div>
                            <Textarea
                                label="Bio"
                                value={bio}
                                placeholder="Bio"
                                maxLength={500}
                                onChange={(e) => setBio(e.target.value)}
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
                        color="secondary"
                    >
                        {(step === 1) ? 'Cancel' : 'Back'}
                    </Button>
                    <Button
                        icon={plusIcon}
                        color={name.length > 0 && email.length > 0 ? 'primary' : 'disabled'}
                        onClick={() => {
                            step === 1 ? setStep(step + 1) : onSubmit()
                        }}
                        loading={isLoading}
                        disabled={name.length === 0 || email.length === 0 || isLoading}
                    >
                        {(step === 3) ? 'Create' : 'Next'}
                    </Button>
                </div>
            </div>
        </FsModal>
    )
}

export default CreateDev