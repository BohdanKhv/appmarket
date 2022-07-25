import { searchIcon } from '../../assets/img/icons'
import { Input } from '../'

const Search = ({mobile}) => {
    return (
        <Input
            placeholder="Search"
            type="text"
            name="search"
            label="Search for apps and more"
            className="flex-grow-1"
            icon={searchIcon}
            size={mobile ? 'sm' : ''}
        />
    )
}

export default Search