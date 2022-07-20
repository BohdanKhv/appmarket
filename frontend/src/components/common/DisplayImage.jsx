import { useState} from 'react';
import { closeIcon } from '../../assets/img/icons';
import { Image } from '../';
import './styles/DisplayImage.css';

const DisplayImage = ({image, alt, className}) => {
    const [showImage, setShowImage] = useState(false);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('image-overlay') || e.target.classList.contains('image-wrapper')) {
            setShowImage(false);
        }
    }

    return (
        <>
        {showImage && (
            <div 
                className="image-overlay"
                onClick={onClickOutside}
            >
                <div className="close position-absolute">
                    <div 
                        className="close-btn"
                        onClick={() => setShowImage(false)}
                        title="Close"
                    >
                        {closeIcon}
                    </div>
                </div>
                <div className="image-wrapper container">
                    <Image
                        className={`image-content`}
                        image={image}
                        alt={alt}
                    />
                </div>
            </div>
        )}
        <Image
            className={`image-btn ${className}`}
            image={image}
            alt={alt}
            onClick={() => setShowImage(true)}
        />
        </>
    )
}

export default DisplayImage