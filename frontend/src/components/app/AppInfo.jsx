import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams, Link } from "react-router-dom"
import { getApp, resetApp, rateApp, deleteRating, addToList, removeFromList } from "../../features/app/appSlice"
import { likeIcon, arrowUpIcon, downVoteIcon, commentIcon, upVoteIcon, likeFillIcon } from "../../assets/img/icons"
import { Button, IconButton, Skeleton, Image } from '../'


const AppInfo = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { user } = useSelector(state => state.user)
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
          <div className="flex flex-sm-wrap justify-between gap-5">
            <div className="flex flex-col text-capitalize flex-sm-order-2 align-center-sm flex-grow-1-sm text-center-sm">
              <h1 className="fs-1">
                {detailedApp?.meta?.title || detailedApp.domain.split('.')[0]}
              </h1>
              <Link to={`/store/dev?id=${detailedApp.developer._id}`} className="fs-2 text-primary bold mt-4">
                {detailedApp.developer.name}
              </Link>
              {detailedApp.meta.description && (
                <p className="fs-4 mt-4 mx-w-xs">{detailedApp.meta.description}</p>
              )}
            </div>
            <div className="flex flex-col flex-sm-order-1 align-center-sm flex-grow-1-sm">
              <a
                href={`https://${detailedApp.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "350px",
                  height: "175px",
                }}
              >
                <Image
                  image={detailedApp?.ogMeta.image || detailedApp?.twitterMeta.image || detailedApp.meta.icon }
                  alt="app-icon"
                  className="box-shadow border-radius-lg obj-cover"
                />
              </a>
                <div className="flex gap-3 align-center justify-between mt-5">
                  <div 
                    className={`flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp.userRating === '1' ? ' bg-secondary' : '' }`}
                    onClick={() => {
                      if (user) {
                        if(detailedApp.userRating === '1') {
                          dispatch(deleteRating(detailedApp._id))
                        } else if (detailedApp.userRating === '-1' || detailedApp.userRating === '0') {
                          dispatch(rateApp({
                            domain: detailedApp.domain,
                            rating: '1'
                          }))
                        }
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
                      if (user) {
                        if(detailedApp.userRating === '-1') {
                          dispatch(deleteRating(detailedApp._id))
                        } else if (detailedApp.userRating === '1' || detailedApp.userRating === '0') {
                          dispatch(rateApp({
                            domain: detailedApp.domain,
                            rating: '-1'
                          }))
                        }
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
                  <div 
                    className={`flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp.userFavorite ? ' bg-secondary' : '' }`}
                    onClick={() => {
                      if(detailedApp.userFavorite) {
                        dispatch(removeFromList(detailedApp._id))
                      } else {
                        dispatch(addToList({appId: detailedApp._id}))
                      }
                    }}
                  >
                    <div className="fs-5 flex align-center justify-center bold">
                      {detailedApp.favorites}<span className="icon icon-xs ms-2">{detailedApp.userFavorite ? likeFillIcon : likeIcon}</span>
                    </div>
                    <div className="fs-5 text-secondary">
                      Favorites
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