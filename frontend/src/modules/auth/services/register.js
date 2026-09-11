import axios from 'axios';

export const registerUser = async ({ fullName, email, password, confirmPassword }) => {
    const response = await axios.post(
        'http://localhost:3000/v1/api/auth/register',
        {
            fullName,
            email,
            password,
            confirmPassword,
        },
        {
            withCredentials: true,
        }
    );

    return response.data;
};
