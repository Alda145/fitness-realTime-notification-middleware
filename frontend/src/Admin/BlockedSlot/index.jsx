import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlockedSlotContext } from "../../Context/BlockedSlot";

export default function BlockedSlots() {
    const { blockedSlots, getBlockedSlots, deleteBlockedSlot } = useBlockedSlotContext();

    useEffect(() => {
        getBlockedSlots();
    }, []);

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this blocked slot?");
        if (result) {
            await deleteBlockedSlot(id);
        }
    };

    return (
        <div className="trainer-page">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Blocked Slots</h2>
                    <p className="page-subtitle">Manage all blocked slots from here.</p>
                </div>

                <Link to="/admin/blocked-slots/create" className="add-btn">
                    Add Blocked Slot
                </Link>
            </div>

            <div className="table-card"> 
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blockedSlots && blockedSlots.length > 0 ? (
                            blockedSlots.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{new Date(item.startTime).toLocaleString()}</td>
                                    <td>{new Date(item.endTime).toLocaleString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link
                                                to={`/admin/blocked-slots/edit/${item.id}`}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="delete-btn"
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
                                <td colSpan="4" className="empty-row">
                                    No blocked slots found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}