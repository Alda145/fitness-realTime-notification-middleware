import GoalSection from "../../Components/Home/GoalSection";
import CoursesSection from '../../Components/Home/CoursesSection'
import Testimonials from "../../Components/Home/Testimonial";
import BreadcrumbSection from "../../Components/BreadcrumbSection";
import { useTranslation } from "react-i18next";


const Courses = () => {
    const { t } = useTranslation();
    return <>
        <BreadcrumbSection title={t("courses.title")} current={t("courses.current")}  />
        <div style={{ height: '100px' }}></div>
        <GoalSection />
        <div style={{ height: '100px' }}></div>
        <CoursesSection showAll={true} />
        <div style={{ height: '100px' }}></div>
        <Testimonials />
    </>
}
export default Courses;