
import { useState } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { useCart } from '../context/context';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { cartCount, setIsCartOpen } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(
      activeDropdown === name ? null : name
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* BRAND */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-black tracking-tighter"
        >
          JEYLEY<span className="text-gray-500">.</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>

          <Link to="/shop" className="hover:text-gray-500">
            Shop All
          </Link>

          {/* MEN */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('men')}
              className="flex items-center gap-1 hover:text-gray-500"
            >
              Men <ChevronDown size={15} />
            </button>

            {activeDropdown === 'men' && (
              <div className="absolute top-8 left-0 w-48 bg-white shadow-lg border rounded-lg py-2">
                <Link
                  to="/men?type=sneakers"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Sneakers
                </Link>

                <Link
                  to="/men?type=official"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Official Shoes
                </Link>
              </div>
            )}
          </div>

          {/* LADIES */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('ladies')}
              className="flex items-center gap-1 hover:text-gray-500"
            >
              Ladies <ChevronDown size={15} />
            </button>

            {activeDropdown === 'ladies' && (
              <div className="absolute top-8 left-0 w-48 bg-white shadow-lg border rounded-lg py-2">
                <Link
                  to="/ladies?type=sneakers"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Sneakers
                </Link>

                <Link
                  to="/ladies?type=official"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Official Shoes
                </Link>
              </div>
            )}
          </div>

          <Link to="/heels" className="hover:text-gray-500">
            Heels
          </Link>

        </div>

        {/* CART AND MOBILE MENU */}
        <div className="flex items-center gap-5">

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag size={24} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-5 flex flex-col gap-5 font-medium">

          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/shop" onClick={closeMenu}>Shop All</Link>
          <Link to="/men" onClick={closeMenu}>Men</Link>
          <Link to="/ladies" onClick={closeMenu}>Ladies</Link>
          <Link to="/heels" onClick={closeMenu}>Heels</Link>

        </div>
      )}

    </header>
  );
}

export default Navbar;
