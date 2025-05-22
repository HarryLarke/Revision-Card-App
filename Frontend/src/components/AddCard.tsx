import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/routes'

const AddCard = () => {

    return(
        <Link to={ROUTES.CARD_CREATE}>
        +
        </Link>
    )  
} 

export default AddCard