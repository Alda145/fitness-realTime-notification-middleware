import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUserTie,
    FaDumbbell,
    FaCalendarDay,
    FaMoneyBillWave,
    FaPlus,
} from "react-icons/fa6";
import { useTrainerContext } from "../../Context/Trainer";
import { useCourseContext } from "../../Context/Course";
import { usePricingContext } from "../../Context/Pricing";
import './index.css';

export default function Dashboard() {
    const navigate = useNavigate();

    const { trainers, getTrainers } = useTrainerContext();
    const { courses, getCourses } = useCourseContext();
    const { pricingList, getPricing } = usePricingContext();

    useEffect(() => {
        getTrainers();
        getCourses();
        getPricing();
    }, []);

    return (
        <div className="container-fluid p-0">
            <div className="dashboard-hero mb-4">
                <div>
                    <span className="dashboard-badge">Admin Overview</span>
                    <h2 className="dashboard-title mt-3 mb-2">
                        Welcome back, Admin 👋
                    </h2>
                    <p className="dashboard-subtitle mb-0">
                        Manage trainers, courses, appointments and pricing from one clean dashboard.
                    </p>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">
                            <FaUserTie />
                        </div>

                        <div>
                            <p>Total Trainers</p>
                            <h3>{trainers.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">
                            <FaDumbbell />
                        </div>

                        <div>
                            <p>Total Courses</p>
                            <h3>{courses.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">
                            <FaCalendarDay />
                        </div>

                        <div>
                            <p>Appointments</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">
                            <FaMoneyBillWave />
                        </div>

                        <div>
                            <p>Pricing Plans</p>
                            <h3>{pricingList.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-7">
                    <div className="dashboard-panel">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h5 className="fw-bold mb-1">Quick Actions</h5>
                                <p className="text-muted mb-0">
                                    Shortcuts to manage your admin data faster.
                                </p>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-4">
                                <button
                                    className="dashboard-action-btn"
                                    onClick={() => navigate("/admin/trainers/create")}
                                >
                                    <FaPlus />
                                    Add Trainer
                                </button>
                            </div>

                            <div className="col-md-4">
                                <button
                                    className="dashboard-action-btn"
                                    onClick={() => navigate("/admin/courses/create")}
                                >
                                    <FaPlus />
                                    Add Course
                                </button>
                            </div>

                            <div className="col-md-4">
                                <button
                                    className="dashboard-action-btn"
                                    onClick={() => navigate("/admin/pricing")}
                                >
                                    <FaPlus />
                                    Add Pricing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="dashboard-panel h-100">
                        <h5 className="fw-bold mb-3">Admin Summary</h5>

                        <div className="dashboard-summary-item">
                            <span>Trainers available</span>
                            <strong>{trainers.length}</strong>
                        </div>

                        <div className="dashboard-summary-item">
                            <span>Courses published</span>
                            <strong>{courses.length}</strong>
                        </div>

                        <div className="dashboard-summary-item">
                            <span>Pricing options</span>
                            <strong>{pricingList.length}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}