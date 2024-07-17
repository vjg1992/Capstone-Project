import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './accountInfo.css';
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    addresses: []
  });
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Please log in to view account details.', {
        position: 'top-center'
      });
      navigate('/login');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
    setIsChanged(true);
  };

  const handleEdit = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field]
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userDetails)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Details updated successfully!');
        setUserDetails(data);
      } else {
        toast.error(data.msg || 'Error updating details');
      }
    } catch (error) {
      toast.error('Error updating details');
      console.error('Error:', error);
    }
  };

  const handleAddAddress = () => {
    setUserDetails({
      ...userDetails,
      addresses: [
        ...userDetails.addresses,
        { fullname: '', contactNo: '', address: '', pincode: '' }
      ]
    });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = userDetails.addresses.map((address, idx) => 
      idx === index ? { ...address, [name]: value } : address
    );
    setUserDetails({ ...userDetails, addresses: updatedAddresses });
    setIsChanged(true);
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = userDetails.addresses.filter((_, idx) => idx !== index);
    setUserDetails({ ...userDetails, addresses: updatedAddresses });
    setIsChanged(true);
  };

  return (
    <div className="account-info">
      <h2>Account Info</h2>
      <div className="account-info-section">
        <label>Name:</label>
        {editMode.name ? (
          <input 
            type="text" 
            name="name" 
            value={userDetails.name} 
            onChange={handleChange} 
          />
        ) : (
          <span>{userDetails.name}</span>
        )}
        <button onClick={() => handleEdit('name')}>Edit</button>
      </div>
      <div className="account-info-section">
        <label>Email:</label>
        {editMode.email ? (
          <input 
            type="text" 
            name="email" 
            value={userDetails.email} 
            onChange={handleChange} 
          />
        ) : (
          <span>{userDetails.email}</span>
        )}
        <button onClick={() => handleEdit('email')}>Edit</button>
      </div>
      <div className="account-info-section">
        <label>Mobile:</label>
        {editMode.mobile ? (
          <input 
            type="text" 
            name="mobile" 
            value={userDetails.mobile} 
            onChange={handleChange} 
          />
        ) : (
          <span>{userDetails.mobile}</span>
        )}
        <button onClick={() => handleEdit('mobile')}>Edit</button>
      </div>
      <div className="account-info-section">
        <label>Password:</label>
        {editMode.password ? (
          <>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={userDetails.password} 
              onChange={handleChange} 
            />
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              value={userDetails.confirmPassword} 
              onChange={handleChange} 
              placeholder="Confirm password" 
            />
            <label>
              <input 
                type="checkbox" 
                checked={showPassword} 
                onChange={handlePasswordToggle} 
              />
              Show Password
            </label>
          </>
        ) : (
          <span>********</span>
        )}
        <button onClick={() => handleEdit('password')}>Edit</button>
      </div>
      <div className="addresses">
        <h3>Addresses</h3>
        {userDetails.addresses.length === 0 ? (
          <p>No addresses found.</p>
        ) : (
          userDetails.addresses.map((address, index) => (
            <div key={index} className="address-section">
              <div className="account-info-section">
                <label>Full Name:</label>
                <input 
                  type="text" 
                  name="fullname" 
                  value={address.fullname} 
                  onChange={(e) => handleAddressChange(index, e)} 
                />
              </div>
              <div className="account-info-section">
                <label>Contact No:</label>
                <input 
                  type="text" 
                  name="contactNo" 
                  value={address.contactNo} 
                  onChange={(e) => handleAddressChange(index, e)} 
                />
              </div>
              <div className="account-info-section">
                <label>Address:</label>
                <input 
                  type="text" 
                  name="address" 
                  value={address.address} 
                  onChange={(e) => handleAddressChange(index, e)} 
                />
              </div>
              <div className="account-info-section">
                <label>Pincode:</label>
                <input 
                  type="text" 
                  name="pincode" 
                  value={address.pincode} 
                  onChange={(e) => handleAddressChange(index, e)} 
                />
              </div>
              <button onClick={() => handleRemoveAddress(index)}>Remove</button>
            </div>
          ))
        )}
        <button onClick={handleAddAddress}>+ Add Address</button>
      </div>
      {isChanged && <button onClick={handleSave}>Save</button>}
      <ToastContainer />
    </div>
  );
};

export default AccountInfo;
