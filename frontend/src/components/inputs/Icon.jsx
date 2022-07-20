import './styles/Icon.css'

const Icon = ({ icon, title, color, size, className }) => {
    return (
        <div 
            className={`icon${size ? ` icon-${size}` : ""}${color ? ` icon-${color}` : ""}${className ? ` ${className}` : ""}`}
            title={title ? title : undefined}
        >
            {icon ? icon : undefined}
        </div>
    )
}

export default Icon