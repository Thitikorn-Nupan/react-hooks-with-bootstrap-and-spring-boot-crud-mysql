import {MenuComponent} from "./components/menu/MenuComponent.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CrudStudentComponent} from "./components/program/CrudStudentComponent.tsx";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <MenuComponent/>
            <Routes>
                <Route path={"/crud-student"} element={<CrudStudentComponent/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
