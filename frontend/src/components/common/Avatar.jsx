import { useEffect, useState, useRef } from 'react'
import './styles/Avatar.css'

const Avatar = ({image, name, size, width, height, className}) => {
  const [loading, setLoading] = useState(true)
  const imageRef = useRef(null)

  useEffect(() => {
    if (imageRef.current) {
        imageRef.current.addEventListener("load", () => {
            setLoading(true)
        })
    }

    return () => {
        if (imageRef.current) {
            imageRef.current.removeEventListener("load", () => {
                setLoading(false)
            });
        }
    }
}, [])

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  return (
    <div 
      className={`avatar${size ? ` avatar-${size}` : ''}${className ? ` ${className}` : ''}`}
      style={{
        backgroundColor: stringToColor(name),
        width: width ? width : undefined,
        height: height ? height : undefined
      }}
    >
      { !image ?
        name.slice(0, 2).toUpperCase()
        : 
        <img
          className={`${loading ? '' : ' avatar-loading'}`}
          ref={imageRef}
          src={image} 
          alt={name} 
          decoding="async"
        />
      }
    </div>
  )
}

export default Avatar