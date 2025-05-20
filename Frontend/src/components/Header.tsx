import { Link } from "react-router-dom"
import {ROUTES} from '../routes/routes'

const Header = () => {
    return(
        <header className="Header"
        >  
        <h1>Revision Cards</h1> 
        <Link to={ROUTES.HOME}>Home</Link>
        </header>
    )
}

export default Header