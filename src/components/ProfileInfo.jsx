import { useEffect, useState } from 'react';
import { useProductContext } from '../ProductContext';
import Button from './Button';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProfileInfo = () => {
  const { userData, saveUserData, currentUser } = useProductContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || '',
        address: userData.address || '',
      }));
      console.log(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          name: formData.name,
          email: formData.email,
          address: formData.address,
        },
        { merge: true }
      ); // Merge with existing data
      console.log('User info saved successfully');
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        address: userData.address || '',
        password: '',
      });
    }
  };

  const inputClasses =
    'outline-none max-w-sm bg-[#F4F4F5] dark:bg-darkSecondary rounded-md py-2 px-3';

  return (
    <div className="pl-2">
      <h3>My Profile</h3>
      <form className="flex flex-col gap-4 my-6">
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            className={inputClasses}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input
            className={inputClasses}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Address:</label>
          <input
            className={inputClasses}
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-6 mt-5">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <Button size="md" type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
