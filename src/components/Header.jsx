import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import heartIcon from '@assets/heart.svg';
import cartIcon from '@assets/cart.svg';

const Header = () => {
  let linkStyles = `hover:font-semibold hover:text-basicRed hover:underline transition-all duration-300`;
  return (
    <header className="w-full border-b border-gray-300 py-4">
      <div className="flex items-center justify-between w-10/12 mx-auto">
        <h1 className="text-2xl leading-6 font-bold">
          Mar<span className="text-basicRed">ket</span>io
        </h1>
        <nav>
          <ul className="flex text-base gap-10">
            <li className={linkStyles}>
              <Link to="/">Home</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/contact">Contact</Link>
            </li>
            <li className={linkStyles}>
              <Link to="/about">About</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/sign">Sign Up</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <SearchBar />
          <Link to="/favorite">
            <img src={heartIcon} alt="Favorite Icon" />
          </Link>
          <Link to="/cart">
            <img src={cartIcon} alt="cart Icon" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
