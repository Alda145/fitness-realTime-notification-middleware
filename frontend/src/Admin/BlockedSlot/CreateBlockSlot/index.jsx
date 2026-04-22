import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBlockedSlotContext } from "../../../Context/BlockedSlot";

export default function CreateBlockedSlot() {
    const navigate = useNavigate();
    const { createBlockedSlot } = useBlockedSlotContext();

    const [value, setValue] = useState({
        title: "",
        startTime: "",
        endTime: "",
    });

    const handleChange = (event) => {
        const { name, value: inputValue } = event.target;

        setValue((prev) => ({
            ...prev,
            [name]: inputValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("VALUE TO SEND:", value);

        const result = await createBlockedSlot(value);

        console.log("CREATE RESULT:", result);

        if (result) {
            navigate("/admin/blocked-slots");
        }
    };

    return (
        <div className="trainer-page">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Create Blocked Slot</h2>
                    <p className="page-subtitle">Add a new blocked slot from here.</p>
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
                            min="2026-04-01T07:00"
                            max="2026-12-31T22:00"
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
                            min="2026-04-01T07:00"
                            max="2026-12-31T22:00"
                            name="endTime"
                            value={value.endTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="action-buttons mt-3">
                        <button type="submit" className="add-btn">
                            Save
                        </button>

                        <Link
                            to="/admin/blocked-slots"
                            className="delete-btn text-decoration-none"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}