import './App.css';
import Navigation from './components/Patients/Navigation/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Read from './components/Patients/Read/Read'
import Delete from './components/Patients/Delete/Delete'
import Update from './components/Patients/Update/Update';
import Insert from './components/Patients/Insert/Insert';
import AllButtons from './components2/AllButtons/AllButtons';
import { useState } from 'react';

import MainSwimmingPool from './components/SwimmingPool/MainSwimmingPool/MainSwimmingPool';
import MainGender from './components/Gender/MainGender/MainGender'
import MainSchedule from './components/Schedule/MainSchedule/MainSchedule';
import MainDataManager from './links/mainDataManager/MainDataManager';
import Headers from './links/headers/Headers';
import Patients from './components/Patients/Patients';

import FormsTeachers from './components/Teachers/FormsTeacher/FormsTeachers';
import TableTeacher from './components/Teachers/TableTeachers/TableTeacher';
import SendToFormSchedule from "./components/Teachers/FormTeacherSchedule/SendToFormSchedule/SendToFormSchedule"
import SmallTable from './small-components/SmallTable/SmallTable';
import FormSchedule from './components/Teachers/FormTeacherSchedule/FormSchedule/FormSchedule';

import ClientDetails from './components/ClientDetails/ClientDetails';

function App() {
  const [arrdatamanager] = useState([
    { text: "שעות פעילות", link: "/datamanager/schedule", color: 'purple' },
    { text: "בריכות", link: "/datamanager/pool", color: 'green' },
    { text: "קבוצות", link: "/datamanager/gender", color: 'blue' },
    { text: "מטפלים", link: "/datamanager/teachers", color: 'red' }
  ])

  const [headers] = useState([
    { text: "רשימת ממתינים", link: "/patients" },
    // { text: "שיבוץ ממתינים", link: "/settingpatients" },
    // { text: "ארכיון", link: "/archives" },
    // { text: "ללא מידע רפואי", link: "/noMedicalInformation" },
    { text: "ניהול מידע", link: "/datamanager" }
    // { text: "דוחות", link: "/reports" }
  ])

  return <>
    {/* <UserContext.Provider> */}
    {/* <BrowserRouter>
      <Navigation />

      
      <Routes>
        <Route path='/read' element={<Read />} />
        <Route path='/delete' element={<Delete />} />
        <Route path='/Update' element={<Update />} />
        <Route path='/insert' element={<Insert />} />
        <Route path='/allButtons' element={<AllButtons />} />
      </Routes>
    </BrowserRouter> */}
    {/* </UserContext.Provider> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Headers arr={headers} />} >
          <Route path='/patients' element={<Patients />}></Route>
          {/* <Route path='/settingpatients'></Route> */}
          {/* <Route path='/archives'></Route> */}
          {/* <Route path='/noMedicalInformation'></Route> */}
          <Route path='datamanager' element={<MainDataManager arr={arrdatamanager} />} >
            <Route path='schedule' element={<MainSchedule />} />
            <Route path='gender' element={<MainGender />} />
            <Route path='pool' element={< MainSwimmingPool />} />
            <Route path='teachers' element={<TableTeacher />} >
              <Route path='details' element={<SmallTable />} />
              <Route path="oneTeacher" element={<FormsTeachers />} />
              <Route path='sendToTeacherSchedule' element={<SendToFormSchedule />} />
              <Route path='teacherSchedule' element={<FormSchedule />} />
            </Route>

          </Route>
          {/* <Route path='/reports'></Route> */}
        </Route>

        <Route path='/clientDetails/:id' element={<ClientDetails />} />
        {/* <Route path='/insertPatient/:id' element={<Insert />} /> */}
      </Routes>
    </BrowserRouter >
  </>
}
export default App;