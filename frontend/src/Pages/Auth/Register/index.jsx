import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaDumbbell } from "react-icons/fa";
import './index.css'
import { useState } from "react";
import { useUserContext } from "../../../Context/User";



export default function Register({ show, handleClose,handleShowLogin  }) {
    const { register } = useUserContext()

    const [values, setValues] = useState(
        {
            name: "",
            lastname: "",
            email: "",
            password: ""
        }
    )

    const handleChange = (event) => {
        console.log("eventi eshte :", event);
        const { name, value } = event.target
        console.log("event.target eshte :", event.target)
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await register(values);

            if (result?.status === 201) {
                console.log("REGISTER SUCCESS:", result);

                setValues({
                    name: "",
                    lastname: "",
                    email: "",
                    password: ""
                }); // pastron input-et

                handleClose(); // mbyll modalin vetëm kur është sukses
            }

        } catch (error) {
            console.log("REGISTER ERROR:", error);
        }

    };
    const openLogin = () => {
        handleClose();
        if (handleShowLogin) {
            handleShowLogin();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
                <Modal.Title className="fw-bold fs-3 text-dark">
                    Create Account
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 pb-4 pt-2">
                <div className="bg-dark-blue text-white rounded-4 p-4 mb-4">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-circle bg-danger"
                            style={{ width: "50px", height: "50px" }}
                        >
                            <FaDumbbell />
                        </div>
                        <div>
                            <h5 className="mb-1 fw-bold">Join Fitness Club</h5>
                            <p className="mb-0 text-light small">
                                Register now and start building your strongest version.
                            </p>
                        </div>
                    </div>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Label className="fw-semibold text-dark">
                                Name
                            </Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <FaUser className="text-danger" />
                                </span>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="border-start-0 py-2"
                                />
                            </div>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Label className="fw-semibold text-dark">
                                Lastname
                            </Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <FaUser className="text-danger" />
                                </span>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    placeholder="Enter your lastname"
                                    className="border-start-0 py-2"
                                />
                            </div>
                        </Col>

                        <Col xs={12} className="mb-3">
                            <Form.Label className="fw-semibold text-dark">
                                Email
                            </Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <FaEnvelope className="text-danger" />
                                </span>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="border-start-0 py-2"
                                />
                            </div>
                        </Col>

                        <Col xs={12} className="mb-4">
                            <Form.Label className="fw-semibold text-dark">
                                Password
                            </Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <FaLock className="text-danger" />
                                </span>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="border-start-0 py-2"
                                />
                            </div>
                        </Col>
                    </Row>

                    <Button
                        type="submit"
                        variant="danger"
                        className="w-100 fw-bold py-2 rounded-3"
                    >
                        Register Now
                    </Button>
                </Form>

                <div className="text-center mt-4">
                    <span className="text-muted">Do you have an account? </span>
                    <Button
                        variant="link"
                        className="p-0 text-danger text-decoration-none fw-bold"
                        onClick={openLogin}
                    >
                        Login
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}