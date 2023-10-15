import React, { useRef, useState } from "react";
// import { createUseStyles } from "react-jss";
import { server } from "../../../services/axios";

const Delete = () => {

    const [state, setState] = useState({status:"embedded"});
    const noteref = useRef()

    const handleChangeID = event => {
        setState({...state, ID: event.target.value });
    }

    const handleChangeStatus = event => {
        setState({...state, status: event.target.id });
    }

    const handleSubmit = async event => {
        console.log(state);
        event.preventDefault()
        if (state.ID) {
            await server.post('patient/delete',{ID:state.ID,status:state.status})
                .then(res => {
                    console.log(res.data);
                    if (!res.data) {
                        noteref.current.innerHTML = "the id is wrong or not exist!"
                    }
                    else{
                        noteref.current.innerHTML = 
                        `you ${state.status} the patient: ${res.data[0].name}`
                    }
                })
        }
        else{
            noteref.current.innerHTML = "No ID!"
        }
    }

    return <>
        <div>
            <h1>Delete</h1>
            <p>
                <label>Insert the request ID:</label>
                <input type="text" onChange={handleChangeID} />
            </p>
            <p>
                <input type="radio" name="status" id="embedded" defaultChecked={true} onChange={handleChangeStatus}/>
                <label>Embedded</label>
                <br />
                <input type="radio" name="status" id="deleted" onChange={handleChangeStatus}/>
                <label>Deleted</label>
            </p>
            <p>
                <button onClick={handleSubmit}>Delete</button>
            </p>
            <h4 ref={noteref}>{}</h4>
        </div>
    </>
}
export default Delete;