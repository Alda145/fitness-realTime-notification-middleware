import { useState } from "react";
import i18n from '../i18n';
import { Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBars } from "react-icons/fa6";
import { FaHandRock, FaSearch, FaTimes } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import Register from '../Pages/Auth/Register';
import Login from '../Pages/Auth/Login';
import { useUserContext } from "../Context/User";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./index.css";

export default function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { user, logout } = useUserContext();
    const [open, setOpen] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [resultsCount, setResultsCount] = useState(0);

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);

    const handleShowRegister = () => setShowRegister(true);
    const handleCloseRegister = () => setShowRegister(false);



    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    const handleChange = async (e) => {
        console.log("event is :", e)
        console.log("event.target is :", e.target)
        const value = e.target.value;
        console.log("value is :", value)
        setSearchTerm(value);
        if (!value.trim()) {
            setResultsCount(0);
            return;
        }
        try {
            const coursesRes = await axios.get("http://localhost:3000/courses");
            const trainersRes = await axios.get("http://localhost:3000/trainers");
            console.log("courses are :", coursesRes)
            console.log("trainers are :", trainersRes)
            const courses = coursesRes.data;
            const trainers = trainersRes.data;

            const searchValue = value.toLowerCase();

            const filteredCourses = courses.filter((course) => {
                const text = `
                ${course.title || ""}
                ${course.description || ""}
                ${course.category || ""}
                ${course.level || ""}
                ${course.trainer?.name || ""}
            `.toLowerCase();
                const filtercourse = text.includes(searchValue)
                return filtercourse;
            });
            console.log("filtered courses: ", filteredCourses)

            const filteredTrainers = trainers.filter((trainer) => {
                const text = `
                ${trainer.name || ""}
                ${trainer.email || ""}
                ${trainer.phone || ""}
                ${trainer.speciality || ""}
                ${trainer.description || ""}
            `.toLowerCase();
                const filtertrainer = text.includes(searchValue)
                return filtertrainer;
            });
            console.log("filteredTrainers: ", filteredTrainers)
            setResultsCount(filteredCourses.length + filteredTrainers.length);
        } catch (err) {
            console.error("Search error:", err);
        }
    };
    const handleSearch = () => {
        if (!searchTerm.trim()) return;

        setShowSearch(false);
        const value = searchTerm.trim();
        navigate(`/search-results?q=${value}`);
    };
    return (
        <>
            {/*  TOPBAR */}
            <div className="topbar">
                <Container className="d-flex justify-content-between align-items-center flex-wrap py-1">

                    <div className="d-flex gap-3 align-items-center top-left">
                        <span><FaEnvelope /> example@gmail.com</span>
                        <span><FaClock /> Mon - Sat: 8.00 am-7.00 pm</span>
                    </div>

                    <div className="d-flex gap-3 align-items-center top-right flex-wrap">
                        {user?.id ? (
                            <>
                                <span className="me-2">Welcome, {user.name}</span>
                                <span
                                    onClick={logout}
                                    style={{ cursor: "pointer" }}
                                    className="text-danger fw-bold"
                                >
                                    Logout
                                </span>
                            </>
                        ) : (
                            <>
                                <span onClick={handleShowLogin} style={{ cursor: "pointer" }}> {t("common.login")}</span>
                                <span className="divider">\</span>
                                <span onClick={handleShowRegister} style={{ cursor: "pointer" }}> {t("common.register")}</span>
                            </>
                        )}
                        <Login
                            show={showLogin}
                            handleClose={handleCloseLogin}
                            handleShowRegister={handleShowRegister}

                        />
                        <Register show={showRegister} handleClose={handleCloseRegister} handleShowLogin={handleShowLogin} />
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                        <div className="language-switcher">
                            <Button variant="outline-danger" onClick={() => changeLanguage('it')}>it</Button>
                            <span>\</span>
                            <Button variant="outline-danger" onClick={() => changeLanguage('en')}>en</Button>
                            <span>\</span>
                            <Button variant="outline-danger" onClick={() => changeLanguage('es')}>es</Button>
                        </div>
                    </div>

                </Container>
            </div>

            {/* MAIN NAV */}
            <div className="nav-bg position-relative">
                <Container className="d-flex align-items-center">

                    {/* LOGO */}
                    <div className="logo d-flex align-items-center">
                        <FaHandRock className="me-2" />
                        Fitness
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="menu-shape d-none d-md-block">
                        <Nav className="menu-links">
                            <Nav.Link as={NavLink} to="/" end className="nav-item-link" >{t("common.home")}</Nav.Link>
                            <Nav.Link as={NavLink} to="/about" className="nav-item-link">{t("common.about")}</Nav.Link>
                            <Nav.Link as={NavLink} to="/courses" className="nav-item-link">{t("common.courses")}</Nav.Link>
                            <Nav.Link as={NavLink} to="/blogs" className="nav-item-link">{t("common.blog")}</Nav.Link>
                            <NavDropdown title={t("common.page")} id="pages-dropdown">

                                <NavDropdown.Item as={NavLink} to="/features" className="nav-item-link">
                                    {t("common.feature")}
                                </NavDropdown.Item>

                                <NavDropdown.Item as={NavLink} to="/testimonial" className="nav-item-link">
                                    {t("common.testimonial")}
                                </NavDropdown.Item>

                                <NavDropdown.Item as={NavLink} to="/team" className="nav-item-link">
                                    {t("common.team")}
                                </NavDropdown.Item>

                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/contact" className="nav-item-link"> {t("common.contact")}</Nav.Link>
                        </Nav>
                    </div>

                    {/* ACTIONS */}
                    <div className="ms-auto d-flex align-items-center gap-2">

                        <div className="search-box d-none d-md-block" onClick={() => setShowSearch(true)}>
                            <span><FaSearch /></span>
                        </div>

                        <Button className="quote-btn d-none d-md-block">
                            <span>{t("common.price")}</span>
                        </Button>

                        {/* MOBILE BUTTON */}
                        <button
                            className="mobile-toggle d-md-none"
                            onClick={() => setOpen(!open)}
                        >
                            <FaBars />
                        </button>
                    </div>
                </Container>

                {/* MOBILE MENU */}
                <div className={`mobile-menu ${open ? "show" : ""}`}>
                    <Nav className="flex-column menu-mobile-links">
                        <Nav.Link as={NavLink} to="/" className="nav-item-link">{t("common.home")}</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" className="nav-item-link">{t("common.about")}</Nav.Link>
                        <Nav.Link as={NavLink} to="/courses" className="nav-item-link">{t("common.courses")}</Nav.Link>
                        <Nav.Link as={NavLink} to="/blogs" className="nav-item-link">{t("common.blog")}</Nav.Link>
                        <NavDropdown title="Pages" id="pages-dropdown" className="dropdown-menu">

                            <NavDropdown.Item as={NavLink} to="/features" className="nav-item-link">
                                {t("common.feature")}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={NavLink} to="/testimonial" className="nav-item-link">
                                {t("common.testimonial")}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={NavLink} to="/team" className="nav-item-link">
                                {t("common.team")}
                            </NavDropdown.Item>

                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/contact" className="nav-item-link"> {t("common.contact")}</Nav.Link>
                    </Nav>

                    <div className="mobile-search">
                        <FaSearch />
                    </div>

                    <Button className="quote-btn w-100 mt-3">
                        <span>{t("common.price")}</span>
                    </Button>
                </div>
            </div>
            {showSearch && (
                <div className="search-overlay">
                    <div className="search-overlay-header">
                        <h5>Search by keyword</h5>
                        <button
                            className="search-overlay-close"
                            onClick={() => setShowSearch(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="search-overlay-body">
                        <div className="search-overlay-form">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="keywords"
                                    className="search-overlay-input"
                                    value={searchTerm}
                                    onChange={handleChange}
                                />

                                {searchTerm && (
                                    <button
                                        type="button"
                                        className="clear-search-btn"
                                        onClick={() => setSearchTerm("")}
                                    >
                                        <FaTimes />
                                    </button>
                                )}

                            </div>

                            <button className="search-overlay-btn" onClick={handleSearch}>
                                <FaSearch />
                            </button>

                        </div>
                        {searchTerm && (
                            <p className="search-result-message"

                                onClick={() => {
                                    if (!searchTerm.trim()) return;
                                    navigate(`/search-results?q=${searchTerm}`);
                                    setShowSearch(false);
                                }}>
                                {resultsCount > 0
                                    ? `U gjetën ${resultsCount} rezultate`
                                    : "Nuk u gjet asnjë rezultat"}
                            </p>
                        )}

                    </div>

                </div>
            )}
        </>
    );
}