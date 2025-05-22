import { Link } from "react-router-dom"
import {ROUTES} from '../routes/routes'

import  HomeIcon from '../icons/HomeIcon'
import GlobeIcon from '../icons/GlobeIcon'
import UserIcon  from '../icons/UserIcon'

const Header = () => {
    return(
        <header className="Header"
        >  
        <h1>Revision Cards</h1> 
        <Link to={ROUTES.HOME}>
            <HomeIcon style={'Home-Icon'}/>
        </Link>
        <GlobeIcon style={'Home-Icon'}/>
        <UserIcon style={'Home-Icon'}/>

        </header>
    )
}

export default Header