import { Link } from "react-router"
import { ROUTES } from "../routes/routes"

import AddIcon from "../icons/AddIcon"
//Will big + symbol, and by a hoover element - might be wise to creat some aria tags at some point too!

const AddBundle = () => {

    return(
        <Link
        to={`/bundle/create`}
        className="Bundle Centre"
        > 
            <AddIcon style={'Icon'}/>
        </Link>
    )
}

export default AddBundle 