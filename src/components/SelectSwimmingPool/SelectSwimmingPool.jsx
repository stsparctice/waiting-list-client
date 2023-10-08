import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getAllPools } from '../../store/swimmingPools'
import { stateStatus } from "../../store/storeStatus";
import Select from "react-select";

const SelectSwimmingPool = ({ onSelect }) => {
  const dispatch = useDispatch()
  const pools = useSelector(state => state.SwimmingPools.pools)
  const poolsStatus = useSelector(state => state.SwimmingPools.status)
  useEffect(() => {
    if (poolsStatus === stateStatus.EMPTY)
      dispatch(getAllPools())
  }, [poolsStatus, dispatch])

  const selectPool = (val) => {
    console.log({val})
    onSelect(val)
  }
  return <>
    <Select placeholder="בחר..." options={pools.map(p => ({ label: p.name, value: p.id }))} onChange={selectPool}></Select>
  </>
}
export default SelectSwimmingPool