import { useState, useRef } from "react"
import './styles/Image.css'

const Image = ({
    image,
    alt,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    width,
    height,
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const imageRef = useRef(null)

    return (
        <div
            style={{
                background: isImageLoaded ? 'none' : 'var(--color-secondary',
                width: isImageLoaded ? 'inherit' : '100%',
                height: isImageLoaded ? 'inherit' : '100%',
                minHeight: isImageLoaded ? 'inherit' : '100%',
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
                width={width}
                height={height}
                decoding="async"
                title={alt}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </div>
    )
}

export default Image