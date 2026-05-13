import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./index.css";

export default function PaymentSuccess() {
    return (
        <section className="payment-success-page d-flex align-items-center">
            <div className="container">
                <div className="success-card mx-auto text-center">

                    <div className="success-icon">
                        <FaCheckCircle />
                    </div>

                    <h1>Payment Successful</h1>

                    <p>
                        Thank you! Your payment was completed successfully.
                    </p>

                    <div className="success-info">
                        <span>Status</span>
                        <strong>Completed</strong>
                    </div>

                    <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
                        <Link to="/" className="success-btn">
                            Back Home
                        </Link>

                        <Link to="/pricing" className="success-outline-btn">
                            Back to Pricing
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}