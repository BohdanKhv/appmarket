import "./styles/Header.css"

const Header = ({label, secondary}) => {
    return (
        <header className="header">
            <h1 className="header-title text-menu filter-shadow">
                {label}
            </h1>
            {secondary &&
                <h5 className="fs-3 weight-normal pt-3">
                    Create free publisher page and start publishing your apps.
                </h5>
            }
        </header>
    )
}

export default Header