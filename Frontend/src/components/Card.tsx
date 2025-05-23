import { Link } from 'react-router-dom'
import type { DisplayCard } from '../types/cards'

const Card: React.FC<DisplayCard> = ({_id, question, answer, showAnswers}) => {

    return (
        <Link to={`/card/${_id}`}
        className='Bundle'>
            <p>{question}</p>
            {showAnswers === true ? <p>{answer}</p> : <br></br>}
            
        </Link>
    )
}

export default Card