import "./styles/Header.css"

const Header = ({label}) => {
    return (
        <header className="header">
            <h1 className="header-title text-menu filter-shadow">
                {label}
            </h1>
        </header>
    )
}

export default Header