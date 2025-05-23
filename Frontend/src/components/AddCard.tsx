import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/routes'

import AddIcon from '../icons/AddIcon'

const AddCard = () => {

    return(
        <Link to={ROUTES.CARD_CREATE}
        className='Card'
        >
        <AddIcon style={'Icon'}/>
        </Link>
    )  
} 

export default AddCard