import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function NavBar(){
    return(
        <nav className="text-gray-900 shadow-md">
       
            <div className="px-12">
                <div className="flex justify-end h-18 items-center tracking-wide ">
                    <Link to="/"><img src={logo} className="pr-182"></img></Link>
                    <Link  to="/" className="hover:underline font-semibold transition px-8">Explore</Link>
                    <Link to="/favorites" className="hover:underline font-medium transition px-8">Favourites</Link>
                    <Link to="/profile" className="hover:underline font-medium transition px-8">Profile</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar