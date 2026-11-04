

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/context';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductSection from './components/productsection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

import Men from './pages/Men';
import Ladies from './pages/Ladies';
import Heels from './pages/heels';
import Collection from './pages/Collection';

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductSection />
    </>
  );
}

function Shop() {
  return <Collection title="All Shoes" />;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/men" element={<Men />} />
          <Route path="/ladies" element={<Ladies />} />
          <Route path="/heels" element={<Heels />} />
        </Routes>

        <Footer />
        <CartDrawer />

      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
