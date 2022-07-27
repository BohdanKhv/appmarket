import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams, Link } from "react-router-dom"
import { getApp, resetApp, addToList, removeFromList } from "../../features/app/appSlice"
import { rateApp, deleteRating} from "../../features/rating/ratingSlice"
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
          <div className="flex flex-sm-wrap gap-5">
            <div className="flex flex-col flex-sm-order-1 align-center-sm flex-grow-1-sm">
              <a
                href={`https://${detailedApp.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="user-select-none"
                style={{
                  width: "350px",
                  height: "175px",
                }}
              >
                <Image
                  image={detailedApp?.ogMeta?.image ? detailedApp?.ogMeta?.image.startsWith('http') ? detailedApp?.ogMeta?.image : `http://${detailedApp.domain}/${detailedApp?.ogMeta?.image}` : detailedApp?.meta?.icon}
                  alt="app-icon"
                  className="box-shadow-sm border-radius-lg obj-cover"
                />
              </a>
                <div className="flex gap-3 align-center justify-between mt-5">
                  <div 
                    className={`user-select-none flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp?.userReview?.rating === '1' ? ' bg-secondary' : '' }`}
                    onClick={() => {
                      if (user) {
                        if(detailedApp?.userReview?.rating === '1') {
                          dispatch(deleteRating({app: detailedApp._id}))
                        } else if (detailedApp?.userReview?.rating === '-1' || detailedApp?.userReview?.rating === '0' || !detailedApp?.userReview.rating) {
                          dispatch(rateApp({
                            app: detailedApp._id,
                            rating: '1'
                          }))
                        }
                      }
                    }}
                  >
                    <div className="fs-5 flex align-center justify-center bold">
                      {detailedApp.upVotes}<span className="icon icon-xs ms-1 fill-success">{upVoteIcon}</span>
                    </div>
                    <div className="fs-5 text-secondary">
                      Up votes
                    </div>
                  </div>
                  <div 
                    className={`user-select-none flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp?.userReview?.rating === '-1' ? ' bg-secondary' : '' }`}
                    onClick={() => {
                      if (user) {
                        if(detailedApp?.userReview?.rating === '-1') {
                          dispatch(deleteRating({app: detailedApp._id}))
                        } else if (detailedApp?.userReview?.rating === '1' || detailedApp?.userReview?.rating === '0' || !detailedApp?.userReview.rating) {
                          dispatch(rateApp({
                            app: detailedApp._id,
                            rating: '-1'
                          }))
                        }
                      }
                    }}
                  >
                    <div className="fs-5 flex align-center justify-center bold">
                    {detailedApp.downVotes}{detailedApp.downVoteIcon}<span className="icon icon-xs ms-1 fill-danger">{downVoteIcon}</span>
                    </div>
                    <div className="fs-5 text-secondary">
                      Down votes
                    </div>
                  </div>
                  <div 
                    className={`user-select-none flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp.userFavorite ? ' bg-secondary' : '' }`}
                    onClick={() => {
                      if(detailedApp.userFavorite) {
                        dispatch(removeFromList(detailedApp._id))
                      } else {
                        dispatch(addToList({appId: detailedApp._id}))
                      }
                    }}
                  >
                    <div className="fs-5 flex align-center justify-center bold">
                      {detailedApp.favorites}<span className="icon icon-xs ms-2 fill-info">{detailedApp.userFavorite ? likeFillIcon : likeIcon}</span>
                    </div>
                    <div className="fs-5 text-secondary">
                      Favorites
                    </div>
                  </div>
                  <div
                    className={`user-select-none flex flex-col align-center gap-2 pointer bg-hover border-radius p-2${ detailedApp.userReview.review ? ' bg-secondary' : '' }`}>
                    <div className="fs-5 flex align-center justify-center bold">
                      {detailedApp.reviews}<span className="icon icon-xs ms-2">{commentIcon}</span>
                    </div>
                    <div className="fs-5 text-secondary">
                      Reviews
                    </div>
                  </div>
                </div>
            </div>
            <div className="flex flex-col flex-sm-order-2 align-center-sm flex-grow-1-sm text-center-sm">
              <h1 className="fs-1 filter-shadow text-capitalize">
              { detailedApp?.ogMeta?.title?.length >= detailedApp.domain.length ? detailedApp.domain.split('.')[0] : detailedApp?.ogMeta?.title ? detailedApp.ogMeta.title : detailedApp.meta.title ? detailedApp.meta.title : detailedApp.domain}
              </h1>
              <a
                href={`https://${detailedApp.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-2 text-primary bold mt-4">
                {detailedApp.domain}
              </a>
              {detailedApp.meta.description && (
                <>
                  <h5 className="fs-4 mt-4 bold">
                    About this app
                  </h5>
                  <p className="fs-4 mt-2 mx-w-xs">{detailedApp.meta.description}</p>
                </>
              )}
              {detailedApp.meta.author && (
                <>
                  <h5 className="fs-4 mt-4 bold">
                    Author
                  </h5>
                  <p className="fs-4 mt-2 mx-w-xs">{detailedApp.meta.author}</p>
                </>
              )}
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