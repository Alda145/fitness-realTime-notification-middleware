import { NavLink } from "react-router-dom";
import { FaHouse, FaUserTie, FaDumbbell, FaCalendarDay, FaClock } from "react-icons/fa6";


export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <h2>Fitness Admin</h2>
            </div>

            <div className="sidebar-links">
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
                    <span>Blocked Slots </span>
                </NavLink>
            </div>
        </div>
    );
}