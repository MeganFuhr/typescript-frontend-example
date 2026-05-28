import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Page01 from './pages/Page01';
import Page02 from './pages/Page02';
import Page03 from './pages/Page03';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="page/01" element={<Page01 />} />
          <Route path="page/02" element={<Page02 />} />
          <Route path="page/03" element={<Page03 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

