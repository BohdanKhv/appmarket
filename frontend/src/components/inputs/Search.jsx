import { searchIcon } from '../../assets/img/icons'
import { Input } from '../'

const Search = ({mobile}) => {
    return (
        <Input
            placeholder="Search"
            type="text"
            name="search"
            label="Search for apps"
            icon={searchIcon}
            size={mobile ? 'sm' : ''}
        />
    )
}

export default Search