import MainNavbar from './Navbar'
import Home from './Pages/Home'
import About from './Pages/About/index'
import Footer from './Footer/index'
import { Routes, Route, useLocation } from 'react-router-dom'
import Courses from './Pages/Courses'
import Blogs from './Pages/Blogs';
import Features from './Pages/Pages/Features'
import Testimonial from './Pages/Pages/Testimonial'
import Team from './Pages/Pages/Team'
import Contact from './Pages/Contact'
import Admin from './Admin'
import Dashboard from './Admin/Dashboard'
import Trainers from './Admin/Trainers'
import CreateTrainer from './Admin/Trainers/CreateTrainer'
import EditTrainer from './Admin/Trainers/EditTrainer'
import CoursesAdmin from './Admin/Courses'
import CreateCourse from './Admin/Courses/CreateCourse'
import EditCourse from './Admin/Courses/EditCourse';
import Appointments from './Admin/Appointments'
import BlockedSlotPage from './Admin/BlockedSlot'
import CreateBlockedSlot from './Admin/BlockedSlot/CreateBlockSlot'
import EditBlockedSlot from './Admin/BlockedSlot/EditBlokSlot'
import AdminRoute from './Components/AdminRoute';
import SearchResults from "./Pages/SearchResults";
import UserProfile from './Pages/UserProfile';
import Pricing from './Pages/Pricing/Pricing'
import PaymentSuccess from './Pages/PaymentSuccess/PaymentSuccess'
import AdminPricing from './Admin/Pricing';
import EditPricing from "./Admin/Pricing/EditPricing";

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <MainNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment-success" element={<PaymentSuccess />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="trainers/create/" element={<CreateTrainer />} />
          <Route path="trainers/edit/:id" element={<EditTrainer />} />
          <Route path="courses" element={<CoursesAdmin />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="blocked-slots" element={<BlockedSlotPage />} />
          <Route path="blocked-slots/create" element={<CreateBlockedSlot />} />
          <Route path="blocked-slots/edit/:id" element={<EditBlockedSlot />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="pricing/edit/:id" element={<EditPricing />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}


    </>
  )
}

export default App
