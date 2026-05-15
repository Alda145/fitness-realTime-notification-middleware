import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaLock, FaDumbbell } from "react-icons/fa";
import { useUserContext } from "../../../Context/User";
import { useNavigate } from "react-router";

export default function Login({ show, handleClose, handleShowRegister }) {
    const navigate = useNavigate();
    const { login } = useUserContext();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const result = await login(values);
            console.log("login user :", result.data )
            if (result.status === 201) {
                setValues({
                    name: "",
                    lastname: "",
                    email: "",
                    password: ""
                }); // pastron input-et
                handleClose();
                if (result.data?.role === "admin" || result.data?.role === "manager") {
                    console.log("A kemi admin:", result.data?.role)
                    navigate("/admin");
                }
            }
        } catch (error) {
            console.log("error---", error);
        }
    };

    const openRegister = () => {
        handleClose();
        if (handleShowRegister) {
            handleShowRegister();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="md"
            backdrop="static"
        >
            <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
                <Modal.Title className="fw-bold fs-3 text-dark">
                    Welcome Back
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 pb-4 pt-2">
                <div
                    className="text-white rounded-4 p-4 mb-4"
                    style={{ backgroundColor: "#0e1a3a" }}
                >
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-circle bg-danger"
                            style={{ width: "50px", height: "50px" }}
                        >
                            <FaDumbbell />
                        </div>

                        <div>
                            <h5 className="mb-1 fw-bold">Login to Fitness Club</h5>
                            <p className="mb-0 text-light small">
                                Enter your email and password to continue your journey.
                            </p>
                        </div>
                    </div>
                </div>

                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
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
                    </div>

                    <div className="mb-4">
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
                    </div>

                    <Button
                        type="submit"
                        variant="danger"
                        className="w-100 fw-bold py-2 rounded-3"
                    >
                        Login Now
                    </Button>
                </Form>

                <div className="text-center mt-4">
                    <span className="text-muted">Don’t have an account? </span>
                    <Button
                        variant="link"
                        className="p-0 text-danger text-decoration-none fw-bold"
                        onClick={openRegister}
                    >
                        Register
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}