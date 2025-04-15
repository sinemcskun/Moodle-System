import axios from 'axios';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/token.php`,
      {
        params: {
          username,
          password,
          service: 'moodle_mobile_app'
        }
      }
    );
    
    if (response.data.token) {
      return { success: true, token: response.data.token };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
};