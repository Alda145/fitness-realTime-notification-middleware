import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./index.css";
import aboutSection from '../../../images/aboutSection.png'
import { FaRocket } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import AppointmentModal from '../../../Components/Appointment';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";




const AboutSection = () => {
    const { t } = useTranslation();

    const [showAppointment, setShowAppointment] = useState(false);
    const handleShow = () => setShowAppointment(true);
    // const handleClose = () => setShow(false);

    return (
        <section className="about-section position-relative overflow-hidden  text-white py-5">
            <Container>
                <Row className="align-items-center g-5">
                    {/* TEXT */}
                    <Col xl={6} lg={6} className="mb-5 mb-lg-0 z-2">

                        <span className="text-color-about  fw-bold"> <Trans i18nKey="aboutSection.subtitle"><small>About Fitness Center</small></Trans></span>

                        <h1 className="fw-bold display-5 my-3">
                            {t("aboutSection.title")}
                        </h1>

                        <p className="text-secondary">
                            {t(aboutSection.title)}
                        </p>

                        <div className="d-flex gap-2 my-4">
                            <Button className="ourMission"><span>{t("aboutSection.mission")}</span></Button>
                            <Button className="ourVision"><span>{t("aboutSection.vision")}</span></Button>
                            <Button className="ourGoal"><span>{t("aboutSection.goal")}</span></Button>
                        </div>
                        <div className="border-bottom"></div>
                        <div className="d-flex align-items-center gap-app mt-2">
                            <FaRocket className="rocket" />
                            <div>
                                <div className="text-secondary ">{t("aboutSection.description")}
                                </div>

                            </div>
                        </div>
                        <div className="border-bottom"></div>

                        {<div className="d-flex align-items-center gap-app mt-4">
                            <Button variant="" size="lg" className="makeAppointment"
                                onClick={handleShow}
                            >
                                <span>{t("aboutSection.appointmentButton")}</span>
                            </Button>
                            <AppointmentModal
                                show={showAppointment}
                                handleClose={() => setShowAppointment(false)}
                            />
                            <div className="d-flex align-items-center gap-call">
                                <div className="phone p-2">
                                    <span><FaPhoneAlt className="fs-2" /></span>

                                </div>
                                <div>
                                    <div className="text-secondary small">{t("aboutSection.callText")}</div>
                                    <div className="fw-bold">{t("aboutSection.phoneLabel")} + 0123 456 7890</div>
                                </div>
                            </div>

                        </div>}

                    </Col>

                    {/* IMAGE */}
                    <Col xl={6} lg={6} className="text-center imageCouple d-flex">
                        <img
                            src={aboutSection}
                            alt="about"
                            className="img-fluid position-relative z-1 about-image"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutSection;