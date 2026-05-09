import { useState } from 'react';
import Lottie from "lottie-react";
import { useUserContext } from "../../../Context/User";
import { Button, Modal } from 'react-bootstrap/';
import aerobieAnimation from "../../../assets/sportsAnimation/aerobie.json";
import boxingAnimation from "../../../assets/sportsAnimation/boxing.json";
import cardioAnimation from "../../../assets/sportsAnimation/cardio.json";
import gymAnimation from "../../../assets/sportsAnimation/gymfitnessClass.json";
import powerliftingAnimation from "../../../assets/sportsAnimation/powerLifting.json";
import defaultAnimation from "../../../assets/sportsAnimation/default.json";

import "./modal.css";
const ModalCourses = ({ show, handleClose, singleCourse }) => {

    const { user, registerToCourse } = useUserContext();
    const [enrollment, setEnrollment] = useState({});


    // ANIMACION
    const courseTitle = singleCourse?.title?.toLowerCase();

    let selectedAnimation = defaultAnimation;

    if (courseTitle?.includes("aerobics")) {
        selectedAnimation = aerobieAnimation;
    }

    else if (courseTitle?.includes("boxing")) {
        selectedAnimation = boxingAnimation;
    }

    else if (courseTitle?.includes("cardio")) {
        selectedAnimation = cardioAnimation;
    }

    else if (courseTitle?.includes("gym")) {
        selectedAnimation = gymAnimation;
    }

    else if (courseTitle?.includes("power")) {
        selectedAnimation = powerliftingAnimation;
    }



    const handleRegisterToCourses = async () => {
        try {
            const result = await registerToCourse(user.id, singleCourse.id);
            console.log(result)
            if (result.status === 200) {
                setEnrollment({ message: result.message, status: result.status });
            }
            return
        } catch (error) {
            console.log(error);
            setEnrollment({ message: error.message, status: error.statusCode });
        }
    }

    const closeModal = () => {
        setEnrollment({ message: "", status: "" });
        handleClose();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={closeModal}
                animation={false}
                centered
                size="lg"
                dialogClassName="courseDetailsModal"
            >
                <Modal.Header closeButton className="courseModalHeader">
                    <div>
                        <Modal.Title className="courseModalTitle">
                            {singleCourse?.title}
                        </Modal.Title>

                        <p className="courseModalSubtitle mb-0">
                            Course details and trainer information
                        </p>
                    </div>
                </Modal.Header>

                <Modal.Body className="courseModalBody">
                    <div className="row g-4 align-items-center">

                        {/* LEFT SIDE */}
                        <div className="col-md-5">
                            <div className="courseAnimationBox">

                                {selectedAnimation && (
                                    <Lottie
                                        animationData={selectedAnimation}
                                        loop={true}
                                    />
                                )}

                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="col-md-7">

                            {/* DESCRIPTION */}
                            <p className="courseDescription">
                                {singleCourse?.description}
                            </p>

                            {/* COURSE INFO */}
                            <div className="courseInfoBox mb-4">

                                <div className="courseInfoItem">
                                    <span>Day</span>
                                    <strong>{singleCourse?.day}</strong>
                                </div>

                                <div className="courseInfoItem">
                                    <span>Time</span>
                                    <strong>{singleCourse?.time}</strong>
                                </div>

                            </div>

                            {/* TRAINER */}
                            <div className="trainerCard d-flex align-items-center gap-3">

                                {singleCourse?.trainer?.image && (
                                    <img
                                        src={`http://localhost:3000${singleCourse.trainer.image}`}
                                        alt={singleCourse.trainer.name}
                                        className="trainerImage"
                                    />
                                )}

                                <div>
                                    <div className="trainerName">
                                        {singleCourse?.trainer?.name}
                                    </div>

                                    <div className="trainerRole">
                                        {singleCourse?.trainer?.role}
                                    </div>
                                </div>

                            </div>

                            {/* SOCIAL LINKS */}
                            <div className="socialLinks d-flex gap-2 flex-wrap mt-4">

                                {singleCourse?.trainer?.facebook && (
                                    <a
                                        href={singleCourse.trainer.facebook}
                                        target="_blank"
                                        className="socialLink"
                                    >
                                        Facebook
                                    </a>
                                )}

                                {singleCourse?.trainer?.instagram && (
                                    <a
                                        href={singleCourse.trainer.instagram}
                                        target="_blank"
                                        className="socialLink"
                                    >
                                        Instagram
                                    </a>
                                )}

                                {singleCourse?.trainer?.linkedin && (
                                    <a
                                        href={singleCourse.trainer.linkedin}
                                        target="_blank"
                                        className="socialLink"
                                    >
                                        LinkedIn
                                    </a>
                                )}

                                {singleCourse?.trainer?.twitter && (
                                    <a
                                        href={singleCourse.trainer.twitter}
                                        target="_blank"
                                        className="socialLink"
                                    >
                                        Twitter
                                    </a>
                                )}

                            </div>

                            {/* ERROR MESSAGE */}
                            {enrollment.status === 500 && (
                                <p className="enrollmentError mt-3">
                                    {enrollment.message}
                                </p>
                            )}

                        </div>

                    </div>
                </Modal.Body>

                <Modal.Footer className="courseModalFooter">

                    <Button
                        className="registerBtn border-0"
                        onClick={handleRegisterToCourses}
                    >
                        Register to class
                    </Button>

                    <Button
                        className="closeCourseBtn border-0"
                        onClick={closeModal}
                    >
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCourses;