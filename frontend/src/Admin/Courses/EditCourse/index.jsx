import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCourseContext } from "../../../Context/Course";
import { useTrainerContext } from "../../../Context/Trainer";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getOneCourse, updateCourse } = useCourseContext();
    const { trainers, getTrainers } = useTrainerContext();

    const [value, setValue] = useState({
        title: "",
        description: "",
        day: "",
        time: "",
        trainer_id: "",
    });

    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTrainers();

                const result = await getOneCourse(id);

                if (result) {
                    setValue({
                        title: result.title || "",
                        description: result.description || "",
                        day: result.day || "",
                        time: result.time || "",
                        trainer_id: result.trainer?.id || result.trainer_id || "",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValue((prev) => ({
            ...prev,
            [name]: name === "trainer_id" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await updateCourse(id, value, file);

            if (result) {
                navigate("/admin/courses");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="page-title mb-1">Edit Course</h2>
                    <p className="page-subtitle mb-0">
                        Update course information.
                    </p>
                </div>

                <Link to="/admin/courses" className="btn btn-outline-secondary rounded-3 px-4">
                    Back
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={value.title}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter course title"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Day</label>
                                <input
                                    type="text"
                                    name="day"
                                    value={value.day}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter day"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    value={value.time}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter time"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Trainer</label>
                                <select
                                    name="trainer_id"
                                    value={value.trainer_id}
                                    onChange={handleChange}
                                    className="form-select rounded-3"
                                >
                                    <option value="">Select trainer</option>
                                    {trainers &&
                                        trainers.map((trainer) => (
                                            <option key={trainer.id} value={trainer.id}>
                                                {trainer.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea
                                    name="description"
                                    value={value.description}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    rows="4"
                                    placeholder="Enter course description"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Change Icon</label>
                                <input
                                    type="file"
                                    className="form-control rounded-3"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Link to="/admin/courses" className="btn btn-light border rounded-3 px-4">
                                Cancel
                            </Link>

                            <button type="submit" className="btn btn-dark rounded-3 px-4">
                                Update Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}