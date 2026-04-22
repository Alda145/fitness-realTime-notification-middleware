import BreadcrumbSection from "../../../Components/BreadcrumbSection";
import TeamSection from "../../../Components/Home/TeamSection";
import { useTranslation } from "react-i18next";



const Team = () => {
    const { t } = useTranslation();


    return (
        <>
            <BreadcrumbSection title={t("team.title")} current={t("team.current")} />
            
            <TeamSection/>
         

        </>
    )

}
export default Team;