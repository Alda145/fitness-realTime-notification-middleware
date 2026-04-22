import BreadcrumbSection from "../../Components/BreadcrumbSection";
import AboutSection from "../../Components/Home/AboutFitness";
import GoalSection from "../../Components/Home/GoalSection";
import HighlightSection from "../../Components/Home/HighlightSection";
import ExploreSection from "../../Components/Home/ExploreSection";
import TeamSection from "../../Components/Home/TeamSection";
import { useTranslation } from "react-i18next";


const About = () => {
    const { t } = useTranslation();
    return <>
        <BreadcrumbSection title={t("about.title")} current={t("about.current")}  />
        <div style={{ height: '100px' }}></div>
        <AboutSection />
        <div style={{ height: '100px' }}></div>
        <GoalSection />
        <div style={{ height: '100px' }}></div>
        <HighlightSection />
        <div style={{ height: '100px' }}></div>
        <ExploreSection />
        <div style={{ height: '100px' }}></div>
        <TeamSection />
    </>
}
export default About;