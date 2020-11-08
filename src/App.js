import React from "react";
import { SideBar } from "./components/Sidebar/SideBar.component";
import Messages from "./components/Messages/Messages.component";

import './App.css';

function App() {
  return (
    <div>
      <SideBar />
      <div style={{paddingLeft : '350px'}}>
        <Messages />
      </div>
    </div>
  );
}

export default App;
