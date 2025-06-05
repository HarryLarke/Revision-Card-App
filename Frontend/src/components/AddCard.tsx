import { Link } from 'react-router-dom'

import AddIcon from '../icons/AddIcon'

const AddCard = ({bundleId}) => {

    return(
        <Link to={`/card/create/${bundleId}`}
        className='Card Centered'
        >
        <AddIcon style={'Icon'}/>
        </Link>
    )  
} 

export default AddCard