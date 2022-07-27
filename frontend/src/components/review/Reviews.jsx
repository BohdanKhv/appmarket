import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ReviewItem, AuthGate, CreateReview, Skeleton } from '../'


const Reviews = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { reviews, isLoading } = useSelector(state => state.rating)
  const { detailedApp } = useSelector(state => state.app)
  const { user } = useSelector(state => state.user)

  return (
    <div className="pt-5 flex-grow-1">
      <h3 className="fs-2 pb-3">
        Reviews
      </h3>
        <AuthGate>
          {detailedApp.userReview && detailedApp.userReview.review ? (
            <ReviewItem
              review={{
                review: detailedApp.userReview.review,
                user: user,
                app: detailedApp._id,
                updatedAt: detailedApp.userReview.updatedAt,
              }}
            />
          ) : (
            <CreateReview/>
          )}
        </AuthGate>
      {isLoading && (
        <Skeleton animation="wave" height={50} className="border-radius" />
      )}
    </div>
  )
}

export default Reviews