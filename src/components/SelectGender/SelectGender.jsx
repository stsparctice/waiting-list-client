import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getAllGenders } from '../../store/genders'
import { stateStatus } from "../../store/storeStatus";
import Select from "react-select";

const SelectGender = ({onSelect}) => {
  const dispatch = useDispatch()
  const genders = useSelector(state => state.Genders.genders)
  const genderStatus = useSelector(state => state.Genders.status)
  useEffect(() => {
    if (genderStatus === stateStatus.EMPTY)
      dispatch(getAllGenders())
  }, [genderStatus, dispatch])

  const selectGender = (val) => {
    onSelect(val)
  }
  return <>
  <Select placeholder="בחר..." options={genders.map(g => ({ label: g.name, value: g.id }))} onChange={selectGender}></Select>
  </>
}
export default SelectGender