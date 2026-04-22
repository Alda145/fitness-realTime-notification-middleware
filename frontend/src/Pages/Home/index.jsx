import CaruselImages from "../../Components/Home/CaruselImages";
import AboutSection from "../../Components/Home/AboutFitness";
import GoalSection from "../../Components/Home/GoalSection";
import HighlightsSection from "../../Components/Home/HighlightSection";
import CoursesSection from "../../Components/Home/CoursesSection";
import BlogSection from "../../Components/Home/BlogSection";
import ExploreSection from "../../Components/Home/ExploreSection";
import TeamSection from "../../Components/Home/TeamSection";
import Testimonials from "../../Components/Home/Testimonial";




const Home = () => {
    
    
    return (
        <div >
            <CaruselImages />
            <AboutSection />
            <GoalSection />
            <HighlightsSection />
            <CoursesSection showAll={false} />
            <BlogSection />
            <ExploreSection />
            <TeamSection />
            <Testimonials />

        </div>

    )

}
export default Home;
