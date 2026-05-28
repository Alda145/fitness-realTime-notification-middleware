import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTranslation } from "react-i18next";
import { socket } from "../../socket";
import './index.css'
import axios from "axios";

export default function AppointmentModal({ show, handleClose }) {
    console.log("show", show)

    const { t } = useTranslation();
    const BACKEND_URL = "http://localhost:3000/appointment/book-appointment";

    const [bookedEvents, setBookedEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [blockedSlotEvents, setBlockedSlotEvents] = useState([]);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        notes: "",
        status: "pending"
    });

    const [calendarView, setCalendarView] = useState("timeGridWeek");

    //UseEfecti i pare qe ekzekutohet 
    useEffect(() => {
        const updateView = () => {
            if (window.innerWidth < 768) {
                setCalendarView("timeGridDay");
            } else {
                setCalendarView("timeGridWeek");
            }
        };

        updateView();
        window.addEventListener("resize", updateView);

        return () => window.removeEventListener("resize", updateView);
    }, []);

    //Marrja e te dhenave te futura nga useri dhe admini  nga backendi dhe transformimi ne formatin calendar:
    const fetchCalendarEvents = async () => {
        try {
            const bookedResponse = await axios.get("http://localhost:3000/appointment/booked");
            const blockedResponse = await axios.get("http://localhost:3000/blocked-slot");

            console.log("BOOKED RESPONSE:", bookedResponse.data);
            console.log("BLOKED RESPONSE:", blockedResponse.data);


            const booked = bookedResponse.data.map((ev) => ({
                title: ev.status == 'accept' ? 'booked' : ev.status,
                start: ev.startTime,
                end: ev.endTime,
                display: "background",
                backgroundColor: "#adb5bd",
            }));

            const blocked = blockedResponse.data.map((ev) => {
                let color = "#0d6efd";

                if (ev.title === "Crossfit Class") color = "#dc3545";
                if (ev.title === "Aeroby") color = "#198754";
                if (ev.title === "Pushim") color = "#ffc107";
                if (ev.title === "Busy") color = "#fd7e14";

                return {
                    title: ev.title,
                    start: ev.startTime,
                    end: ev.endTime,
                    backgroundColor: color,
                    borderColor: color,
                    display: "background",
                    // textColor: ev.title === "Pushim" ? "#6c757d" : "#fff",
                };
            });
            console.log("BOOKED EVENTS:", booked);
            console.log("BLOCKED EVENTS:", blocked);

            setBookedEvents(booked);
            setBlockedSlotEvents(blocked);
        } catch (error) {
            console.error("Error fetching calendar events:", error);
        }
    };

    useEffect(() => {
        if (!show) return;

        fetchCalendarEvents();

        const handleCalendarUpdate = (data) => {
            console.log("Socket event received:", data);
            fetchCalendarEvents();
        };

        socket.on("calendar:update", handleCalendarUpdate);

        return () => {
            socket.off("calendar:update", handleCalendarUpdate);
        };
    }, [show]);




    const selectedEvent = selectedSlot
        ? [
            {
                title: "Selected",
                start: selectedSlot.startStr,
                end: selectedSlot.endStr,
                backgroundColor: "#dc3545",
                borderColor: "#dc3545",
            },
        ]
        : [];

    const allEvents = [...bookedEvents, ...blockedSlotEvents, ...selectedEvent];
    console.log("Allevents are :", allEvents)
    console.log("...selectedEvent", ...selectedEvent)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Kontrollojme nese nje orar eshte i zene apo jo 
    const isBookedSlot = (start, end) => {
        const allUnavailableEvents = [...bookedEvents, ...blockedSlotEvents];

        return allUnavailableEvents.some((event) => {
            const eventStart = new Date(event.start).getTime();
            const eventEnd = new Date(event.end).getTime();

            const selectedStart = new Date(start).getTime();
            const selectedEnd = new Date(end).getTime();

            return selectedStart < eventEnd && selectedEnd > eventStart;
        });
    };

    const handleSelect = (selectionInfo) => {
        console.log("selectionInfo:", selectionInfo)
        const slotIsBooked = isBookedSlot(
            selectionInfo.startStr,
            selectionInfo.endStr
        );

        if (slotIsBooked) {
            alert("Ky orar nuk është i disponueshëm.");
            return;
        }

        setSelectedSlot(selectionInfo);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedSlot) {
            alert("Zgjidh fillimisht datën dhe orën.");
            return;
        }

        const payload = {
            ...formData,
            startTime: selectedSlot.startStr,
            endTime: selectedSlot.endStr,
        };
        try {
            const response = await axios.post(BACKEND_URL, payload, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Server response:", response.data);
            alert("Termin u ruajt me sukses!");

            setFormData({ fullName: "", phone: "", notes: "" });
            setSelectedSlot(null);
            handleClose();
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert(error.response?.data?.message || "Ndodhi një gabim gjatë rezervimit të termin.");
        }


    };

    const formatSelectedSlot = () => {
        if (!selectedSlot) return t("appointmentModal.noSelected");

        const start = new Date(selectedSlot.startStr);
        const end = new Date(selectedSlot.endStr);

        return `${start.toLocaleDateString()} | ${start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })} - ${end.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold text-uppercase">
                    {t("appointmentModal.title")}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-3">
                <Form onSubmit={handleSubmit}>
                    <Row className="g-4">
                        <Col lg={4}>
                            <div className="border rounded-4 p-3 h-100 bg-light">
                                <h5 className="fw-bold mb-3">{t("appointmentModal.details")}</h5>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t("appointmentModal.fullName")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder={t("appointmentModal.enterName")}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t("appointmentModal.phone")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={t("appointmentModal.enterPhone")}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t("appointmentModal.notes")}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder={t("appointmentModal.enterNotes")}
                                    />
                                </Form.Group>

                                <div className="border rounded-4 p-3 bg-white mb-3">
                                    <p className="mb-2 fw-semibold">{t("appointmentModal.selectedAppointment")}</p>
                                    <p className="mb-0 text-muted small">
                                        {formatSelectedSlot()}
                                    </p>
                                </div>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <Badge bg="secondary">Booked</Badge>
                                    <Badge bg="danger">Selected</Badge>
                                    <Badge bg="danger">Crossfit Class</Badge>
                                    <Badge bg="success">Aeroby</Badge>
                                    <Badge bg="warning" text="dark">Pushim</Badge>
                                    <Badge style={{ backgroundColor: "#fd7e14" }}>Busy</Badge>
                                </div>

                                <div className="d-grid gap-2 d-md-flex">
                                    <Button variant="secondary" onClick={handleClose}>
                                        {t("appointmentModal.close")}
                                    </Button>
                                    <Button variant="danger" type="submit">
                                        {t("appointmentModal.confirm")}
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col lg={8}>
                            <div className="border rounded-4 p-2 p-md-3 bg-white">
                                <FullCalendar
                                    plugins={[timeGridPlugin, interactionPlugin]}
                                    key={calendarView}
                                    initialView={calendarView}
                                    headerToolbar={{
                                        left: "prev,next today",
                                        center: "title",
                                        right: "",
                                    }}
                                    height="auto"
                                    allDaySlot={false}
                                    slotMinTime="07:00:00"
                                    slotMaxTime="22:00:00"
                                    slotDuration="01:00:00"
                                    selectable={true}
                                    selectMirror={true}
                                    select={handleSelect}
                                    events={allEvents}
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}