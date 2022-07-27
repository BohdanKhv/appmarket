import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Avatar, IconButton } from "../"
import { dotsIcon, trashIcon } from '../../assets/img/icons';
import { deleteReview } from '../../features/rating/ratingSlice';

const ReviewItem = ({review, isUser}) => {
    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false)
    const{ user } = useSelector(state => state.user)

    return (
        <div className="flex flex-col">
            <div className="flex gap-3 justify-between align-center">
                <div className="flex gap-3 align-center">
                    <Avatar
                        name={review.user.fullName}
                        image={review.user?.avatar}
                        size="sm"
                    />
                    <span className="fs-4">
                        {review.user.fullName}
                    </span>
                </div>
                <div className="pos-relative">
                    <IconButton className="menu-btn" size="sm" color="secondary" onClick={() => setOpenMenu(!openMenu)} icon={dotsIcon} />
                    {user && user._id === review.user._id && (
                        <Menu open={openMenu} setOpen={setOpenMenu}>
                            <div className="menu-item text-capitalize" onClick={() => {dispatch(deleteReview({app: review.app}))}}><span className="menu-item-icon">{trashIcon}</span>Delete review</div>
                        </Menu>
                    )}
                </div>
            </div>
            <div className="flex gap-3 mt-4">
                <span>
                    Vote
                </span>
                <span>
                    {new Date(review.updatedAt).toLocaleDateString("en-US", {'month': 'short', 'day': 'numeric', 'year': 'numeric'})}
                </span>
            </div>
            <p className="fs-5 mt-3">
                {review.review}
            </p>
        </div>
    )
}

export default ReviewItem