import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Header, Tabs, DevTab, AppTab } from '../components'
import { dashboardTabs } from '../assets/data/tabs'

const Dashboard = () => {
  const [searchParams] = useSearchParams()
  const [ activeTab, setActiveTab ] = useState(+searchParams.get('tab') || 0)

  return (
    <div className="content">
      <Header label={'Dashboard'} />
        <div className="content-body">
        <Tabs
            onChange={setActiveTab}
            active={activeTab}
            items={dashboardTabs}
        />
        <div className="border-top pt-4 pb-3 px-3">
          {activeTab === 0 && <DevTab/>}
          {activeTab === 1 && <AppTab/>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard