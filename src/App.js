import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './Pages/Landing';
import { Charecters } from './Pages/Charecters';
import { SpaceCrafts } from './Pages/SpaceCrafts';
import { Planets } from './Pages/Planets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Landing />} />
          <Route path="/planets" element={<Planets />} />
            <Route path="/characters" element={<Charecters/>} />
          <Route path="/starship" element={<SpaceCrafts/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
