import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePricingContext } from "../../Context/Pricing";

export default function AdminPricing() {
    const navigate = useNavigate();

    const {
        pricingList,
        getPricing,
        createPricing,
        deletePricing,
    } = usePricingContext();

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            type: "membership",
            price: "",
            frequency: "",
            duration: "",
            gender: "",
            allowQuantity: false,
        });
    };

    const handleCreate = async (e) => {
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

        try {
            await createPricing(data);
            resetForm();
        } catch (error) {
            console.log(error);
            alert(error.message || "Failed to create pricing");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this pricing?"
        );

        if (confirmDelete) {
            await deletePricing(id);
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Pricing</h2>
                    <p className="text-muted mb-0">
                        Manage memberships and extra service prices.
                    </p>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">Add Pricing</h5>

                    <form onSubmit={handleCreate}>
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
                                        name="allowQuantity"
                                        id="allowQuantity"
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
                                    Add Pricing
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-light border px-4"
                                    onClick={resetForm}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-3 py-3">Title</th>
                                    <th className="px-3 py-3">Type</th>
                                    <th className="px-3 py-3">Price</th>
                                    <th className="px-3 py-3">Frequency</th>
                                    <th className="px-3 py-3">Duration</th>
                                    <th className="px-3 py-3">Gender</th>
                                    <th className="px-3 py-3">Quantity</th>
                                    <th className="px-3 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pricingList.length > 0 ? (
                                    pricingList.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-3 py-3 fw-semibold">
                                                {item.title}
                                            </td>

                                            <td className="px-3 py-3">
                                                <span className="badge text-bg-dark rounded-pill">
                                                    {item.type}
                                                </span>
                                            </td>

                                            <td className="px-3 py-3">
                                                {item.price} ALL
                                            </td>

                                            <td className="px-3 py-3">
                                                {item.frequency || "-"}
                                            </td>

                                            <td className="px-3 py-3">
                                                {item.duration || "-"}
                                            </td>

                                            <td className="px-3 py-3">
                                                {item.gender || "-"}
                                            </td>

                                            <td className="px-3 py-3">
                                                {item.allowQuantity ? "Yes" : "No"}
                                            </td>

                                            <td className="px-3 py-3">
                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-light border btn-sm px-3"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/pricing/edit/${item.id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm px-3"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center text-muted py-4"
                                        >
                                            No pricing found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}