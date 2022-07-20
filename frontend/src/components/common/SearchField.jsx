import { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { searchIcon } from '../../assets/img/icons';
import { Input, Button, Icon } from '../';
// import { categories } from '../../assets/data/localData';
import './styles/SearchField.css';


const SearchField = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriesFound, setCategoriesFound] = useState([]);
    const searchListRef = useRef(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (searchListRef.current && !searchListRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [searchListRef]);

    useEffect(() => {
        let promise = null;
        if (searchQuery.length > 0) {
            // setCategoriesFound(categories.filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase())).splice(0, 5));
        }

        return () => {
            promise && promise.abort();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
        }
    }, [pathname]);

    return (
        <div className="search">
            <Input
                type="text"
                label="Search"
                placeholder="Type to search"
                value={searchQuery}
                variant="outline"
                resize
                onKeyDown={(e) => {
                    if (e.key === 'Enter' ) {
                        navigate(`/search?q=${searchQuery}`);
                        setIsOpen(false);
                    }
                }}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if(e.target.value.length > 0) {
                        setIsOpen(true);
                    } else {
                        setIsOpen(false);
                    }
                }}
                icon={searchIcon}
                onClick={() => {
                    setIsOpen(true);
                }}
            />
            <div className={`search-results${searchQuery && isOpen ? '' : ' d-none'}`}>
                <div className="flex justify-between p-2 border-bottom">
                    <h3 className="fs-3 flex align-center">Search Results</h3>
                    <div className="mx-3">
                        <Button
                            onClick={() => {
                                setSearchQuery('');
                                setIsOpen(false);
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
                <div 
                    className="search-list"
                    ref={searchListRef}
                >
                    <div className="p-3">
                        <Link 
                            className="fs-3 text-hover-secondary border flex align-center px-3 py-2 border-radius" 
                            title={searchQuery}
                            to={`/search/?q=${searchQuery.replaceAll(' ', '-')}`}>
                            <Icon 
                                icon={searchIcon}
                                size="sm"
                                className="me-2"
                            />
                            <span className="fs-3">
                                Search for "{searchQuery}" in all videos
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchField