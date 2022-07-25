import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams, Link } from "react-router-dom"
import { getApp, resetApp, rateApp, deleteRating } from "../../features/app/appSlice"
import { likeIcon, arrowUpIcon, downVoteIcon, commentIcon, upVoteIcon } from "../../assets/img/icons"
import { Button, IconButton, Skeleton, Image } from '../'


const AppInfo = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { detailedApp, isError, msg, appLoading} = useSelector(state => state.app)


  useEffect(() => {
    const promise = dispatch(getApp(searchParams.get("domain")))

    return () => {
      promise.abort()
      dispatch(resetApp())
    }
  }, [searchParams])


  return (
    <div>
      <div className="mt-5">
        {!appLoading && detailedApp ? (
          <div className="flex flex-sm-wrap justify-between gap-4">
            <div className="flex flex-col text-capitalize justify-between">
              <h1 className="fs-1">
                {detailedApp?.meta?.title || detailedApp.domain.split('.')[0]}
              </h1>
              <Link to={`/store/dev?id=${detailedApp.developer._id}`} className="fs-3 text-primary bold my-4">
                {detailedApp.developer.name}
              </Link>
              <div className="flex gap-3 align-center">
                <div 
                  className={`flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp.userRating === '1' ? ' bg-secondary' : '' }`}
                  onClick={() => {
                    if(detailedApp.userRating === '1') {
                      dispatch(deleteRating(detailedApp._id))
                    } else if (detailedApp.userRating === '-1' || detailedApp.userRating === '0') {
                      dispatch(rateApp({
                        domain: detailedApp.domain,
                        rating: '1'
                      }))
                    }
                  }}
                >
                  <div className="fs-5 flex align-center justify-center bold">
                    {detailedApp.upVotes}<span className="icon icon-xs ms-1">{upVoteIcon}</span>
                  </div>
                  <div className="fs-5 text-secondary">
                    Up Votes
                  </div>
                </div>
                <div 
                  className={`flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp.userRating === '-1' ? ' bg-secondary' : '' }`}
                  onClick={() => {
                    if(detailedApp.userRating === '-1') {
                      dispatch(deleteRating(detailedApp._id))
                    } else if (detailedApp.userRating === '1' || detailedApp.userRating === '0') {
                      dispatch(rateApp({
                        domain: detailedApp.domain,
                        rating: '-1'
                      }))
                    }
                  }}
                >
                  <div className="fs-5 flex align-center justify-center bold">
                  {detailedApp.downVotes}{detailedApp.downVoteIcon}<span className="icon icon-xs ms-1">{downVoteIcon}</span>
                  </div>
                  <div className="fs-5 text-secondary">
                    Down votes
                  </div>
                </div>
                <div className="flex flex-col align-center gap-2 pointer bg-hover border-radius p-2">
                  <div className="fs-5 flex align-center justify-center bold">
                    {detailedApp.comments}<span className="icon icon-xs ms-2">{commentIcon}</span>
                  </div>
                  <div className="fs-5 text-secondary">
                    Comments
                  </div>
                </div>
                <div className="flex flex-col align-center gap-2 p-2">
                  <div className="fs-5 flex align-center justify-center bold">
                    {detailedApp.favorites}<span className="icon icon-xs ms-2">{likeIcon}</span>
                  </div>
                  <div className="fs-5 text-secondary">
                    Favorites
                  </div>
                </div>
              </div>
          </div>
          <div className="flex flex-col">
            <a
              href={`https://${detailedApp.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "300px",
                height: "150px",
              }}
            >
              <Image
                image={detailedApp?.ogMeta.image || detailedApp?.twitterMeta.image || detailedApp.meta.icon }
                alt="app-icon"
                className="box-shadow border-radius-lg obj-cover"
              />
            </a>
            <div className="mt-4">
              <Button
                startIcon={likeIcon}
                size="lg"
                className="w-100"
              >
                Add to favorites
              </Button>
            </div>
          </div>
        </div>
        ) : (
          <div className="mt-5">
            <Skeleton className="400" height="400" animation="wave" />
          </div>
          )}
      </div>
    </div>
  )
}

export default AppInfo