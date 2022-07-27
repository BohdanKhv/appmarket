import React from 'react'
import { useSelector } from 'react-redux'
import { AppInfo, Reviews } from '../components'

const DetailedApp = () => {
  const { detailedApp } = useSelector(state => state.app)

  return (
    <div className="content mx-w-lg mx-auto">
      <AppInfo />
      {detailedApp &&
        <div className="flex">
          <Reviews />
        </div>
      }
    </div>
  )
}

export default DetailedApp