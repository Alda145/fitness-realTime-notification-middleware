import { FaBell, FaUserCircle } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Topbar() {
    return (
        <div className="topbar-container">
            <div className="topbar-left">
                <button type="button" className="topbar-menu-btn">
                    <FaBarsStaggered />
                </button>

                <div>
                    <h4 className="topbar-title">Welcome back, Admin 👋</h4>
                    <p className="topbar-subtitle">
                        Manage your fitness dashboard easily
                    </p>
                </div>
            </div>

            <div className="topbar-right">
                <button type="button" className="topbar-icon-btn">
                    <FaBell />
                </button>

                <div className="topbar-user">
                    <FaUserCircle />

                    <div>
                        <span>Admin</span>
                        <small>Manager</small>
                    </div>
                </div>
            </div>
        </div>
    );
}