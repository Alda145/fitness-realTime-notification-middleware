import BreadcrumbSection from '../../Components/BreadcrumbSection'
import BlogSection from '../../Components/Home/BlogSection';
import { useTranslation } from "react-i18next";

const Blogs = () => {
    const { t } = useTranslation();
    return <>
        <BreadcrumbSection title={t("blogs.title")} current={t("blogs.current")} />
        
        <BlogSection/>

    </>
}
export default Blogs;