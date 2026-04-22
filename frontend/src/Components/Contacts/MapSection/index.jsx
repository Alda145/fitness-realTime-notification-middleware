import React from "react";
import { Container } from "react-bootstrap";

export default function MapSection() {
    return (
        <section className="map-section">
            <Container className="p-0">
                <iframe
                    title="google-map"
                    src="https://www.google.com/maps?q=tapiza&output=embed"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </Container>
        </section>
    );
}