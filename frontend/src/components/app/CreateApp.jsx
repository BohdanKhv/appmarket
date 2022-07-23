import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Header, FsModal, Button, Input, Textarea, CustomSelect } from '../../components';
import { createApp } from '../../features/app/appSlice';
import { plusIcon } from '../../assets/img/icons';
import categorySelect from '../../assets/data/categorySelect.json';


const CreateApp = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { isLoading, isError, msg, isSuccess } = useSelector(state => state.app)

    const [isFsmOpen, setIsFsmOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [errMsg, setErrMsg] = useState('')

    const [name, setName] = useState('')
    const [domain, setDomain] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([])
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [tags, setTags] = useState([])

    const [confetti, setConfetti] = useState(false)

    const onSubmit = () => {
        setErrMsg('')
        if(name && domain) {
            const data = {
                name,
                domain,
                description,
                categories: category.value.includes(', ') ? category.value.split(', ') : [category.value],
                images,
                video,
                thumbnail,
                tags
            }
            dispatch(createApp(data));
        } else {
            setErrMsg("Please enter all required fields")
        }
    }

    useEffect(() => {
        if(isSuccess) {
            // reset form
            setName('')
            setDomain('')
            setDescription('')
            setCategory('')
            setImages([])
            setVideo('')
            setThumbnail('')
            setTags([])
            setStep(1)

            setIsFsmOpen(false)
            setConfetti(true)

            setTimeout(() => {
                setConfetti(false)
            } , 5000)
        }
    } , [isSuccess])

    return (
        <>
            {confetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={1000}
                    recycle={false}
                />
            )}
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
            <div className="flex flex-col justify-between h-100 mx-w-md mx-auto">
                <div className="flex-grow-1">
                    <div className="fs-1 py-5 px-3">
                        Step <span className="text-primary">{step}</span> of 3
                    </div>
                        {step === 1 && (
                            <>
                                <div className="fs-3 px-3">
                                    Let's start with the basic information of your app
                                </div>
                                <Input
                                    label="Name"
                                    required
                                    value={name}
                                    placeholder="Name"
                                    className="pt-5"
                                    onChange={e => setName(e.target.value)}
                                />
                                <Input
                                    label="Domain"
                                    required
                                    value={domain}
                                    placeholder="Domain"
                                    className="pt-5"
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter') {
                                            setStep(2)
                                            }
                                        }
                                    }
                                    onChange={e => setDomain(e.target.value)}
                                />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="fs-3 px-3">
                                    Describe your app in a few words to help others find it
                                </div>
                                <Textarea
                                    label="Description"
                                    value={description}
                                    placeholder="Description"
                                    className="mt-5"
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <CustomSelect
                                    label="Category"
                                    value={category}
                                    placeholder="Category"
                                    isSearchable={true}
                                    isClearable={true}
                                    className="pt-5"
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
                        {step === 3 && (
                            <>
                                <div className="fs-3 px-3">
                                    Add images & video to your app
                                </div>
                                <Input
                                    label="YouTube Video URL"
                                    value={video}
                                    placeholder="YouTube Video URL"
                                    className="pt-5"
                                    onChange={e => setVideo(e.target.value)}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter') {
                                                onSubmit()
                                            }
                                        }
                                    }
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
                            icon={plusIcon}
                            color={name.length > 0 && domain.length > 0 ? 'primary' : 'disabled'}
                            onClick={() => {
                                step === 3 ? onSubmit() : setStep(step + 1)
                            }}
                            loading={isLoading}
                            size="lg"
                            disabled={name.length === 0 || domain.length === 0 || isLoading}
                        >
                            {(step === 3) ? 'Create' : 'Next'}
                        </Button>
                    </div>
                </div>
            </FsModal>
        </>
    )
}

export default CreateApp