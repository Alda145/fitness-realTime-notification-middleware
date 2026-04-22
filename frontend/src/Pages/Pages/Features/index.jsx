import BreadcrumbSection from "../../../Components/BreadcrumbSection";
import HighlightSection from "../../../Components/Home/HighlightSection";
import { useTranslation } from "react-i18next";

const Features = ()=>{
    const { t } = useTranslation();


return(
    <>
        <BreadcrumbSection title={t("features.title")} current={t("features.current")} />
        <HighlightSection/>
    </>
)

}
export default Features;