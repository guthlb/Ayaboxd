import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function NavBar(){
    return(
        <nav className="text-black shadow-md bg-white/40 backdrop-blur-md fixed w-full z-50">
  <div className="px-12">
    <div className="flex justify-end h-18 items-center tracking-wide">
      <Link to="/"><img src={logo} className="pr-160" /></Link>
      <Link to="/" className="hover:underline font-semibold transition px-8 text-xl">Explore</Link>
      <Link to="/favorites" className="hover:underline font-medium transition px-8 text-xl">Favourites</Link>
      <Link to="/profile" className="hover:underline font-medium transition px-8 text-xl">Profile</Link>
    </div>
  </div>
</nav>

    )
}

export default NavBar