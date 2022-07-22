import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Header, Tabs, DevTab, AppTab, CreateDev } from '../components'
import { dashboardTabs } from '../assets/data/tabs'

const Dashboard = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [ activeTab, setActiveTab ] = useState(+searchParams.get('tab') || 0)
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    if(!user) {
      navigate('/auth/login')
    }
  }, [user, navigate])

  return (
    <div className="content">
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
                {activeTab === 0 && <DevTab/>}
                {activeTab === 1 && <AppTab/>}
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