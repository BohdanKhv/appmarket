import { useEffect } from 'react';
import "./styles/Menu.css"

const Menu = ({ children, open, setOpen }) => {

    const openMenuOnClick = (e) => {
        if(open) {
            if (
                !e.target.classList.contains('menu') && 
                !e.target.classList.contains('menu-item') && 
                !e.target.classList.contains('menu-btn')
            ) {
                
                setOpen(false);
            }
        }
    }


    useEffect(() => {
        window.addEventListener('click', openMenuOnClick);

        return () => {
            window.removeEventListener('click', openMenuOnClick);
        }
    }, [open]);

    return (
        <div className={`menu${open ? ' menu-open' : ''}`}>
            {children}
        </div>
    )
}

export default Menu
