import React, { useEffect, useState , useCallback} from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getAllPools } from '../../store/swimmingPools'
import { stateStatus } from "../../store/storeStatus";
import AutoComplete from "../../basic-components/AutoComplete/AutoComplete";

const PoolData =  () => {
  const dispatch = useDispatch()
    const pools = useSelector(state => state.SwimmingPools.pools)
    const poolsStatus = useSelector(state => state.SwimmingPools.status)

  useEffect(() => {
    if (poolsStatus === stateStatus.EMPTY)
    dispatch(getAllPools('/pool/getAll'))
  }, [poolsStatus, dispatch])

const selectPool = useCallback((val)=>{
console.log({val})
}, [])
  return <>
    <AutoComplete list={pools.map(p=>({value:p.name, id:p.id}))} func={selectPool}/>
  </>
}
export default PoolData