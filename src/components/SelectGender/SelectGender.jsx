import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getAllGenders } from '../../store/genders'
import { stateStatus } from "../../store/storeStatus";
import Select from "react-select";

const SelectGender = ({ onSelect, value }) => {
  const dispatch = useDispatch()
  const genders = useSelector(state => state.Genders.genders)
  const genderStatus = useSelector(state => state.Genders.status)
  const [genderOptions, setGenderOptions] = useState([])
  const [genderValue, setGenderValue] = useState(undefined)
  useEffect(() => {
    if (genderStatus === stateStatus.EMPTY)
      dispatch(getAllGenders())
  }, [genderStatus, dispatch])

  useEffect(() => {
    if (genders.length ){
      setGenderOptions(genders.map(g => ({ label: g.name, value: g.id })))
    }
  }, [genders])

  useEffect(() => {
    console.log({genderOptions, value});
    if (value && genderOptions.length) {
      let selectedGender = genderOptions.find(g => g.value === value.id)
      setGenderValue(selectedGender)
    }
  }, [value, genderOptions])

  const selectGender = (val) => {
    onSelect(val)
  }
  return <>
    <Select placeholder="בחר..." options={genderOptions} value={genderValue? genderValue:undefined} onChange={selectGender}></Select>
  </>
}
export default SelectGender