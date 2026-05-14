import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import "./Components/admin.css";

export default function Admin() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <Sidebar />
            </aside>

            <div className="admin-right">
                <header className="admin-topbar">
                    <Topbar />
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}