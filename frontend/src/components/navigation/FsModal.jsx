import { useState, useEffect } from 'react';
import { closeIcon } from '../../assets/img/icons';
import IconButton from '../inputs/IconButton';
import './styles/FsModal.css';

const FsModal = ({children, title, fsmOpen, setIsFsmOpen, logo, scroll}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickOutside = (e) => {
        if (e.target.classList.contains('sidenav-wrapper')) {
            setIsFsmOpen(false);
        }
    }

    useEffect(() => {
        if (!fsmOpen) {
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                setIsOpen(false);
            }, 300);
        } else {
            document.body.style.overflow = 'hidden';
            setIsOpen(true);
        }
    }, [fsmOpen]);

    return (
        isOpen ? (
        <div 
            className={`fsm-wrapper ${fsmOpen ? 'open' : 'closed'}`}
            onClick={onClickOutside}
        >
            <div className="fsm">
                <div className="fsm-header">
                    <div className="flex justify-between align-center mx-w-md mx-auto">
                        <h3 className="title-3">
                            {title}
                        </h3>
                        <IconButton
                            color="secondary"
                            icon={closeIcon}
                            onClick={() => setIsFsmOpen(false)}
                        />
                    </div>
                </div>
                <div className={`fsm-body${scroll ? ' sfm-body-scroll' : ''}`}>
                    {children}
                </div>
            </div>
        </div>
        ) : null
    )
}

export default FsModal