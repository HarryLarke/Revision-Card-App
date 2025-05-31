import { Link } from 'react-router-dom'
import type { DisplayBundle } from '../types/bundles'
import { useSelection } from '../hooks/useSelection'

const Bundle: React.FC<DisplayBundle> = ({_id, title, description}) => {
    const { setBundle } = useSelection()

    const canSet = [title, description].every(Boolean)
    
    const handleClick = () => {
        if(canSet) setBundle({title, description})
            else console.log('Waiting')
    
    }

    return (
        <Link to={`/bundle/${_id}`}
        className='Bundle'
        onClick={handleClick}
        >
            <h3>{title}</h3>
            <p>{description}</p> 
        </Link>
    )
}

export default Bundle