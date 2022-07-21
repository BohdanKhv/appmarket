import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs } from '../components'
import { arrowIcon, gridIcon, homeIcon } from '../assets/img/icons'


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `Pathify - Home`
    }, [])

    return (
        <>
            <div className="content">
                <div className="flex-grow-1 mb-3">
                    <div className="pb-3">
                        <div
                            className="fs-2 py-3"
                        >
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home