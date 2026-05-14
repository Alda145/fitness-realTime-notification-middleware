import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTrainerContext } from "../../Context/Trainer";
import './index.css';

export default function Trainers() {
    const { trainers, getTrainers, deleteTrainer } = useTrainerContext();

    useEffect(() => {
        getTrainers();
    }, []);

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this trainer?");
        if (result) {
            await deleteTrainer(id);
        }
    };

    return (
        <div className="trainer-page">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Trainers</h2>
                    <p className="page-subtitle">Manage all trainers from here.</p>
                </div>

                <Link to="/admin/trainers/create" className="add-btn">
                    Add Trainer
                </Link>
            </div>

            <div className="table-card">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Facebook</th>
                            <th>Twitter</th>
                            <th>Instagram</th>
                            <th>Linkedin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trainers && trainers.length > 0 ? (
                            trainers.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img
                                            src={`http://localhost:3000${item.image}`}
                                            alt={item.name}
                                            className="table-image"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>{item.facebook}</td>
                                    <td>{item.twitter}</td>
                                    <td>{item.instagram}</td>
                                    <td>{item.linkedin}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link
                                                to={`/admin/trainers/edit/${item.id}`}
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
                                <td colSpan="8" className="empty-row">
                                    No trainers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}