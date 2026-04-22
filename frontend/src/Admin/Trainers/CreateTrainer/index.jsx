import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTrainerContext } from "../../../Context/Trainer";

export default function CreateTrainer() {
    const navigate = useNavigate();
    const { createTrainer } = useTrainerContext();

    const [value, setValue] = useState({
        name: "",
        role: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
    });

    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await createTrainer(value, file);

            if (result) {
                navigate("/admin/trainers");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="page-title mb-1">Create Trainer</h2>
                    <p className="page-subtitle mb-0">
                        Add a new trainer to your dashboard.
                    </p>
                </div>

                <Link to="/admin/trainers" className="btn btn-outline-secondary rounded-3 px-4">
                    Back
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={value.name}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter trainer name"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={value.role}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter trainer role"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Facebook</label>
                                <input
                                    type="text"
                                    name="facebook"
                                    value={value.facebook}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter facebook link"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Twitter</label>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={value.twitter}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter twitter link"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Instagram</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={value.instagram}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter instagram link"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Linkedin</label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={value.linkedin}
                                    onChange={handleChange}
                                    className="form-control rounded-3"
                                    placeholder="Enter linkedin link"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Image</label>
                                <input
                                    type="file"
                                    className="form-control rounded-3"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Link to="/admin/trainers" className="btn btn-light border rounded-3 px-4">
                                Cancel
                            </Link>

                            <button type="submit" className="btn btn-dark rounded-3 px-4">
                                Save Trainer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}