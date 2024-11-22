import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || '',
          email: currentUser.email || '',
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const linkClasses = ({ isActive }) =>
    isActive ? ' text-basicRed block p-2' : 'block p-2';

  return (
    <div className="flex">
      <aside className="w-1/4 p-5 border-r">
        <h2 className="mb-4 font-semibold">Manage My Account</h2>
        <nav>
          <NavLink to="profile" className={linkClasses}>
            My Profile
          </NavLink>
          <NavLink className={linkClasses} to="address">
            Address Book
          </NavLink>
          <NavLink className={linkClasses} to="wishlist">
            My Wishlist
          </NavLink>
          <NavLink className={linkClasses} to="payment">
            My Payment Options
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Account;
