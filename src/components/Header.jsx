import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <h1>Marketio</h1>
      <nav>
        <ul className="flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link href="/sign">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <SearchBar />
    </header>
  );
};

export default Header;
