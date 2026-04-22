import React from "react";
import { Container, Row, Col, Carousel, Image } from "react-bootstrap";
import { FaQuoteLeft } from "react-icons/fa";
import "./index.css";
import testimonial1 from '../../../images/testimonial1.jpg'
import testimonial2 from '../../../images/testimonial2.jpg'
import testimonial3 from '../../../images/testimonial3.jpg'
import { useTranslation } from "react-i18next";

const testimonials = [
    {
        img: testimonial1,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        name: "John Smith",
        role: "Fitness Trainer"
    },
    {
        img: testimonial2,
        text: "Quo deleniti ratione similique eaque blanditiis fugit voluptas.",
        name: "Maria Brown",
        role: "Gym Member"
    },
    {
        img: testimonial3,
        text: "Aliquid laboriosam, molestias nihil dignissimos saepe minima. Doloremque, officia.",
        name: "David Lee",
        role: "Athlete"
    }
];

const Testimonials = () => {
    const { t } = useTranslation();
    return (
        <section className="testimonial-section py-5 text-white">
            <Container>
                {/* Title */}
                <Row className="justify-content-center text-center mb-5">
                    <Col lg={8}>
                        <h6 className="text-danger text-uppercase fw-bold mb-2">
                            {t("testimonials.title")}
                        </h6>
                        <h2 className="fw-bold">  {t("testimonials.subtitle")}</h2>
                    </Col>
                </Row>

                {/* Carousel */}
                <Carousel indicators={false}>
                    {testimonials.map((item, index) => (
                        <Carousel.Item key={index}>
                            <Row className="justify-content-center">
                                <Col md={8} lg={6} className="text-center">

                                    {/* Quote Icon */}
                                    <FaQuoteLeft className="display-3 text-danger mb-4" />

                                    {/* Text */}
                                    <p className="fs-5">
                                        {item.text}
                                    </p>

                                    {/* Image */}
                                    <Image
                                        src={item.img}
                                        roundedCircle
                                        className="my-3 border border-3 border-danger"
                                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                    />

                                    {/* Name */}
                                    <h5 className="fw-bold mb-0">{item.name}</h5>
                                    <small className="text-light">{item.role}</small>

                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default Testimonials;