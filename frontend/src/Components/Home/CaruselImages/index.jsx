import { useRef } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import carousel from "../../../images/carousel.jpg";
import header1 from "../../../images/header1.jpg";
import header2 from "../../../images/header2.jpg";
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';

import "./index.css";

const CaruselImages = () => {
    const { t } = useTranslation();
    const ref = useRef(null);

    const prevFunction = () => ref.current.prev();
    const nextFunction = () => ref.current.next();

    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${carousel})` }}
        >
            <div className="hero-overlay" />

            {/* TEXT CONTENT */}
            <Container className="hero-content">
                <Row className="align-items-center ">
                    <Col lg={7} className="text-white">
                        <h6 className="text-danger fw-bold">
                            {t("caruselImages.title")}
                        </h6>

                        <h1 className="fw-bold display-4 fontFamily ">
                            {t("caruselImages.subtitle")}
                        </h1>

                        <p className="opacity-75">
                            {t("caruselImages.paragraph")}
                        </p>

                        <div className="d-flex gap-3 mt-3">
                            <Button className="watchVideo">
                                <span>{t("common.watchVideo")}</span>
                            </Button>

                            <Button className="learnMore">
                                <span>{t("common.learnMore")}</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* SLIDER — JASHTË GRID */}
            <div className="slider-wrapper">
                <Carousel fade controls={false} indicators={false} ref={ref}>
                    <Carousel.Item>
                        <img src={header1} className="slider-img" alt="" />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src={header2} className="slider-img" alt="" />
                    </Carousel.Item>
                </Carousel>

                <div className="arrows">
                    <button onClick={prevFunction}>
                        <span className="arrow-inner">
                            <BsArrowLeft />
                        </span>
                    </button>

                    <button onClick={nextFunction}>
                        <span className="arrow-inner">
                            <BsArrowRight />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CaruselImages;