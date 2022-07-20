import './styles/Input.css'

const Input = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    name,
    error,
    success,
    loading,
    disabled,
    autoComplete,
    icon,
    variant,
    resize,
    onClick,
    onKeyDown
}) => {
    return (
        <div 
        onClick={onClick}
        className={`input-container${error ? ' input-danger' : ''}${success ? ' input-success' : ''}${variant ? ` input-${variant}` : ''}${resize ? ' input-resize' : ''}`}>
            <input
                onKeyDown={onKeyDown}
                className={`${error ? 'input-danger' : ''}${success ? ' input-success' : ''}`}
                type={type}
                value={value} 
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                disabled={loading || disabled}
                autoComplete={autoComplete ? 'on' : 'off'}
            />
            <label 
                className={value && 'filled'} 
                htmlFor={name}
            >
                {icon && <span className="input-icon">{icon}</span>}{label}
            </label>
        </div>
    )
}

export default Input