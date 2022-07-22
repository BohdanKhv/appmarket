import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Header, FsModal, Button, Input, Textarea } from '../../components';
import { plusIcon } from '../../assets/img/icons';


const CreateDev = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')


    const onSubmit = () => {
    
    }

    return (
        <div className="mx-w-sm mx-auto">
            <Header label="Become a developer" secondary="Create a free developer page and start publishing your apps." />
            <div className="content-body mx-auto">
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
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateDev