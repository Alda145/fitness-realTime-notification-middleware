import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
    return (
        <div className="topbar-container">
            <div>
                <h4 className="topbar-title">Admin Panel</h4>
            </div>

            <div className="topbar-right">
                <button className="topbar-icon-btn">
                    <FaBell />
                </button>

                <div className="topbar-user">
                    <FaUserCircle />
                    <span>Admin</span>
                </div>
            </div>
        </div>
    );
}