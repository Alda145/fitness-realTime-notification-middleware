import { useState } from 'react';
import { useUserContext } from "../../../Context/User";
import { Button, Modal } from 'react-bootstrap/';
import "./modal.css";
const ModalCourses = ({ show, handleClose, singleCourse }) => {

    const { user, registerToCourse } = useUserContext();
    const [enrollment, setEnrollment] = useState({});

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
        setEnrollment({ message: "", status:"" });
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={closeModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{singleCourse.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="courseModalBody">

                    {/* DESCRIPTION */}
                    <p className="mb-4">{singleCourse?.description}</p>

                    {/* COURSE INFO */}
                    <div className="mb-4">
                        <p><strong>Day:</strong> {singleCourse?.day}</p>
                        <p><strong>Time:</strong> {singleCourse?.time}</p>

                        {enrollment.status === 500 ? <p>{enrollment.message}</p> : ""}
                    </div>

                    {/* TRAINER */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                        {singleCourse?.trainer?.image && (
                            <img
                                src={`http://localhost:3000${singleCourse.trainer.image}`}
                                alt={singleCourse.trainer.name}
                                width={70}
                                height={70}
                                className="rounded-circle"
                                style={{ objectFit: "cover" }}
                            />
                        )}

                        <div>
                            <div className="fw-bold trainerName">
                                {singleCourse?.trainer?.name}
                            </div>
                            <div className="trainerRole">
                                {singleCourse?.trainer?.role}
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="d-flex gap-3 flex-wrap">
                        {singleCourse?.trainer?.facebook && (
                            <a href={singleCourse.trainer.facebook} target="_blank" className="socialLink">Facebook</a>
                        )}
                        {singleCourse?.trainer?.instagram && (
                            <a href={singleCourse.trainer.instagram} target="_blank" className="socialLink">Instagram</a>
                        )}
                        {singleCourse?.trainer?.linkedin && (
                            <a href={singleCourse.trainer.linkedin} target="_blank" className="socialLink">LinkedIn</a>
                        )}
                        {singleCourse?.trainer?.twitter && (
                            <a href={singleCourse.trainer.twitter} target="_blank" className="socialLink">Twitter</a>
                        )}
                    </div>

                </Modal.Body>

                <Modal.Footer className="courseModalFooter d-flex justify-content-between align-items-center">
                    {/* {user?.id && ( */}
                    <Button className="readMore border-0" onClick={handleRegisterToCourses}>
                        <span>Register to class</span>
                    </Button>
                    {/* )} */}
                    <Button className="readMore border-0" onClick={closeModal}>
                        <span>Close</span>
                    </Button>

                </Modal.Footer>
            </Modal>
        </>)

}
export default ModalCourses;