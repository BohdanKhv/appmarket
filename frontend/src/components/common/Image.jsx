import { useState, useRef } from "react"
import './styles/Image.css'

const Image = ({
    image,
    alt,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const imageRef = useRef(null)

    return (
        <div
            style={{
                background: isImageLoaded ? 'none' : 'var(--color-secondary',
                width: isImageLoaded ? 'auto' : '100%',
                height: isImageLoaded ? 'auto' : '100%',
                minHeight: isImageLoaded ? 'auto' : '100%',
            }}
        >
            <img
                className={`image-main${className ? ` ${className}` : ""}${isImageLoaded ? '' : ' opacity-0'}`}
                src={image}
                onLoad={() => {
                    setIsImageLoaded(true);
                }}
                alt={alt}
                ref={imageRef}
                onClick={onClick}
                decoding="async"
                title={alt}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </div>
    )
}

export default Image