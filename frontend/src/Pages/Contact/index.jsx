
import BreadcrumbSection from "../../Components/BreadcrumbSection";
import ContactSection from "../../Components/Contacts/ContactSection";
import MapSection from "../../Components/Contacts/MapSection";
import { useTranslation } from "react-i18next";



const Courses = () => {
    const { t } = useTranslation();
    return <>
        <BreadcrumbSection title={t("contact.title")} current={t("contact.current")} />
        
        <ContactSection />
        <MapSection/>

    </>
}
export default Courses;