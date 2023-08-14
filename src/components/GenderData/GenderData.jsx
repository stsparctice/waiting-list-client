import React, { useEffect, useReducer, useState, useContext } from "react";
import { getData } from "../../services/axios";
import Checkbox from "../Checkbox/Checkbox"
import { createUseStyles } from "react-jss";


const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column'
  },
  send: {
    width: '50px'
  }
})
const GenderData = () => {
  const css = useStyles()
  const [organizationDetails, SetOrganizationDetails] = useState([])


  useEffect(() => {
    async function GetGenderData() {
      const res = await getData('/gender/getAll', { project: { _id: 0, genderColor: 1, name: 1 } })
      let detail = res.map(r => ({ text: r.name, color: r.genderColor, checked: false }))
      SetOrganizationDetails(detail);
    }
    GetGenderData()
  }, [])



  return <>
    {organizationDetails.length != 0 ?
      <>
        <div className={css.wrapper}>
          <Checkbox title="" type="radio" arr={organizationDetails} />
        </div>

      </>
      : ""
    }
  </>

}
export default GenderData
