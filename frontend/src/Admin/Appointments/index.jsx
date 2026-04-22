import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAppointmentContext } from "../../Context/Appointment";
import { formatDate } from "../../helpers/dateTimeFormat";
import Button from 'react-bootstrap/Button';
import EditAppointment from './EditAppointment';

export default function Appointments() {
    const { appointments, deleteAppointment } = useAppointmentContext();
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);
    const handleShow = (id) => {

        setShow(true);
        setId(id);
    }

    const handleClose = () => setShow(false);

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this appointment?");
        if (result) {
            await deleteAppointment(id);
        }
    };
    

    return (
        <div className="trainer-page">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Appointments</h2>
                    <p className="page-subtitle">Manage all appointments from here.</p>
                </div>

                <Link to="/admin/appointments/create" className="add-btn">
                    Add Appointment
                </Link>
            </div>

            <div className="table-card">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Notes</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments && appointments.length > 0 ? (
                            appointments.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.fullName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.notes}</td>
                                    <td>{formatDate(item.startTime)}</td>
                                    <td>{formatDate(item.endTime)}</td>
                                    <td>{item.status}</td>

                                    <td>
                                        <div className="action-buttons">
                                            <Button
                                                onClick={() => { return handleShow(item.id) }}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                className="delete-btn"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="empty-row">
                                    No appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {<EditAppointment show={show} handleClose={handleClose} id={id} />}
        </div>
    );
}