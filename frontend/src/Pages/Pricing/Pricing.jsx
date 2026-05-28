import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { get_pricing_service } from "../../Services/Pricing";
import { create_checkout_session_service } from "../../Services/Payment";
import axios from "axios";
import { jsPDF } from "jspdf";
import QRCode from 'qrcode'
import "./pricing.css";

export default function Pricing() {
    const [pricingList, setPricingList] = useState([]);

    const [selectedGender, setSelectedGender] = useState("male");
    const [selectedMembership, setSelectedMembership] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("1_month");

    const [selectedExtras, setSelectedExtras] = useState([]);
    const [extraQuantities, setExtraQuantities] = useState({});
    // State per currency
    const [currency, setCurrency] = useState("ALL");
    const [finalPrice, setFinalPrice] = useState(0);


    //UseEffekt per marrjen e te gjitha vlerave te tabeles pricing
    useEffect(() => {
        getPricing();
    }, []);



    console.log("pricing List is :", pricingList);

    const getPricing = async () => {
        try {
            const result = await get_pricing_service();
            console.log("result.data:", result.data)
            if (result.status === 200) {
                setPricingList(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    //Ndaj membership normal me ato extras
    const membershipPrices = pricingList.filter(
        (item) => item.type === "membership"
    );
    console.log("membership normal:", membershipPrices)

    const extraServices = pricingList.filter(
        (item) => item.type === "extra"
    );
    console.log("extras services :", extraServices)


    // Find the element that complete the conditions
    const selectedMembershipData = membershipPrices.find(
        (item) =>
            item.frequency === selectedMembership &&
            item.duration === selectedDuration &&
            item.gender === selectedGender
    );
    console.log("selectedMembershipData is : ", selectedMembershipData);
    console.log("selectedMembershipData.price", selectedMembershipData?.price);
    // Find the price in that element
    const membershipPrice = selectedMembership
        ? selectedMembershipData?.price || 0
        : 0;

    console.log("membershipPrice", membershipPrice)

    // Klikimi 2 here te i njejti buton te frequency
    const toggleMembership = (membershipName) => {
        if (selectedMembership === membershipName) {
            setSelectedMembership("");
        } else {
            setSelectedMembership(membershipName);
        }
    };
    //If service exists hiqe ,else shtoje =>Add/Remove 
    const toggleService = (service) => {
        const exists = selectedExtras.find(
            (item) => item.id === service.id
        );
        console.log("exists :", exists);
        if (exists) {
            setSelectedExtras(
                selectedExtras.filter((item) => item.id !== service.id)
            );
        } else {
            setSelectedExtras([...selectedExtras, service]);
        }
    };
    console.log("selectedExtras u be :", selectedExtras);

    const increaseQuantity = (service) => {
        setExtraQuantities({
            ...extraQuantities,
            [service.id]: (extraQuantities[service.id] || 0) + 1,
        });
    };
    console.log("setExtraQuantities pas increase :", extraQuantities);

    const decreaseQuantity = (service) => {
        if (!extraQuantities[service.id]) {
            return;
        }

        setExtraQuantities({
            ...extraQuantities,
            [service.id]: extraQuantities[service.id] - 1,
        });
    };


    const selectedQuantityExtras = extraServices.filter(
        (service) =>
            service.allowQuantity &&
            extraQuantities[service.id] > 0
    );

    const selectedNormalExtrasPrice = selectedExtras.reduce(
        (total, service) => total + service.price,
        0
    );
    console.log("selectedNormalExtrasPrice", selectedNormalExtrasPrice)

    const selectedQuantityExtrasPrice = selectedQuantityExtras.reduce(
        (total, service) => {
            const quantity = extraQuantities[service.id] || 0;
            return total + service.price * quantity;
        },
        0
    );
    console.log("selectedQuantityExtrasPrice", selectedQuantityExtrasPrice);


    //cmimi total eshte : 
    const totalPrice =membershipPrice +selectedNormalExtrasPrice + selectedQuantityExtrasPrice;

    const getDurationLabel = (duration) => {
        if (duration === "1_month") return "1 Month";
        if (duration === "3_months") return "3 Months";
        if (duration === "6_months") return "6 Months";
        if (duration === "1_year") return "1 Year";
        return duration;
    };

    const getMembershipLabel = (membership) => {
        if (membership === "four_days") return "4 Times / Week";
        if (membership === "six_days") return "6 Times / Week";
        return "";
    };
    



    const changeCurrency = (selectedCurrency) => {
        setCurrency(selectedCurrency);
    };

    //UseEffect per vendosjen  e final price = total price ne fillim sapo behet perzgjedhja e nje abonimi
    useEffect(() => {
        const convertPrice = async () => {
            console.log("currency:", currency);
            console.log("totalPrice:", totalPrice);

            if (currency === "ALL") {
                setFinalPrice(totalPrice);
                return;
            }

            try {
                const response = await axios.get(
                    `https://api.frankfurter.dev/v2/rates?base=ALL&quotes=EUR,GBP`,
                    {
                        withCredentials: false,
                    }
                );

                console.log("API response:", response.data);

                const eurRate = response.data.find(
                    (item) => item.quote === "EUR"
                )?.rate;
                console.log("eurRate", eurRate)

                const gbpRate = response.data.find(
                    (item) => item.quote === "GBP"
                )?.rate;
                console.log("gbpRate", gbpRate)

                if (currency === "EUR") {
                    const convertedPrice =
                        totalPrice * eurRate;

                    setFinalPrice(
                        convertedPrice.toFixed(2)
                    );
                }

                if (currency === "GBP") {
                    const convertedPrice =
                        totalPrice * gbpRate;

                    setFinalPrice(
                        convertedPrice.toFixed(2)
                    );
                }


            } catch (error) {
                console.log("Currency error:", error);
            }
        };

        convertPrice();
    }, [currency, totalPrice]);

    //Kodi per download pdf dhe qr code 

    const downloadPricingPdf = async () => {
        const doc = new jsPDF();

        let y = 20;

        // TITLE
        doc.setFontSize(18);
        doc.text("Fitness Pricing Summary", 20, y);

        y += 15;

        // LINE
        doc.line(20, y, 190, y);

        y += 15;

        // MEMBERSHIP SECTION
        doc.setFontSize(14);
        doc.text("Membership Information", 20, y);

        y += 10;

        doc.setFontSize(11);

        doc.text(
            `Plan: ${getMembershipLabel(selectedMembership) ||
            "Not selected"
            }`,
            20,
            y
        );

        y += 8;

        doc.text(
            `Duration: ${selectedMembership
                ? getDurationLabel(selectedDuration)
                : "Not selected"
            }`,
            20,
            y
        );

        y += 8;

        doc.text(
            `Gender: ${selectedMembership
                ? selectedGender
                : "Not selected"
            }`,
            20,
            y
        );

        y += 15;

        // EXTRA SERVICES
        doc.setFontSize(14);
        doc.text("Extra Services", 20, y);

        y += 10;

        doc.setFontSize(11);

        if (
            selectedExtras.length === 0 &&
            selectedQuantityExtras.length === 0
        ) {
            doc.text(
                "No extra services selected",
                20,
                y
            );

            y += 8;
        }

        const array = selectedExtras.forEach((service) => {
            doc.text(
                `• ${service.title} (${service.price} Lek)`,
                20,
                y
            );
            console.log(service);

            y += 8;
        });
        console.log("arraayyy extras is :", selectedExtras)

        selectedQuantityExtras.forEach((service) => {
            console.log("extraQuantities", extraQuantities)
            const quantity =
                extraQuantities[service.id] || 0;

            doc.text(
                `• ${service.title} x${quantity}`,
                20,
                y
            );

            y += 8;
        });

        console.log("array extras with quantity :", selectedQuantityExtras)

        y += 10;

        // TOTAL
        doc.line(20, y, 190, y);

        y += 10;

        doc.setFontSize(15);

        doc.text(
            `Total Price: ${finalPrice} ${currency}`,
            20,
            y
        );

        y += 20;

        // QR
        const qrText = `
        Membership: ${getMembershipLabel(selectedMembership)}
        Duration: ${getDurationLabel(selectedDuration)}
        Gender: ${selectedGender}
        Total: ${finalPrice} ${currency}
        `;

        const qrImage =
            await QRCode.toDataURL(qrText);

        doc.text("QR Summary:", 20, y);

        y += 5;

        doc.addImage(
            qrImage,
            "PNG",
            20,
            y,
            40,
            40
        );

        // DOWNLOAD
        doc.save("pricing-summary.pdf");
    };


    //Kodi per pay now :
    const handlePayNow = async () => {
        console.log("HYRI HANDLE PAY");
        if (currency === "ALL") {
            alert("Please choose EUR or GBP before payment");
            return;
        }
        try {
            const result = await create_checkout_session_service({
                amount: finalPrice,
                currency: currency.toLowerCase(),
            });
            console.log("RESULT:", result);

            window.location.href = result.data.url;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="pricing-page py-5">
            <div className="container">

                <div className="text-center mb-5">
                    <h6 className="pricing-subtitle">
                        FITNESS MEMBERSHIP
                    </h6>

                    <h1 className="pricing-title">
                        Get Pricing
                    </h1>

                    <p className="pricing-text mx-auto">
                        Choose a normal membership or select only extra services.
                    </p>
                </div>

                <div className="row g-4">

                    {/* LEFT SIDE */}
                    <div className="col-lg-8">

                        {/* NORMAL MEMBERSHIP */}
                        <div className="pricing-card mb-4">
                            <h3 className="section-title">
                                Normal Membership
                            </h3>

                            <p className="section-description">
                                This part is optional. First choose gender, then frequency and duration.
                            </p>

                            <h5 className="pricing-small-title mt-4 mb-3">
                                1. Choose Gender
                            </h5>

                            <div className="d-flex gap-2 flex-wrap">
                                <button
                                    className={
                                        selectedGender === "male"
                                            ? "gender-btn active"
                                            : "gender-btn"
                                    }
                                    onClick={() => setSelectedGender("male")}
                                >
                                    Male
                                </button>

                                <button
                                    className={
                                        selectedGender === "female"
                                            ? "gender-btn active"
                                            : "gender-btn"
                                    }
                                    onClick={() => setSelectedGender("female")}
                                >
                                    Female
                                </button>
                            </div>

                            <h5 className="pricing-small-title mt-4 mb-3">
                                2. Choose Training Frequency
                            </h5>

                            <div className="d-flex flex-wrap gap-3">
                                <button
                                    className={
                                        selectedMembership === "four_days"
                                            ? "pricing-option active"
                                            : "pricing-option"
                                    }
                                    onClick={() => toggleMembership("four_days")}
                                >
                                    4 Times / Week
                                </button>

                                <button
                                    className={
                                        selectedMembership === "six_days"
                                            ? "pricing-option active"
                                            : "pricing-option"
                                    }
                                    onClick={() => toggleMembership("six_days")}
                                >
                                    6 Times / Week
                                </button>
                            </div>

                            <h5 className="pricing-small-title mt-4 mb-3">
                                3. Choose Duration
                            </h5>

                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    className={
                                        selectedDuration === "1_month"
                                            ? "duration-btn active"
                                            : "duration-btn"
                                    }
                                    onClick={() => setSelectedDuration("1_month")}
                                >
                                    1 Month
                                </button>

                                <button
                                    className={
                                        selectedDuration === "3_months"
                                            ? "duration-btn active"
                                            : "duration-btn"
                                    }
                                    onClick={() => setSelectedDuration("3_months")}
                                >
                                    3 Months
                                </button>

                                <button
                                    className={
                                        selectedDuration === "6_months"
                                            ? "duration-btn active"
                                            : "duration-btn"
                                    }
                                    onClick={() => setSelectedDuration("6_months")}
                                >
                                    6 Months
                                </button>

                                <button
                                    className={
                                        selectedDuration === "1_year"
                                            ? "duration-btn active"
                                            : "duration-btn"
                                    }
                                    onClick={() => setSelectedDuration("1_year")}
                                >
                                    1 Year
                                </button>
                            </div>

                            <div className="membership-note mt-4">
                                <strong>Note:</strong> Membership is optional. Click the selected frequency again to remove it.
                            </div>
                        </div>

                        {/* EXTRA SERVICES */}
                        <div className="pricing-card">
                            <h3 className="section-title">
                                Extra Services
                            </h3>

                            <p className="section-description">
                                Add or remove services whenever you want.
                            </p>

                            <div className="row g-3 mt-1">

                                {extraServices.map((service) => (
                                    <div key={service.id} className="col-md-6">
                                        <div className="service-card">

                                            <div>
                                                <h5>{service.title}</h5>

                                                <p>
                                                    {service.price} Lek / {service.duration}
                                                </p>
                                            </div>

                                            {service.allowQuantity ? (
                                                <div className="quantity-box">
                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(service)}
                                                    >
                                                        -
                                                    </button>

                                                    <span>
                                                        {extraQuantities[service.id] || 0}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(service)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ) : (
                                                <Button
                                                    className={
                                                        selectedExtras.find(
                                                            (item) => item.id === service.id
                                                        )
                                                            ? "remove-service-btn border-0"
                                                            : "add-service-btn border-0"
                                                    }
                                                    onClick={() => toggleService(service)}
                                                >
                                                    {selectedExtras.find(
                                                        (item) => item.id === service.id
                                                    )
                                                        ? "Remove"
                                                        : "Add"}
                                                </Button>
                                            )}

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE SUMMARY */}
                    <div className="col-lg-4">
                        <div className="summary-card">

                            <h3 className="summary-title">
                                Summary
                            </h3>

                            <div className="summary-section">
                                <h5>Normal Membership</h5>

                                {selectedMembership ? (
                                    <>
                                        <div className="summary-row">
                                            <span>Plan</span>
                                            <strong>
                                                {getMembershipLabel(selectedMembership)}
                                            </strong>
                                        </div>

                                        <div className="summary-row">
                                            <span>Duration</span>
                                            <strong>
                                                {getDurationLabel(selectedDuration)}
                                            </strong>
                                        </div>

                                        <div className="summary-row">
                                            <span>Gender</span>
                                            <strong>
                                                {selectedGender === "male" ? "Male" : "Female"}
                                            </strong>
                                        </div>

                                        <div className="summary-row">
                                            <span>Price</span>
                                            <strong>{membershipPrice} Lek</strong>
                                        </div>
                                    </>
                                ) : (
                                    <p className="summary-empty">
                                        Not selected
                                    </p>
                                )}
                            </div>

                            <hr />

                            <div className="summary-section">
                                <h5>Extra Services</h5>

                                {selectedExtras.length === 0 &&
                                    selectedQuantityExtras.length === 0 ? (
                                    <p className="summary-empty">
                                        No extra services
                                    </p>
                                ) : (
                                    <>
                                        {selectedExtras.map((service) => (
                                            <div key={service.id} className="summary-row">
                                                <span>{service.title}</span>
                                                <strong>{service.price} Lek</strong>
                                            </div>
                                        ))}

                                        {selectedQuantityExtras.map((service) => (
                                            <div key={service.id} className="summary-row">
                                                <span>
                                                    {service.title} x {extraQuantities[service.id]}
                                                </span>
                                                <strong>
                                                    {service.price * extraQuantities[service.id]} Lek
                                                </strong>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            <hr />

                            <div className="currency-switch d-flex gap-2 mb-4">
                                <button type="button" className={currency === "ALL" ? "active" : ""} onClick={() => changeCurrency("ALL")}>ALL</button>
                                <button type="button" className={currency === "EUR" ? "active" : ""} onClick={() => changeCurrency("EUR")}>EUR</button>
                                <button type="button" className={currency === "GBP" ? "active" : ""} onClick={() => changeCurrency("GBP")}>GBP</button>
                            </div>

                            <div className="total-box">
                                <span>Total Price</span>
                                <h2>{finalPrice} {currency}</h2>
                            </div>

                            <Button className="downloadPricingBtn border-0 w-100 mb-2" onClick={() => downloadPricingPdf()}>
                                Download PDF
                            </Button>

                            <Button className="payPricingBtn border-0 w-100" onClick={handlePayNow}>
                                Pay Now
                            </Button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}