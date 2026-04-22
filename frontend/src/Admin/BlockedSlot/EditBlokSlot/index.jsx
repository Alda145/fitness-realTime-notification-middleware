import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useBlockedSlotContext } from "../../../Context/BlockedSlot";

export default function EditBlockedSlot() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { getOneBlockedSlot, updateBlockedSlot } = useBlockedSlotContext();

    const [value, setValue] = useState({
        title: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        const getData = async () => {
            const data = await getOneBlockedSlot(id);

            if (data) {
                setValue({
                    title: data.title || "",
                    startTime: data.startTime
                        ? new Date(data.startTime).toISOString().slice(0, 16)
                        : "",
                    endTime: data.endTime
                        ? new Date(data.endTime).toISOString().slice(0, 16)
                        : "",
                });
            }
        };

        getData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value: inputValue } = event.target;

        setValue((prev) => ({
            ...prev,
            [name]: inputValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await updateBlockedSlot(id, value);

        if (result) {
            navigate("/admin/blocked-slots");
        }
    };

    return (
        <div className="trainer-page">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Edit Blocked Slot</h2>
                    <p className="page-subtitle">Update blocked slot details from here.</p>
                </div>
            </div>

            <div className="table-card">
                <form onSubmit={handleSubmit} className="custom-form">
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <select
                            name="title"
                            value={value.title}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select title</option>
                            <option value="Crossfit Class">Crossfit Class</option>
                            <option value="Aeroby">Aeroby</option>
                            <option value="Pushim">Pushim</option>
                            <option value="Busy">Busy</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={value.startTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">End Time</label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={value.endTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="action-buttons mt-3">
                        <button type="submit" className="edit-btn border-0">
                            Update
                        </button>

                        <Link to="/admin/blocked-slots" className="delete-btn text-decoration-none">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}