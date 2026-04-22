import BreadcrumbSection from "../../../Components/BreadcrumbSection";
import Testimonials from "../../../Components/Home/Testimonial";
import { useTranslation } from "react-i18next";


const Features = () => {
    const { t } = useTranslation();


    return (
        <>
            <BreadcrumbSection title={t("testimonial.title")} current={t("testimonial.current")} />
            <div  style={{height:"100px"}}></div>
            <Testimonials />

        </>
    )

}
export default Features;