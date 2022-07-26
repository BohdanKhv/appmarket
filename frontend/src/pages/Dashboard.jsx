import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Header, Tabs, DevTab, AppTab, CreateDev } from '../components'
import { dashboardTabs } from '../assets/data/tabs'

const Dashboard = () => {
  const [searchParams] = useSearchParams()
  const [ activeTab, setActiveTab ] = useState(+searchParams.get('tab') || 0)
  const { user } = useSelector(state => state.user)

  return (
    <div className="content mx-w-lg mx-auto">
        {user?.type === 'developer' ? (
          <>
            <Header label={'Dashboard'} />
            <div className="content-body">
              <Tabs
                  onChange={setActiveTab}
                  active={activeTab}
                  items={dashboardTabs}
              />
              <div className="border-top pt-4 pb-3 px-3">
                {activeTab === 0 && <AppTab/>}
                {activeTab === 1 && <DevTab/>}
              </div>
            </div>
          </>
        ) : (
          <CreateDev/>
        )}
    </div>
  )
}

export default Dashboard