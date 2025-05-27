import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/routes'

import AddIcon from '../icons/AddIcon'

const AddCard = ({bundleId}) => {

    return(
        <Link to={`/card/create/${bundleId}`}
        className='Card'
        >
        <AddIcon style={'Icon'}/>
        </Link>
    )  
} 

export default AddCard