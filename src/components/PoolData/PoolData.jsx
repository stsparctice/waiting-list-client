import React, { useEffect, useState,createContext, useContext, useReducer } from "react";
import { json } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { getData } from "../../services/axios";
import DropDown from "../DropDown/DropDown";
const PoolData =  () => {
  const [ details, setDetails ] = useState([])
  // const[poolName,setPoolName]=useReducer(DetailsReducer,{data})

  useEffect(() => {
      async function GetPoolsData() {
      const res = await getData('/pool/getAll')
      setDetails(res);
      return res
    }
    GetPoolsData()
  }, [])


  return <>

    <DropDown thedetails={details} />
  </>
}
export default PoolData