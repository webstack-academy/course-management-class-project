import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomeComponent from "./components/home";

console.log('sono la modifica critica')

//CIAO 
//questo è il mio 
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomeComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
