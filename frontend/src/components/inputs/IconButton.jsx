import './styles/IconButton.css';

const IconButton = ({
    icon,
    onClick,
    size,
    color,
    disabled,
    className,
    title,
    fill
}) => {

    return (
        <button
            className={`icon-btn${size ? ` icon-btn-${size}` : ''}${color ? ` icon-btn-${color}` : ''}${disabled ? ' icon-btn-disabled' : ''}${className ? ` ${className}` : ''}${fill ? ' icon-btn-fill' : ''}`}
            onClick={onClick ? onClick : null}
            disabled={disabled}
            title={title}
        >
            {icon}
        </button>
    )
}

export default IconButton