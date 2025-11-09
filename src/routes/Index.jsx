import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";
import Report from "../pages/Report"

export default function Routers(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element ={<Home />}/>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/detail" element={<Detail/>}  />
                <Route path="/Report" element={<Report/>} />
            </Routes>
            
        </BrowserRouter>

    )
}