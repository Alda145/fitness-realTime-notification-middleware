import { useEffect } from "react";
import { FaUserTie, FaDumbbell } from "react-icons/fa6";
import { useTrainerContext } from "../../Context/Trainer";
import { useCourseContext } from "../../Context/Course";

export default function Dashboard() {
    const { trainers, getTrainers } = useTrainerContext();
    const { courses, getCourses } = useCourseContext();

    useEffect(() => {
        getTrainers();
        getCourses();
    }, []);

    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h2 className="page-title mb-1">Dashboard</h2>
                <p className="page-subtitle mb-0">
                    Welcome to your admin panel.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-4 text-white"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    backgroundColor: "#081a57",
                                    fontSize: "24px",
                                    flexShrink: 0,
                                }}
                            >
                                <FaUserTie />
                            </div>

                            <div>
                                <h6 className="text-muted mb-2 fw-semibold">Total Trainers</h6>
                                <h3 className="mb-0 fw-bold">{trainers.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-4 text-white"
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    backgroundColor: "#081a57",
                                    fontSize: "24px",
                                    flexShrink: 0,
                                }}
                            >
                                <FaDumbbell />
                            </div>

                            <div>
                                <h6 className="text-muted mb-2 fw-semibold">Total Courses</h6>
                                <h3 className="mb-0 fw-bold">{courses.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}