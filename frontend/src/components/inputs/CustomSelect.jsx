import Select from 'react-select';

const CustomSelect = ({ className, options, onChange, value, placeholder, isSearchable, isMulti, isClearable, isLoading }) => {
  const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: 'var(--text-dark)',
        transition: 'var(--transition-duration)',
        padding: 15,
        background: state.isSelected ? 'var(--color-secondary)' : 'var(--color-main)',
        cursor: 'pointer',
        '&:hover': {
          background: 'var(--color-secondary)',
        },
    }),
    control: () => ({
        outline: '2px solid var(--color-secondary)',
        background: 'var(--color-secondary)',
        fontWeight: '400',
        display: 'flex',
        height: '45px',
        borderRadius: 'var(--border-radius)',
        cursor: 'pointer',
        transition: 'var(--transition-duration)',
        width: '100%',
        minWidth: '110px',
        fontFamily: 'inherit',
        '&:hover': {
          outline: '2px solid var(--color-primary)',
          // boxShadow: 'var(--box-shadow)',
        },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      boxShadow: 'var(--box-shadow)',
    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: 'var(--border-radius)',
      background: 'var(--color-main)',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = state.isSelected ? 'var(--text-light)' : '#var(--text-dark)';

        return { ...provided, opacity, transition, color };
    }
  }

  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={value}
      className={className}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      isLoading={isLoading}
    />
  )
}

export default CustomSelect