import { Link, Outlet } from "react-router-dom";

export default function Hero(){
    return(<>
    <div className="tagss">
    <Link to="/" className="linktext">Stopwatch</Link>
    <Link to="/timer" className="linktext">timer</Link>
    </div>
    <Outlet />
    </>)
}