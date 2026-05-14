import { NavLink, useNavigate } from "react-router-dom";
import {
    FaHouse,
    FaUserTie,
    FaDumbbell,
    FaCalendarDay,
    FaClock,
    FaMoneyBillWave,
    FaArrowRightFromBracket,
} from "react-icons/fa6";
import { useUserContext } from "../../Context/User";

export default function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useUserContext();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="sidebar-container">
            <div>
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">F</div>

                    <div>
                        <h2>Fitness</h2>
                        <p>Admin Panel</p>
                    </div>
                </div>

                <nav className="sidebar-links">
                    <NavLink to="/admin" end className="sidebar-link">
                        <FaHouse />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/admin/trainers" className="sidebar-link">
                        <FaUserTie />
                        <span>Trainers</span>
                    </NavLink>

                    <NavLink to="/admin/courses" className="sidebar-link">
                        <FaDumbbell />
                        <span>Courses</span>
                    </NavLink>

                    <NavLink to="/admin/appointments" className="sidebar-link">
                        <FaCalendarDay />
                        <span>Appointments</span>
                    </NavLink>

                    <NavLink to="/admin/blocked-slots" className="sidebar-link">
                        <FaClock />
                        <span>Blocked Slots</span>
                    </NavLink>

                    <NavLink to="/admin/pricing" className="sidebar-link">
                        <FaMoneyBillWave />
                        <span>Pricing</span>
                    </NavLink>
                </nav>
            </div>

            <button type="button" className="sidebar-logout" onClick={handleLogout}>
                <FaArrowRightFromBracket />
                <span>Logout</span>
            </button>
        </div>
    );
}