import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from 'react-router-dom'
import { Header, Tabs } from "../components"
import { dashboardTabs } from "../assets/data/tabs"


const Categories = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') ? parseInt(searchParams.get('tab')) : 0);

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `Pathify | Categories`
    }, [])

    useEffect(() => {
        document.title = `Pathify | Categories - ${dashboardTabs[activeTab].label}`
    }, [activeTab])


    return (
        <main className="content">
            <div className="flex-grow-1 mb-3 mx-w-lg mx-auto">
                <Header label="Apps" />
                <div className="content-body">
                    <Tabs
                        onChange={setActiveTab}
                        active={activeTab}
                        items={dashboardTabs}
                    />
                    <div className="results-container border-top pt-3">
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Categories