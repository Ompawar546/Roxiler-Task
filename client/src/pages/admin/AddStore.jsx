import { useState } from 'react';

export default function AddStore() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    const { name, email, address } = formData;

    if (name.length < 20 || name.length > 60) return 'Name must be 20-60 characters.';
    if (address.length > 400) return 'Address must be under 400 characters.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format.';

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
      setSuccess('Store added successfully.');
      setFormData({ name: '', email: '', address: '' });
    } catch (err) {
      setError('Failed to add store.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #c5cae9 100%)',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      maxWidth: '400px',
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
      backgroundColor: '#e3f2fd',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    icon: {
      width: '32px',
      height: '32px',
      color: '#1976d2'
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
      borderColor: '#1976d2',
      boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)'
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
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #1976d2 0%, #3f51b5 100%)',
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
      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 style={styles.title}>Add New Store</h2>
          <p style={styles.subtitle}>Register a new store in the system</p>
        </div>

        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Store Name</label>
            <input
              name="name"
              placeholder="Enter store name (20-60 characters)"
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
              placeholder="store@example.com"
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
              placeholder="Enter store address (max 400 characters)"
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

          <button
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              ...styles.button,
              ...(isHovering ? styles.buttonHover : {})
            }}
          >
            Add Store
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