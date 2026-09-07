export const registerUser = async ({ fullName, email, password, confirmPassword }) => {
    const response = await fetch('http://localhost:3000/v1/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            fullName,
            email,
            password,
            confirmPassword,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
};
