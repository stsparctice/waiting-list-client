import React from "react";
import { createUseStyles } from "react-jss";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return <>

        <h1>home page crud</h1>
        <ul>
            <li><Link to="/read">Read</Link></li>
            <li><Link to="/delete">Delete</Link></li>
            <li><Link to="/Update">Update</Link></li>
            <li><Link to="/insert">Insert</Link></li>
            <li><Link to="/allButtons">All Buttons</Link></li>
        </ul>
        <hr />
        <Outlet></Outlet>
    </>
}
export default Navigation;
