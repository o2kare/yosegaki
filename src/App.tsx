import React from 'react'
import Component from "./content"
import './App.css'
import {BrowserRouter as Router} from "react-router-dom"

function App() {
    return (
        <Router>
            <div className={"App"}>
                <Component/>
            </div>
        </Router>
    )
}

export default App
