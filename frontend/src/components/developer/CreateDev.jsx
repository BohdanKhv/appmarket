import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Header, Button, Input, Textarea } from '../../components';
import { plusIcon } from '../../assets/img/icons';
import { createDeveloper } from '../../features/developer/developerSlice';


const CreateDev = () => {
    const dispatch = useDispatch()
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
        <div className="mx-w-sm mx-auto">
            <div className="bg-primary-gradient pos-absolute left-0 z-0 filter-shadow" 
            style={{height: "500px", width: "100vw", transform: 'skewY(-5deg)', top: '-15vh'}}/>
            <Header label="Become a developer" secondary="Create a free developer page and start publishing your apps." />
            <div className="content-body mx-auto pos-relative">
                <div className="fs-4 border-bottom pb-3 mb-3 px-3">
                    Fill out the form below to create your developer page.
                </div>
                <div className="px-3">
                    <div className="flex justify-between gap-1 flex-grow-1 flex-sm-wrap">
                        <Input
                            label="Name *"
                            value={name}
                            type="text"
                            placeholder="Name"
                            className="w-100 pt-3"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Email *"
                            value={email}
                            type="email"
                            placeholder="Email"
                            className="w-100 pt-3"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="pt-3">
                        <Input
                            label="Website"
                            value={website}
                            type="text"
                            placeholder="Website"
                            className="w-100"
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className="pt-3">
                        <Textarea
                            label="Bio"
                            value={bio}
                            placeholder="Bio"
                            className="w-100"
                            maxLength={500}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className="pt-3">
                        <Button
                            icon={plusIcon}
                            color={name.length > 0 && email.length > 0 ? 'primary' : 'disabled'}
                            className="w-100"
                            onClick={onSubmit}
                            loading={isLoading}
                            disabled={name.length === 0 || email.length === 0 || isLoading}
                        >
                            Create
                        </Button>
                    </div>
                    {(isError) && <p className="pt-3 text-danger">{msg}</p>}
                    {(errMsg) && <p className="pt-3 text-danger">{errMsg}</p>}
                </div>
            </div>
        </div>
    )
}

export default CreateDev