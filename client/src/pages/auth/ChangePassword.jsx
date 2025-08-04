import { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validate = () => {
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) return 'New passwords do not match.';
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(newPassword))
      return 'New password must contain 1 uppercase & 1 special character.';
    if (newPassword.length < 8 || newPassword.length > 16)
      return 'Password must be 8-16 characters long.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/change-password`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Password updated successfully.');
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Failed to update password.');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        /><br />

        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        /><br />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Change Password</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
