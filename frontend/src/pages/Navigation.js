import {Link} from "react-router-dom"

const Navigation = () => {
    return (
        <nav id="navbar">
            <Link class="cat" to="/">Home-Quiz</Link> |
            <Link class="cat" to="/List">All Albums</Link> |
            <Link class="cat" to="/search">Search</Link> |
            <Link class="cat" to="/add-album">Add Album</Link> |
            <img style={{width:100, background:"transparent"}}src="https://i.ibb.co/TMnX1NGk/alquizlogo.png" alt="Logo" />

        </nav>
    )
}
export default Navigation