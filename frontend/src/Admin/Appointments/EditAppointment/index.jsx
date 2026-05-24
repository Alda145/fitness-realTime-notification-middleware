
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppointmentContext } from '../../../Context/Appointment';
import './index.css'

const EditAppointment = ({ show, handleClose, id }) => {

    const { appointments, updateAppointment } = useAppointmentContext()
    console.log("appointments ne edit", appointments)

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        notes: "",
        startTime: "",
        endTime: "",
        status: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) =>

        ({
            ...prev,
            [name]: value
        })
        )



    }

    useEffect(() => {

        const selectedAppointment = appointments.find((item) => item.id === id)

        console.log("the id is ", id)
        console.log("selected Appointment:", selectedAppointment)
        if (selectedAppointment) {
            setFormData({
                fullName: selectedAppointment.fullName || "",
                phone: selectedAppointment.phone || "",
                notes: selectedAppointment.notes || "",
                startTime: selectedAppointment.startTime || "",
                endTime: selectedAppointment.endTime || "",
                status: selectedAppointment.status || "",
            });
        }


    }, [id, appointments])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await updateAppointment(id, formData);
            console.log("result", result)
            if (result) {
                handleClose();
            }
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>

            <Modal show={show} onHide={handleClose}   >
                <Modal.Header closeButton>
                    <Modal.Title>Edit the row</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.notes}
                                onChange={handleChange}
                                name="notes"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Start time</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={formData.startTime}
                                onChange={handleChange}
                                name="startTime"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>End time</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={formData.endTime}
                                onChange={handleChange}
                                name="endTime"
                            />
                        </Form.Group>
                        <Form.Select name="status" value={formData.status} onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="accept">Accept</option>
                            <option value="reject">Reject</option>
                        </Form.Select>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Update appointment
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    )


}
export default EditAppointment