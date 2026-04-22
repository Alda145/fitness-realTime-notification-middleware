import React from "react";
import { Container, Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import servicesImg from '../../../images/servicesImg.jpg'
import { useTranslation } from "react-i18next";
import "./index.css";

export default function ExploreSection() {
    const { t } = useTranslation();
    return (
        <section className="explore d-flex align-items-center text-center text-white">
            <Container className="py-5">
                <h2 className="fw-bold display-5 display-md-4 mb-4">
                    {t("exploreSection.title")}
                </h2>

                <Button
                    className="d-inline-flex align-items-center gap-2 px-4 py-2 fw-semibold buttonClass"
                ><FaPlay />
                    <span>
                        {t("exploreSection.watchVideo")}
                    </span>
                   
                </Button>
            </Container>
        </section>
    );
}