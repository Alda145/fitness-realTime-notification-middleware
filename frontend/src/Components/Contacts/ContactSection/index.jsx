import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
    FaFirefoxBrowser,
    FaChevronCircleRight,
    FaPlayCircle,
} from "react-icons/fa";

import contactBanner from "../../../images/contactBanner.png";
import { useTranslation } from "react-i18next";
import "./index.css";

export default function ContactSection() {
    const { t } = useTranslation();

    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [sendEmailStatus, setSendEmailStatus] = useState(false);

    const handleChange = (event) => {
        const { value, name } = event.target;
        // console.log("value", value)
        // console.log("name", name)
        setForm((prevState) => {
            return { ...prevState, [name]: value };
        });

    }

    const sendEmail = async (event) => {
        event.preventDefault();
        console.log("form", form);
        const result = await axios.post("http://localhost:3000/sendEmail/post", form);
        console.log("result", result.data);
        if (result.status === 201) {
            setSendEmailStatus(true); 
            }

    }

    return (
        <section className="py-5 bg-light">
            <Container>
                <Row className="g-5 align-items-stretch ">

                    {/* LEFT SIDE */}
                    <Col lg={6} className="d-flex">
                        <div className="w-100">
                            <span className="text-danger fw-bold">{t("contactSection.title")}</span>

                            <h1 className="fw-bold mt-2 mb-3">
                                {t("contactSection.subtitle")}
                            </h1>

                            <p className="text-muted">
                                {t("contactSection.description")}
                                <span className="text-danger fw-bold">{t("contactSection.download")}</span>
                            </p>

                            {/* INFO */}
                            <Row className="mt-4 g-4">

                                <Col md={6} className="d-flex align-items-start gap-3">
                                    <FaMapMarkerAlt size={22} className="text-danger mt-1" />
                                    <div>
                                        <h6 className="fw-bold mb-1">{t("contactSection.adress")}</h6>
                                        <p className="text-muted small mb-0">123 street New York</p>
                                    </div>
                                </Col>

                                <Col md={6} className="d-flex align-items-start gap-3">
                                    <FaEnvelope size={22} className="text-danger mt-1" />
                                    <div>
                                        <h6 className="fw-bold mb-1">{t("contactSection.mailUs")}</h6>
                                        <p className="text-muted small mb-0">info@example.com</p>
                                    </div>
                                </Col>

                                <Col md={6} className="d-flex align-items-start gap-3">
                                    <FaPhoneAlt size={22} className="text-danger mt-1" />
                                    <div>
                                        <h6 className="fw-bold mb-1">{t("contactSection.telephone")}</h6>
                                        <p className="text-muted small mb-0">(+012) 3456 7890 123</p>
                                    </div>
                                </Col>

                                <Col md={6} className="d-flex align-items-start gap-3">
                                    <FaFirefoxBrowser size={22} className="text-danger mt-1" />
                                    <div>
                                        <h6 className="fw-bold mb-1">{t("contactSection.sito")}</h6>
                                        <p className="text-muted small mb-0">(+012) 3456 7890</p>
                                    </div>
                                </Col>
                            </Row>

                            {/* SOCIAL */}
                            <div className="d-flex gap-3 mt-4">
                                <div className="social-btn">
                                    facebook <FaChevronCircleRight />
                                </div>

                                <div className="social-btn">
                                    twitter <FaChevronCircleRight />
                                </div>

                                <div className="social-btn">
                                    instagram <FaChevronCircleRight />
                                </div>
                            </div>

                            {/* JOIN TEAM CARD */}
                            <div className="join-card mt-5 p-4 border position-relative overflow-hidden"
                                style={{
                                    background:
                                        "linear-gradient(rgba(255,245,225,0.2), rgba(12,24,68,0.1), rgba(200,0,54,0.3))",
                                }}
                            >

                                <div style={{ maxWidth: "60%" }}>
                                    <h2 className="fw-bold">
                                        {t("contactSection.join")}
                                    </h2>

                                    <p className="fw-semibold">
                                        {t("contactSection.website")} <FaPlayCircle className="text-danger ms-2" />
                                    </p>
                                </div>

                                <Image src={contactBanner} className="girl-img" />
                            </div>
                        </div>
                    </Col>

                    {/* RIGHT SIDE FORM */}
                    <Col lg={6} className="d-flex">
                        <div className="w-100">
                            <div className="contact-form p-5">
                                <h2 className="text-white fw-bold mb-4">
                                    {t("contactSection.getInTouch")}
                                </h2>
                                <Form onSubmit={sendEmail} className="formClass">
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Control
                                                placeholder={t("contactSection.name")}
                                                className="form-skew"
                                                name="name"
                                                type="text"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Control
                                                placeholder={t("contactSection.email")}
                                                className="form-skew"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control
                                                placeholder={t("contactSection.phone")}
                                                className="form-skew"
                                                name="phone"
                                                type="number"
                                                value={form.phone}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control
                                                placeholder={t("contactSection.subject")}
                                                className="form-skew"
                                                type="text"
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                placeholder={t("contactSection.message")}
                                                name="message"
                                                type="text"
                                                value={form.message}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <Button className="w-100 py-3 fw-bold send-btn" type="submit"> {t("contactSection.sendMessage")}</Button>
                                        </Col>
                                    </Row>
                                </Form>

                                {
                                    sendEmailStatus && (<h4 style={{ color: "white" }}> {t("contactSection.messageSucces")}</h4>)
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}