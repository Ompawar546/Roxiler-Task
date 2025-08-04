import { useState } from 'react';

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    const { name, email, address, password } = formData;

    if (name.length < 20 || name.length > 60) return 'Name must be 20-60 characters.';
    if (address.length > 400) return 'Address must be under 400 characters.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email.';
    if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(password)
    )
      return 'Password must be 8-16 characters, include 1 uppercase and 1 special character.';

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMsg = validateForm();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('User added successfully.');
      setFormData({
        name: '',
        email: '',
        address: '',
        password: '',
        role: 'user',
      });
    } catch (err) {
      setError('Error adding user.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      maxWidth: '450px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      transition: 'transform 0.2s ease'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    iconContainer: {
      width: '64px',
      height: '64px',
      backgroundColor: '#f3e5f5',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    icon: {
      width: '32px',
      height: '32px',
      color: '#7b1fa2'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#666',
      fontSize: '14px',
      margin: 0
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#7b1fa2',
      boxShadow: '0 0 0 3px rgba(123, 31, 162, 0.1)'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none',
      resize: 'none',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box'
    },
    selectContainer: {
      position: 'relative'
    },
    select: {
      width: '100%',
      padding: '12px 16px 12px 48px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none',
      backgroundColor: 'white',
      appearance: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    },
    selectIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: '#666',
      pointerEvents: 'none'
    },
    selectArrow: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: '#666',
      pointerEvents: 'none'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #7b1fa2 0%, #e91e63 100%)',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(123, 31, 162, 0.3)'
    },
    errorMessage: {
      marginTop: '16px',
      padding: '16px',
      backgroundColor: '#ffebee',
      borderLeft: '4px solid #f44336',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'flex-start'
    },
    successMessage: {
      marginTop: '16px',
      padding: '16px',
      backgroundColor: '#e8f5e8',
      borderLeft: '4px solid #4caf50',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'flex-start'
    },
    messageIcon: {
      width: '20px',
      height: '20px',
      marginRight: '8px',
      flexShrink: 0,
      marginTop: '2px'
    },
    messageText: {
      fontSize: '14px',
      margin: 0
    },
    errorText: {
      color: '#d32f2f'
    },
    successText: {
      color: '#2e7d32'
    }
  };

  const [focusedInput, setFocusedInput] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return (
          <svg style={styles.selectIcon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'store-owner':
        return (
          <svg style={styles.selectIcon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg style={styles.selectIcon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 style={styles.title}>Add New User</h2>
          <p style={styles.subtitle}>Create a new user account</p>
        </div>

        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="name"
              placeholder="Enter full name (20-60 characters)"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput('')}
              style={{
                ...styles.input,
                ...(focusedInput === 'name' ? styles.inputFocus : {})
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {})
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              name="address"
              placeholder="Enter address (max 400 characters)"
              value={formData.address}
              onChange={handleChange}
              onFocus={() => setFocusedInput('address')}
              onBlur={() => setFocusedInput('')}
              rows="3"
              style={{
                ...styles.textarea,
                ...(focusedInput === 'address' ? styles.inputFocus : {})
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="8-16 chars, 1 uppercase, 1 special character"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
              style={{
                ...styles.input,
                ...(focusedInput === 'password' ? styles.inputFocus : {})
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>User Role</label>
            <div style={styles.selectContainer}>
              {getRoleIcon(formData.role)}
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                onFocus={() => setFocusedInput('role')}
                onBlur={() => setFocusedInput('')}
                style={{
                  ...styles.select,
                  ...(focusedInput === 'role' ? styles.inputFocus : {})
                }}
              >
                <option value="user">Normal User</option>
                <option value="admin">Admin</option>
                <option value="store-owner">Store Owner</option>
              </select>
              <svg style={styles.selectArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              ...styles.button,
              ...(isHovering ? styles.buttonHover : {})
            }}
          >
            Add User
          </button>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            <svg style={{...styles.messageIcon, color: '#f44336'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p style={{...styles.messageText, ...styles.errorText}}>{error}</p>
          </div>
        )}

        {success && (
          <div style={styles.successMessage}>
            <svg style={{...styles.messageIcon, color: '#4caf50'}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p style={{...styles.messageText, ...styles.successText}}>{success}</p>
          </div>
        )}
      </div>
    </div>
  );
}