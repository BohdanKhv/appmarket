import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Header, FsModal, Button, Input, Textarea, CustomSelect } from '../../components';
import { plusIcon } from '../../assets/img/icons';
import categorySelect from '../../assets/data/categorySelect.json';


const CreateApp = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [isFsmOpen, setIsFsmOpen] = useState(false)
    const [step, setStep] = useState(1)

    const [name, setName] = useState('')
    const [domain, setDomain] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [images, setImages] = useState([])
    const [video, setVideo] = useState('')
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState('')

    return (
        <>
            <div
                onClick={() => setIsFsmOpen(true)}
                className="box justify-center align-center bg-primary text-light flex-col"
            >
                <div className="icon icon-xl pb-2 fill-light">{plusIcon}</div>
                <div className="fs-2">
                    Create a new app
                </div>
            </div>
            <FsModal
                title={'Create a new app'}
                fsmOpen={isFsmOpen}
                setIsFsmOpen={setIsFsmOpen}
            >
            <div className="flex flex-col justify-between h-100">
                <div className="flex-grow-1">
                    <div className="fs-1 py-5 px-3">
                        Step <span className="text-primary">{step}</span> of 3
                    </div>
                    <div className="p-5">
                        {step === 1 && (
                            <>
                                <div className="fs-3 pb-3 px-3">
                                    App's name
                                </div>
                                <Input
                                    label="Name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={e => setName(e.target.value)}
                                />
                                <div className="fs-3 pt-5 pb-3 px-3">
                                    App's domain
                                </div>
                                <Input
                                    label="Domain"
                                    value={domain}
                                    placeholder="Domain"
                                    onChange={e => setDomain(e.target.value)}
                                />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="fs-3 pb-3 px-3">
                                    App's description
                                </div>
                                <Textarea
                                    label="Description"
                                    value={description}
                                    placeholder="Description"
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <div className="fs-3 pt-5 pb-3 px-3">
                                    App's category
                                </div>
                                <CustomSelect
                                    label="Category"
                                    value={category}
                                    placeholder="Category"
                                    isSearchable={true}
                                    isClearable={true}
                                    options={
                                        categorySelect.map(cat => ({
                                            value: cat.category,
                                            label: cat.category
                                        }))
                                    }
                                    onChange={e => setCategory(e)}
                                />
                            </>
                        )}
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
                                color={name.length > 0 && domain.length > 0 ? 'primary' : 'disabled'}
                                // onClick={() => {
                                //     step === 1 ? setStep(step + 1) : onSubmit()
                                // }}
                                // loading={isLoading}
                                // disabled={name.length === 0 || email.length === 0 || isLoading}
                            >
                                {(step === 3) ? 'Create' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </FsModal>
        </>
    )
}

export default CreateApp