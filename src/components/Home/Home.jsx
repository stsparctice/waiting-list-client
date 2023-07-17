import React from "react";
import { Link } from "react-router-dom";

// import Table from '../../components2/Table/Table'

const Home = () => {
    // let TableStructure = [
    //     {
    //         ברכה: { type: 'readonly', visible: false, value: 'בני ברק', color: "black", backgroundColor: "pink" },
    //         כתובת: { type: 'readonly', visible: true, value: 'רבי עקיבא', color: "black", backgroundColor: "pink" },
    //         " i1": { type: 'icon', visible: true, value: true, nameIcon: "deleteimg", color: "black", backgroundColor: "pink" }
    //     },
    //     {
    //         ברכה: { type: 'readonly', visible: false, value: 'אשדוד', color: "black", backgroundColor: "pink" },
    //         כתובת: { type: 'readonly', visible: true, value: 'מורדי הגטאות', color: "black", backgroundColor: "pink" },
    //         " i1": { type: 'icon', visible: true, value: true, nameIcon: "deleteimg", color: "black", backgroundColor: "pink" }
    //     }
    //     ,
    //     {
    //         ברכה: { type: 'readonly', visible: false, value: 'גדרה', color: "black", backgroundColor: "pink" },
    //         כתובת: { type: 'readonly', visible: true, value: 'אלו', color: "black", backgroundColor: "pink" },
    //         " i1": { type: 'icon', visible: true, value: true, nameIcon: "deleteimg", color: "black", backgroundColor: "pink" }
    //     }
    // ]

    // let data = {
    //     titles: ['name', 'sex', 'mmaxAge', 'fMaxAge'],
    //     values: [
    //         { name: 'בנים', mmaxAge: '9', fMaxAge: '', sex: 'זכר', genderColor: "red" },
    //         { name: 'גברים', mmaxAge: '120', fMaxAge: '', sex: 'זכר', genderColor: "blue" },
    //         { name: 'נשים', mmaxAge: '', fMaxAge: '120', sex: 'נקבה', genderColor: "purple" },
    //         { name: 'מעורב', mmaxAge: '3', fMaxAge: '120', sex: '', genderColor: "green" }
    //     ]
    // }
    // let information = setupObj(data)
    // //מקבל מערך של כותרות ומערך של אובייקטים המכילים את כל הערכים. מחזיר אובייקט המכיל רק את הערכים הקיימים בכותרות.
    // function setupObj(data) {
    //     let allObj = [], obj = {};
    //     data.values.forEach(element => {
    //         obj = {}
    //         for (const key in element) {
    //             if (data.titles.indexOf(key) !== -1) {
    //                 obj[key] = element[key]
    //             }
    //         }
    //         allObj.push(obj)
    //     });
    //     return allObj
    // }


    return <>
        {/* <Table All={TableStructure}></Table> */}
        {/* <Table All={information}></Table> */}
        <h1>home</h1>
        <Link to='/swimmingpool'>swimming-pool</Link>
        <Link to='/gender'>gender-type</Link>
        <Link to='/schedule'>schedule</Link>
    </>
}

export default Home;