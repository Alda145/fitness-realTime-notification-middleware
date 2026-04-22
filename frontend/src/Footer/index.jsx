import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import "./index.css";
import work1 from '../images/work1.jpg'
import work2 from '../images/work2.jpg'
import work3 from '../images/work3.jpg'
import work4 from '../images/work4.jpg'
import work5 from '../images/work5.jpg'
import work6 from '../images/work6.jpg'
import work7 from '../images/work7.jpg'
import work8 from '../images/work8.jpg'
import work9 from '../images/work9.jpg'
import work10 from '../images/work10.jpg'
import work11 from '../images/work11.jpg'
import work12 from '../images/work12.jpg'
import { useTranslation } from "react-i18next";




const recentWorks = [
    { id: 1, img: work1 },
    { id: 2, img: work2 },
    { id: 3, img: work3 },
    { id: 4, img: work4 },
    { id: 5, img: work5 },
    { id: 6, img: work6 },
    { id: 7, img: work7 },
    { id: 8, img: work8 },
    { id: 9, img: work9 },
    { id: 10, img: work10 },
    { id: 11, img: work11 },
    { id: 12, img: work12 },
];

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="footer text-white pt-5 mt-5">
            <Container>
                <Row className="g-5">

                    {/* FITNESS INFO */}
                    <Col lg={4} md={6}>
                        <h3 className="fw-bold text-uppercase mb-3">
                            <span className="text-danger">Fit</span>ness
                        </h3>

                        <p className="text-light small">
                            {t("footer.description")}
                        </p>

                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="#" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="#" className="social-icon">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </Col>

                    {/* QUICK LINKS */}
                    <Col lg={2} md={6}>
                        <h5 className="fw-bold text-uppercase mb-4"> {t("footer.quickLinks")}</h5>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><a href="#" className="footer-link"> {t("footer.home")}</a></li>
                            <li className="mb-2"><a href="#" className="footer-link"> {t("footer.about")}</a></li>
                            <li className="mb-2"><a href="#" className="footer-link"> {t("footer.services")}</a></li>
                            <li className="mb-2"><a href="#" className="footer-link"> {t("footer.contact")}</a></li>
                        </ul>
                    </Col>

                    {/* RECENT WORKS */}
                    {/* RECENT WORKS */}
                    <Col lg={3} md={6}>
                        <h5 className="fw-bold text-uppercase mb-4">{t("footer.recentWorks")}</h5>

                        <Row className="g-2">
                            {recentWorks.map((work) => (
                                <Col key={work.id} xs={3}>
                                    <div className="work-img position-relative">
                                        <Image
                                            src={work.img}
                                            className="img-fluid rounded"
                                            height={'35px'}
                                            width={'35px'}
                                        />
                                        <div className="overlay"></div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* NEWSLETTER */}
                    <Col lg={3} md={6}>
                        <h5 className="fw-bold text-uppercase mb-4">{t("footer.newsletter")}</h5>

                        <p className="small text-light">
                            {t("footer.descripionNewsletter")}
                        </p>

                        <form className="d-flex">
                            <input
                                type="email"
                                className="form-control rounded-0"
                                placeholder={t("footer.email")}
                            />
                            <button className="btn btn-danger rounded-0 px-4">
                                {t("footer.subscribe")}
                            </button>
                        </form>

                    </Col>

                </Row>

                {/* Bottom Bar */}
                <div className="text-center border-top border-secondary mt-5 pt-3 small">
                    © {new Date().getFullYear()} Fitness. {t("footer.rights")}
                </div>
            </Container>
        </footer>
    );
};

export default Footer;