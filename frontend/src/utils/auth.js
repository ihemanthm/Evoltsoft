// Helper function to get cookie by name
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null; // For SSR
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Get the authentication token
export const getAuthToken = () => {
  return localStorage.getItem('token') || getCookie('token');
};

// Get the current user data
export const getCurrentUser = () => {
  const userFromLocal = localStorage.getItem('user');
  const userFromCookie = getCookie('user');
  
  try {
    return userFromLocal 
      ? JSON.parse(userFromLocal) 
      : (userFromCookie ? JSON.parse(decodeURIComponent(userFromCookie)) : null);
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Set authentication data
export const setAuthData = (token, user, rememberMe = false) => {
  // Store in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  
  // Calculate expiration (7 days from now if rememberMe is true, otherwise session cookie)
  const expirationDate = new Date();
  const expirationDays = rememberMe ? 7 : 0; // 0 means session cookie
  
  if (expirationDays > 0) {
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
  }
  
  // Store in cookies
  const expires = expirationDays > 0 ? `; expires=${expirationDate.toUTCString()}` : '';
  document.cookie = `token=${token}${expires}; path=/; SameSite=Lax`;
  document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}${expires}; path=/; SameSite=Lax`;
  
  // Set axios default authorization header
  if (typeof window !== 'undefined') {
    import('./api').then(apiModule => {
      const api = apiModule.default;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
  }
};

// Clear authentication data
export const clearAuthData = () => {
  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Clear cookies
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Clear axios default authorization header
  if (typeof window !== 'undefined') {
    import('./api').then(apiModule => {
      const api = apiModule.default;
      delete api.defaults.headers.common['Authorization'];
    });
  }
};
