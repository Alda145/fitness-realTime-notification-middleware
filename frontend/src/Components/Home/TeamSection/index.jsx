import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { useTrainerContext } from "../../../Context/Trainer";
import { useTranslation } from "react-i18next";
import "./index.css";

export default function TeamSection({ customTrainers = null, showAll = false }) {
      const { t } = useTranslation();
    const { trainers, getTrainers } = useTrainerContext();
    const [start, setStart] = useState(0);

    const cardsPerView = 3;
    // const visible = trainers.slice(start, start + cardsPerView);
    const data = customTrainers || trainers;

    const visible = showAll? data: data.slice(start, start + cardsPerView);

    useEffect(() => {
        if (!customTrainers) {
            getTrainers();
        }
    }, []);

    const formatLink = (url) => {
        if (!url) return "#";
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return `https://${url}`;
    };

    const next = () => {
        if (start + cardsPerView < trainers.length) {
            setStart(start + 1);
        }
    };

    const prev = () => {
        if (start > 0) {
            setStart(start - 1);
        }
    };

    return (
        <section className="py-5 bg-light">
            <Container>
                {/* HEADER */}
                <div className="text-center mb-5">
                    <p className="ourTrainer fw-semibold mb-2 fw-bold fs-3">  {t("teamSection.title")}</p>
                    <h2 className="fw-bold display-6 ourTeam fs-1"> {t("teamSection.subtitle")}</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
                        {t("teamSection.description")}
                    </p>
                </div>

                {/* CARDS */}
                <Row className="g-4 justify-content-center">
                    {visible.length > 0 ? (
                        visible.map((trainer) => (
                            <Col key={trainer.id} xs={12} sm={6} lg={4}>
                                <Card className="border-0 shadow-sm team-card h-100">
                                    {/* IMAGE */}
                                    <div className="position-relative overflow-hidden team-img">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3000${trainer.image}`}
                                            alt={trainer.name}
                                        />

                                        {/* SOCIAL ICONS - show on hover */}
                                        <div className="team-socials position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                                            {trainer.facebook.trim() && (
                                                <a
                                                    href={formatLink(trainer.facebook)}
                                                    className="social-icon"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaFacebookF />
                                                </a>
                                            )}
                                            {trainer.twitter.trim() && (
                                                <a
                                                    href={formatLink(trainer.twitter)}
                                                    className="social-icon"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaTwitter />
                                                </a>
                                            )}
                                            {trainer.instagram.trim() && (
                                                <a
                                                    href={formatLink(trainer.instagram)}
                                                    className="social-icon"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaInstagram />
                                                </a>
                                            )}
                                            {trainer.linkedin.trim() && (
                                                <a
                                                    href={formatLink(trainer.linkedin)}
                                                    className="social-icon"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaLinkedinIn />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <Card.Body className="text-center">
                                        <Card.Title className="fw-bold trainerName">
                                            {trainer.name}
                                        </Card.Title>
                                        <Card.Text className="text-muted">{trainer.role}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <div className="text-center text-muted">No trainers found.</div>
                        </Col>
                    )}
                </Row>

                {/* CONTROLS */}
                {!customTrainers && trainers.length > cardsPerView && (
                    <div className="d-flex justify-content-center gap-3 mt-5">
                        <Button
                            variant="outline-dark"
                            className="nav-btn"
                            onClick={prev}
                            disabled={start === 0}
                        >
                            ←
                        </Button>

                        <Button
                            variant="dark"
                            className="nav-btn"
                            onClick={next}
                            disabled={start + cardsPerView >= trainers.length}
                        >
                            →
                        </Button>
                    </div>
                )}
            </Container>
        </section>
    );
}