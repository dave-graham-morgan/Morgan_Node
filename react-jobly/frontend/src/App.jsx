import React, {useEffect} from "react";
import AppRouter from "./AppRouter.jsx";
import NavBar from "./NavBar.jsx";

function App() {
    useEffect(() => {
        document.title = "Jobly"
    }, []);


  return (
    <>

        <AppRouter/>
    </>
  )
}

export default App
