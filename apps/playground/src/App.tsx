import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Play from './pages/Play'
import AppLayout from './components/AppLayout'
import Ast from './pages/Ast'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Play />} />
          <Route path='ast' element={<Ast />} />
          <Route path='*' element={<Play />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
