import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaClock,
    FaDumbbell,
    FaUser,
    FaGraduationCap,
    FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/User";

import "./index.css";

export default function UserProfile() {
    const navigate = useNavigate();

    const {
        user,
        getUserEnrollments,
        isAuthChecked
    } = useUserContext();

    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadEnrollments = async () => {

            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {

                const data = await getUserEnrollments(user.id);

                setEnrollments(data || []);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        if (isAuthChecked) {
            loadEnrollments();
        }

    }, [user?.id, isAuthChecked]);

    if (!isAuthChecked || loading) {

        return (
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <Spinner animation="border" />
                <p className="mt-3">Loading your fitness profile...</p>
            </div>
        );
    }

    return (
        <main className="profile-page-bg">

            <section className="user-hero text-white">

                <Container>

                    <Row className="align-items-center g-4">

                        <Col lg={7}>

                            <p className="text-uppercase fw-bold user-accent mb-2">
                                Member Dashboard
                            </p>

                            <h1 className="display-4 fw-bold text-white section-title">
                                Welcome back,{" "}
                                <span className="user-accent">
                                    {user?.name}
                                </span>
                            </h1>

                            <p className="section-text">
                                Here you can see all fitness classes you have registered for.
                            </p>

                        </Col>

                        <Col lg={5}>

                            <Card className="hero-card text-white border-0 rounded-4">

                                <Card.Body className="p-4">

                                    <Row className="g-4">

                                        <Col md={6} className="d-flex align-items-center gap-3">

                                            <div className="icon-box">
                                                <FaGraduationCap />
                                            </div>

                                            <div>
                                                <h3 className="fw-bold mb-0">
                                                    {enrollments.length}
                                                </h3>

                                                <small>
                                                    Registered Courses
                                                </small>
                                            </div>

                                        </Col>

                                        <Col md={6} className="d-flex align-items-center gap-3">

                                            <div className="icon-box">
                                                <FaUser />
                                            </div>

                                            <div>
                                                <h3 className="fw-bold mb-0 text-capitalize">
                                                    {user?.role}
                                                </h3>

                                                <small>
                                                    Account Role
                                                </small>
                                            </div>

                                        </Col>

                                    </Row>

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </Container>

            </section>

            <Container className="profile-content">

                <Row className="g-4 mb-5">

                    <Col lg={4} md={6}>

                        <Card className="stat-card h-100">

                            <Card.Body className="p-4 d-flex align-items-center gap-3">

                                <div className="icon-box icon-light">
                                    <FaDumbbell />
                                </div>

                                <div>

                                    <h4 className="fw-bold mb-0">
                                        {enrollments.length}
                                    </h4>

                                    <p className="mb-0 text-muted">
                                        Total Classes
                                    </p>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col lg={4} md={6}>

                        <Card className="stat-card h-100">

                            <Card.Body className="p-4 d-flex align-items-center gap-3">

                                <div className="icon-box icon-light">
                                    <FaCalendarAlt />
                                </div>

                                <div>

                                    <h4 className="fw-bold mb-0">
                                        {enrollments[0]?.course?.day || "-"}
                                    </h4>

                                    <p className="mb-0 text-muted">
                                        Next Training Day
                                    </p>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col lg={4} md={12}>

                        <Card className="stat-card h-100">

                            <Card.Body className="p-4 d-flex align-items-center gap-3">

                                <div className="icon-box icon-light">
                                    <FaClock />
                                </div>

                                <div>

                                    <h4 className="fw-bold mb-0">
                                        {enrollments[0]?.course?.time || "-"}
                                    </h4>

                                    <p className="mb-0 text-muted">
                                        Training Time
                                    </p>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                    <div>

                        <p className="text-uppercase fw-bold user-accent mb-1">
                            My Courses
                        </p>

                        <h2 className="fw-bold mb-0">
                            Your registered classes
                        </h2>

                    </div>

                    <Button
                        className="btn-accent border-0 px-4 py-2"
                        onClick={() => navigate("/courses")}
                    >
                        Explore More
                        <FaArrowRight className="ms-2" />
                    </Button>

                </div>

                {enrollments.length === 0 ? (

                    <Card className="text-center p-5 border-0 rounded-4 shadow-sm">

                        <Card.Body>

                            <FaDumbbell className="display-4 user-accent mb-3" />

                            <h3 className="fw-bold">
                                No registered courses yet
                            </h3>

                            <p className="text-muted">
                                Start exploring our courses and register for your first class.
                            </p>

                            <Button
                                className="btn-accent border-0"
                                onClick={() => navigate("/courses")}
                            >
                                View Courses
                            </Button>

                        </Card.Body>

                    </Card>

                ) : (

                    <Row className="g-4 pb-5">

                        {enrollments.map((item) => (

                            <Col lg={4} md={6} key={item.id}>

                                <Card className="course-card h-100">

                                    <div className="position-relative">

                                        {item.course?.icon ? (

                                            <Card.Img
                                                variant="top"
                                                src={`http://localhost:3000${item.course.icon}`}
                                                alt={item.course?.title}
                                                className="course-img"
                                            />

                                        ) : (

                                            <div className="course-img d-flex align-items-center justify-content-center">

                                                <FaDumbbell className="display-4 user-accent" />

                                            </div>
                                        )}

                                        <Badge className="position-absolute top-0 start-0 m-3 bg-accent">
                                            Active
                                        </Badge>

                                    </div>

                                    <Card.Body>

                                        <Card.Title>
                                            {item.course?.title}
                                        </Card.Title>

                                        <Card.Text>
                                            {item.course?.description}
                                        </Card.Text>

                                        <div className="course-meta">

                                            <span>
                                                <FaCalendarAlt className="me-1" />
                                                {item.course?.day}
                                            </span>

                                            <span>
                                                <FaClock className="me-1" />
                                                {item.course?.time}
                                            </span>

                                        </div>

                                        <div className="trainer-box">

                                            {item.course?.trainer?.image && (

                                                <img
                                                    src={`http://localhost:3000${item.course.trainer.image}`}
                                                    alt={item.course.trainer.name}
                                                    className="rounded-circle trainer-img"
                                                />
                                            )}

                                            <div>

                                                <small className="text-muted">
                                                    Trainer
                                                </small>

                                                <h6 className="fw-bold mb-0">
                                                    {item.course?.trainer?.name || "No trainer"}
                                                </h6>

                                            </div>

                                        </div>

                                    </Card.Body>

                                </Card>

                            </Col>

                        ))}

                    </Row>

                )}

            </Container>

        </main>
    );
}