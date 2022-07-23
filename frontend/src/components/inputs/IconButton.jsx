import { spinnerIcon } from '../../assets/img/icons';
import './styles/IconButton.css';

const IconButton = ({
    icon,
    onClick,
    size,
    color,
    disabled,
    className,
    title,
    fill,
    isLoading
}) => {

    return (
        <button
            className={`icon-btn${size ? ` icon-btn-${size}` : ''}${color ? ` icon-btn-${color}` : ''}${disabled ? ' icon-btn-disabled' : ''}${className ? ` ${className}` : ''}${fill ? ' icon-btn-fill' : ''}${isLoading ? ' icon-btn-loading spinner' : ''}`}
            onClick={onClick && !disabled && !isLoading ? onClick : null}
            disabled={disabled}
            title={title}
        >
            {isLoading ? spinnerIcon : icon}
        </button>
    )
}

export default IconButton