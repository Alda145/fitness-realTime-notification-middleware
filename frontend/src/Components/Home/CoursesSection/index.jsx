import { useEffect } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useCourseContext } from "../../../Context/Course";
import "./index.css";

import servicesImg from "../../../images/servicesImg.jpg";
import { useTranslation } from "react-i18next";

export default function CoursesSection({ showAll = false, customCourses = null  }) {
    const { t } = useTranslation();
    const { courses, getCourses } = useCourseContext();

    useEffect(() => {
        if (!customCourses) {
            getCourses();
        }
    }, []);

    // const visibleCourses = showAll ? courses : courses.slice(0, 6);
    const data = customCourses || courses;
    const visibleCourses = showAll ? data : data.slice(0, 6);

    return (
        <Container fluid className="courses py-5">
            <Container className="py-5">
                {/* TOP TEXT */}
                <div className="text-center mb-5">
                    <p className="fw-bold fs-3 ourTrainer mb-2">{t("coursesSection.title")}</p>
                    <h2 className="fw-bold fs-1 text-white ourTeam">{t("coursesSection.subtitle")}</h2>
                    <p className="text-white mx-auto" style={{ maxWidth: "700px" }}>
                        {t("coursesSection.description")}
                    </p>
                </div>

                {/* CARDS */}
                <Row className="g-4">
                    {visibleCourses.length > 0 ? (
                        visibleCourses.map((course) => (
                            <Col key={course.id} lg={4} md={6} sm={12}>
                                <Card className="border-0 bg-white bg-opacity-75 h-100 p-3">
                                    <div className="classSkew">
                                        {/* TOP ICON + TRAINER */}
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="imageIcon">
                                                <Image
                                                    src={`http://localhost:3000${course.icon}`}
                                                    alt={course.title}
                                                    width={45}
                                                    height={45}
                                                    className="imageStyle"
                                                />
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                {course.trainer?.image && (
                                                    <Image
                                                        src={`http://localhost:3000${course.trainer.image}`}
                                                        alt={course.trainer?.name}
                                                        width={50}
                                                        height={50}
                                                        roundedCircle
                                                    />
                                                )}

                                                <div className="small course-meta">
                                                    <div className="fw-bold trainer-meta-name">
                                                        {course.trainer?.name || "No Trainer"}
                                                    </div>
                                                    <div className="course-meta-line">Date: {course.day}</div>
                                                    <div className="course-meta-line">Time: {course.time}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* BODY */}
                                        <Card.Body className="p-0">
                                            <Card.Title className="fw-bold titleColor mb-3">
                                                {course.title}
                                            </Card.Title>

                                            <Card.Text className="text-muted mb-3">
                                                {course.description}
                                            </Card.Text>

                                            <div className="d-flex justify-content-between align-items-center">
                                                

                                                <Button className="readMore border-0">
                                                    <span>Read More</span>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <div className="text-center text-white">No courses found.</div>
                        </Col>
                    )}
                </Row>

                {/* MORE COURSES BUTTON - only homepage */}
                {!showAll && courses.length > 6 && (
                    <div className="text-center mt-5">
                        <a href="/courses" className="btn moreCoursesBtn">
                            <span> {t("coursesSection.moreCourses")}</span>
                        </a>
                    </div>
                )}
            </Container>
        </Container>
    );
}