import  { Outlet } from "react-router"

import Header from '../components/Header'

const Layout = () => {
    return (
        <div className="Body">
            <Header/>
            <main className="App">
            <Outlet/>
            </main>
        </div>
    )
}

export default Layout