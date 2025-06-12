import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./componentsAdmin/AddUser";
import UserList from "./componentsAdmin/UserList";
import EditUser from "./componentsAdmin/EditUser";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList/>}/>
          <Route path='add' element={<AddUser/>}/>
          <Route path='edit/:id' element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
