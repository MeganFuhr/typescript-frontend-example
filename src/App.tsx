import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Lazy load secondary pages (not the landing page for better initial load performance)
const Page01 = lazy(() => import('./pages/Page01'));
const Page02 = lazy(() => import('./pages/Page02'));
const Page03 = lazy(() => import('./pages/Page03'));

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

