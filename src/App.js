import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

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
import PoolTableContext, { PoolTable } from './context/PoolTable';
import HoursContext, { HoursReducer } from './context/Hours'
import PoolData from './components/PoolData/PoolData';
import GenderData from './components/GenderData/GenderData'

import ClientDetails from './components/ClientDetails/ClientDetails';

function App() {
  const [data, setData] = useReducer(PoolTable, {})
  const [activeHours, setActiveHours] = useReducer(HoursReducer, [])

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


<HoursContext.Provider value={{ activeHours, setActiveHours }}>
      <PoolTableContext.Provider value={{ data, setData }}>

        <PoolData />
        <PoolTableInformation data={data} />
        <GenderData />


      </PoolTableContext.Provider>
    </HoursContext.Provider>

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

      </Routes>
    </BrowserRouter >
  </>
}
export default App;