import CoursesSection from '../../Components/Home/CoursesSection';
import TeamSection from '../../Components/Home/TeamSection'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResults() {
    const location = useLocation();
    console.log("location is :",location);

    const params = new URLSearchParams(location.search);
    console.log("params is :", params);
    const query = params.get("q") || "";
    console.log("query:",query);

    const [courses, setCourses] = useState([]);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRes = await axios.get("http://localhost:3000/courses");
                const trainersRes = await axios.get("http://localhost:3000/trainers");
                console.log("coursesRes.data", coursesRes.data );

                setCourses(coursesRes.data);
                setTrainers(trainersRes.data);
            } catch (error) {
                console.log("Error fetching search data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredCourses = courses.filter((course) => {
        const text = `${course.title || ""} ${course.description || ""}${course.trainer.name || ""} `.toLowerCase();
        return text.includes(query.toLowerCase());
    });

    const filteredTrainers = trainers.filter((trainer) => {
        const text = `
        ${trainer.name || ""} 
        ${trainer.lastname || ""} 
        ${trainer.specialization || ""}
    `.toLowerCase();

        return text.includes(query.toLowerCase());
    });

    const hasResults =filteredCourses.length > 0 || filteredTrainers.length > 0;

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-2">Search Results</h2>

            <p className="text-muted mb-4">
                You searched for: <strong>{query}</strong>
            </p>

            {/* NO RESULTS */}
            {!hasResults && (
                <div className="text-center mt-5">
                    <h4>No results found</h4>
                    <p className="text-muted">Try another keyword</p>
                </div>
            )}

            {/* COURSES */}
            {filteredCourses.length > 0 && (
                <>
                    <h4 className="mt-4 mb-3 fw-bold">Courses</h4>

                    <CoursesSection
                        showAll={true}
                        customCourses={filteredCourses}
                    />
                </>
            )}
            {/* TRAINERS */}
            {filteredTrainers.length > 0 && (
                <>
                    <h4 className="mt-4 mb-3 fw-bold">Trainers</h4>

                    <TeamSection
                        customTrainers={filteredTrainers}
                        showAll={true}
                    />
                </>
            )}

        </div>
    );
}