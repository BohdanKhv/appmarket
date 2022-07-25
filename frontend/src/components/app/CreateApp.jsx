import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FsModal, Button, Input, IconButton, CustomSelect } from '../../components';
import { createApp } from '../../features/app/appSlice';
import { plusIcon, infoIcon } from '../../assets/img/icons';
import categorySelect from '../../assets/data/categorySelect.json';


const CreateApp = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { isLoading, isError, msg, isSuccess } = useSelector(state => state.app)

    const [openInfo, setOpenInfo] = useState(false)
    const [isFsmOpen, setIsFsmOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [errMsg, setErrMsg] = useState('')

    const [github, setGithub] = useState('')
    const [domain, setDomain] = useState('')
    const [category, setCategory] = useState('')

    const [confetti, setConfetti] = useState(false)

    const onSubmit = () => {
        setErrMsg('')
        if(domain) {
            const data = {
                domain,
                github,
                categories: category.value.includes(', ') ? category.value.split(', ') : [category.value],
            }
            dispatch(createApp(data));
        } else {
            setErrMsg("Please enter a domain")
        }
    }

    useEffect(() => {
        if(isSuccess) {
            // reset form
            setDomain('')
            setCategory('')
            setGithub('')
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
                className="p-3 bg-hover border-radius pointer"
                onClick={() => setIsFsmOpen(true)}
            >
                <div
                    className="bg-main border-radius box-shadow-sm flex align-center justify-center"
                    style={{
                        width: '100%',
                        height: '75px',
                    }}
                >
                    <div className="icon icon-xl p-2">{plusIcon}</div>
                    <div className="fs-3 text-center p-2">
                        Create a new app
                    </div>
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
                        Step <span className="text-primary">{step}</span> of 2
                    </div>
                        {step === 1 && (
                            <>
                                <div className="flex px-3 pt-5 align-center">
                                    <div className="fs-3">
                                        We only need a domain to create your app.
                                    </div>
                                    <IconButton
                                        icon={infoIcon}
                                        className="ms-2"
                                        color="secondary"
                                        onClick={() => setOpenInfo(true)}
                                    />
                                </div>
                                <Input
                                    label="Domain"
                                    required
                                    value={domain}
                                    placeholder="Domain"
                                    className="pt-3"
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
                                <div className="fs-3 px-3 pt-5">
                                    Select a category, so users can find your app.
                                </div>
                                <CustomSelect
                                    label="Category"
                                    value={category}
                                    placeholder="Category"
                                    isSearchable={true}
                                    isClearable={true}
                                    className="pt-3"
                                    options={
                                        categorySelect.map(cat => ({
                                            value: cat.category,
                                            label: cat.category
                                        }))
                                    }
                                    onChange={e => setCategory(e)}
                                />
                                <div className="fs-3 px-3 pt-5">
                                    If you have a github repository, you can enter it here.
                                </div>
                                <Input
                                    label="Github"
                                    value={github}
                                    placeholder="Github"
                                    className="pt-3"
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter') {
                                                onSubmit()
                                            }
                                        }
                                    }
                                    onChange={e => setGithub(e.target.value)}
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
                            color={domain.length > 0 ? 'primary' : 'disabled'}
                            onClick={() => {
                                step === 2 ? onSubmit() : setStep(step + 1)
                            }}
                            loading={isLoading}
                            size="lg"
                            disabled={domain.length === 0 || isLoading}
                        >
                            {(step === 2) ? 'Create' : 'Next'}
                        </Button>
                    </div>
                </div>
            </FsModal>
            {openInfo && (
                <FsModal
                    title={'We crawl the domain to get the information'}
                    fsmOpen={openInfo}
                    setIsFsmOpen={setOpenInfo}
                    scroll
                >
                    <div className="flex flex-col justify-between h-100 mx-w-md mx-auto">
                        <div>
                            <div className="fs-3">
                                Make sure you have following meta tags in your html:
                            </div>
                            <div className="fs-3 mt-3 px-4">
                                <span className="bold">General</span>
                                <ul className="mt-2">
                                    <li>title</li><li>description</li><li>image</li><li>keywords</li><li>classification</li><li>subject</li><li>category</li><li>coverage</li><li>rating</li><li>apple-touch-icon</li>
                                </ul>
                            </div>
                            <div className="fs-3 mt-3 px-4">
                                <span className="bold">Open Graph</span>
                                <ul className="mt-2">
                                    <li>og:title</li><li>og:description</li><li>og:image</li><li>og:keywords</li><li>og:classification</li><li>og:subject</li><li>og:category</li><li>og:coverage</li><li>og:rating</li>
                                </ul>
                            </div>
                            <div className="fs-3 mt-3 px-4">
                                <span className="bold">Twitter</span>
                                <ul className="mt-2 pb-5">
                                    <li>twitter:title</li><li>twitter:description</li><li>twitter:image</li><li>twitter:keywords</li><li>twitter:classification</li><li>twitter:subject</li><li>twitter:category</li><li>twitter:coverage</li><li>twitter:rating</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </FsModal>
            )}
        </>
    )
}

export default CreateApp