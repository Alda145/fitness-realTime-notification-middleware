import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePricingContext } from "../../../Context/Pricing";

export default function EditPricing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { pricingList, getPricing, updatePricing } = usePricingContext();

    const [formData, setFormData] = useState({
        title: "",
        type: "membership",
        price: "",
        frequency: "",
        duration: "",
        gender: "",
        allowQuantity: false,
    });

    useEffect(() => {
        getPricing();
    }, []);

    useEffect(() => {
        const selectedPricing = pricingList.find(
            (item) => item.id === Number(id)
        );

        if (selectedPricing) {
            setFormData({
                title: selectedPricing.title || "",
                type: selectedPricing.type || "membership",
                price: selectedPricing.price || "",
                frequency: selectedPricing.frequency || "",
                duration: selectedPricing.duration || "",
                gender: selectedPricing.gender || "",
                allowQuantity: selectedPricing.allowQuantity || false,
            });
        }
    }, [pricingList, id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: formData.title,
            type: formData.type,
            price: Number(formData.price),
            frequency: formData.frequency,
            duration: formData.duration,
            gender: formData.gender,
            allowQuantity: formData.allowQuantity,
        };

        await updatePricing(id, data);

        navigate("/admin/pricing");
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Edit Pricing</h2>
                    <p className="text-muted mb-0">
                        Update selected pricing information.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={() => navigate("/admin/pricing")}
                >
                    Back
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Type</label>
                                <select
                                    name="type"
                                    className="form-select"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="membership">Membership</option>
                                    <option value="extra">Extra</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Frequency</label>
                                <select
                                    name="frequency"
                                    className="form-select"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                >
                                    <option value="">No frequency</option>
                                    <option value="four_days">Four days</option>
                                    <option value="six_days">Six days</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Duration</label>
                                <select
                                    name="duration"
                                    className="form-select"
                                    value={formData.duration}
                                    onChange={handleChange}
                                >
                                    <option value="">No duration</option>
                                    <option value="1_month">1 Month</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="daily">Daily</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Gender</label>
                                <select
                                    name="gender"
                                    className="form-select"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">No gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="allowQuantity"
                                        name="allowQuantity"
                                        className="form-check-input"
                                        checked={formData.allowQuantity}
                                        onChange={handleChange}
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="allowQuantity"
                                    >
                                        Allow quantity
                                    </label>
                                </div>
                            </div>

                            <div className="col-12 d-flex gap-2">
                                <button type="submit" className="btn btn-dark px-4">
                                    Update Pricing
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-light border px-4"
                                    onClick={() => navigate("/admin/pricing")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}