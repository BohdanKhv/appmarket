import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from "../../features/rating/ratingSlice"
import { useSearchParams } from 'react-router-dom';
import { Textarea, Button } from '../'


const CreateReview = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [review, setReview] = useState('');
    const { reviewLoading } = useSelector(state => state.rating);
    const { detailedApp } = useSelector(state => state.app);

    const onSubmit = () => {
        dispatch(createReview({
            review: review,
            app: detailedApp._id
        }))
    }

    return (
        <div className="mt-3 flex-grow-1">
            <div className="flex gap-3">
                <Textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write a review"
                    label="Write a review"
                    className="border-radius flex-grow-1"
                    disabled={reviewLoading}
                />
                <Button
                    color={reviewLoading || review.length === 0 ? 'disabled' : 'primary'}
                    disabled={reviewLoading || review.length === 0}
                    loading={reviewLoading}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}


export default CreateReview