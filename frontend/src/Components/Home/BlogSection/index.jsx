import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./index.css";

import feature1 from "../../../images/feature1.jpg";
import feature2 from "../../../images/feature2.jpg";
import feature3 from "../../../images/feature3.jpg";
import feature4 from "../../../images/feature4.jpg";
import { useTranslation } from "react-i18next";

const blogData = [
    { id: 1, title: "At Home Ab Workout", author: "Martin.C", date: "30 Dec 2025", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", img: feature1 },
    { id: 2, title: "Full Body Home Workout", author: "Martin.C", date: "30 Dec 2025", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", img: feature2 },
    { id: 3, title: "Cardio Blast", author: "Martin.C", date: "30 Dec 2025", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", img: feature3 },
    { id: 4, title: "Yoga Stretch", author: "Martin.C", date: "30 Dec 2025", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", img: feature4 },
];

export default function BlogSection() {
    const { t } = useTranslation();
    const [start, setStart] = useState(0);

    const cardsPerView = 3; // lg
    const visible = blogData.slice(start, start + cardsPerView);

    const next = () => {
        if (start + cardsPerView < blogData.length) {
            setStart(start + 1);
        }
    };

    const prev = () => {
        if (start > 0) {
            setStart(start - 1);
        }
    };

    return (
        <Container fluid className="blog-section py-5">
            <Container className="py-5">

                {/* heading */}
                <div className="text-center mb-5">
                    <span className="section-subtitle fw-bold fs-3">{t("blogSection.title")}</span>
                    <h2 className="section-title fs-1">{t("blogSection.subtitle")}</h2>
                    <p className="section-text">
                        {t("blogSection.description")}
                    </p>
                </div>

                {/* cards */}
                <Row className="g-4">
                    {visible.map((blog) => (
                        <Col key={blog.id} lg={4} md={6} sm={12}>
                            <Card className="blog-card h-100">
                                <Card.Img variant="top" src={blog.img} />

                                <Card.Body>
                                    <div className="blog-meta d-flex justify-content-between mb-2 classAuthor">
                                        <span>{blog.author}</span>
                                        <span>{blog.date}</span>
                                    </div>

                                    <Card.Title>{blog.title}</Card.Title>
                                    <Card.Text>{blog.description}</Card.Text>

                                    <Button className="blog-btn"><span>{t("blogSection.readMore")} →</span></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* controls poshtë */}
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
                        disabled={start + cardsPerView >= blogData.length}
                    >
                        →
                    </Button>
                </div>

            </Container>
        </Container>
    );
}