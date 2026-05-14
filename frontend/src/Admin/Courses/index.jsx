import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../../Context/Course";
import './index.css';

export default function Courses() {
    const { courses, getCourses, deleteCourse } = useCourseContext();

    useEffect(() => {
        getCourses();
    }, []);

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this course?");
        if (result) {
            await deleteCourse(id);
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="page-title mb-1">Courses</h2>
                    <p className="page-subtitle mb-0">
                        Manage all courses from here.
                    </p>
                </div>

                <Link to="/admin/courses/create" className="btn btn-dark rounded-3 px-4">
                    Add Course
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-3 py-3">Icon</th>
                                    <th className="px-3 py-3">Title</th>
                                    <th className="px-3 py-3">Description</th>
                                    <th className="px-3 py-3">Day</th>
                                    <th className="px-3 py-3">Time</th>
                                    <th className="px-3 py-3">Trainer</th>
                                    <th className="px-3 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {courses && courses.length > 0 ? (
                                    courses.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-3 py-3">
                                                <img
                                                    src={`http://localhost:3000${item.icon}`}
                                                    alt={item.title}
                                                    className="rounded-3 object-fit-cover"
                                                    style={{ width: "55px", height: "55px" }}
                                                />
                                            </td>

                                            <td className="px-3 py-3 fw-semibold">{item.title}</td>

                                            <td className="px-3 py-3 text-muted">
                                                {item.description}
                                            </td>

                                            <td className="px-3 py-3">{item.day}</td>

                                            <td className="px-3 py-3">{item.time}</td>

                                            <td className="px-3 py-3">
                                                {item.trainer?.name || "No Trainer"}
                                            </td>

                                            <td className="px-3 py-3">
                                                <div className="d-flex flex-wrap gap-2">
                                                    <Link
                                                        to={`/admin/courses/edit/${item.id}`}
                                                        className="btn btn-light border rounded-3 btn-sm px-3"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger rounded-3 btn-sm px-3"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-4">
                                            No courses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}