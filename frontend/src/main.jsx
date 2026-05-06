// import { StrictMode } from 'react'
import axios from 'axios';
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
//import './index.css'
import App from './App.jsx'
import { TrainerProvider } from './Context/Trainer'
import { CourseProvider } from './Context/Course'
import { AppointmentProvider } from './Context/Appointment.jsx';
import { BlockedSlotProvider } from "./Context/BlockedSlot";
import { UserProvider } from './Context/User.jsx';
import './i18n';
axios.defaults.withCredentials = true


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <UserProvider>
    <BrowserRouter>
      <TrainerProvider>
        <CourseProvider>
          <AppointmentProvider>
            <BlockedSlotProvider>
              <App />
            </BlockedSlotProvider>
          </AppointmentProvider>
        </CourseProvider>
      </TrainerProvider>
    </BrowserRouter>
  </UserProvider>

  // </StrictMode>,
)
