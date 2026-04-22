import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import "./Components/admin.css";

export default function Admin() {
    return (
        <div className="admin-layout">

            {/* Sidebar majtas */}
            <div className="admin-sidebar">
                <Sidebar />
            </div>

            {/* Pjesa djathtas */}
            <div className="admin-right">

                {/* Topbar sipër */}
                <div className="admin-topbar">
                    <Topbar />
                </div>

                {/* Këtu ndryshon faqja */}
                <div className="admin-content">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}