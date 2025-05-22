import { Link } from 'react-router-dom'
import type { DisplayBundle } from '../types/bundles'

const Bundle: React.FC<DisplayBundle> = ({_id, title, description}) => {

    return (
        <Link to={`/bundle/${_id}`}
        className='Bundle'>
            <h3>{title}</h3>
            <p>{description}</p> 
        </Link>
    )
}

export default Bundle