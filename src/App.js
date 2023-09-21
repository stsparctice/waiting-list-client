import './App.css';
import { useReducer } from 'react';
import Navigation from './components/patients/Navigation/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Read from './components/patients/Read/Read'
import Delete from './components/patients/Delete/Delete'
import Update from './components/patients/Update/Update';
import Insert from './components/patients/Insert/Insert';
import AllButtons from './components2/AllButtons/AllButtons';
import { useState } from 'react';

import MainSwimmingPool from './components/SwimmingPool/MainSwimmingPool/MainSwimmingPool';
import MainGender from './components/Gender/MainGender/MainGender'
import MainSchedule from './components/Schedule/MainSchedule/MainSchedule';
import MainDataManager from './links/mainDataManager/MainDataManager';
import Headers from './links/headers/Headers';
import Patients from './components/patients/Patients';

import FormsTeachers from './components/Teachers/FormsTeacher/FormsTeachers';
import TableTeacher from './components/Teachers/TableTeachers/TableTeacher';
import SendToFormSchedule from "./components/Teachers/FormTeacherSchedule/SendToFormSchedule/SendToFormSchedule"
import SmallTable from './small-components/SmallTable/SmallTable';
import FormSchedule from './components/Teachers/FormTeacherSchedule/FormSchedule/FormSchedule';
import PoolTableContext, { PoolTable } from './contexts/PoolTable';
import HoursContext, { HoursReducer } from './contexts/Hours'
import GenderData from './components/GenderData/GenderData'
import ClientDetails from './components/ClientDetails/ClientDetails';
import PoolTableInformation from './components/PoolTableInformation/PoolTableInformation';
import HoursDetailContext, { HoursDetailsReducer } from './contexts/HoursDetails'

function App() {
  const [data, setData] = useReducer(PoolTable, {})
  const [activeHours, setActiveHours] = useReducer(HoursReducer, [])
  const [details, setDetails] = useReducer(HoursDetailsReducer, [])

  const [arrdatamanager] = useState([
    { text: "שעות פעילות", link: "/datamanager/schedule", color: '#B63B3B' },
    { text: "בריכות", link: "/datamanager/pool", color: '#9FDF8A' },
    { text: "קבוצות", link: "/datamanager/gender", color: '#AB99BF' },
    { text: "מטפלים", link: "/datamanager/teachers", color: '#F4981F' }
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


          <Route path='/clientDetails/:id' element={<ClientDetails />} />
        </Route>
        {/* <Route path='/insertPatient/:id' element={<Insert />} /> */}
      </Routes>
    </BrowserRouter >
  </>

}
export default App;