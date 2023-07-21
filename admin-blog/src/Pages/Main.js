
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Admin from "./Admin"
import ArticleList from './ArticleList'
import AddArticle from './AddArticle'
function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/admin/*" element={<Admin/>}>
                    <Route path="list" element={<ArticleList/>}></Route>
                    <Route path=":id?" element={<AddArticle/>}></Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default Main
