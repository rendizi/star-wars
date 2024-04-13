import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from './Pages/NotFound';
import { Landing } from './Pages/Landing';
import { Charecters } from './Pages/Charecters';
import { SpaceCrafts } from './Pages/SpaceCrafts';
import { Worlds } from './Pages/Worlds';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Landing />} />
          <Route path="/worlds" element={<Worlds />} />
            <Route path="/characters" element={<Charecters/>} />
          <Route path="/starship" element={<SpaceCrafts/>} />
          <Route path="/*" element={<NotFound />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
