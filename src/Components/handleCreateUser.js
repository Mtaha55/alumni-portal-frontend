
const handleCreateUser = () => {
    if (username && email) {
        // API URL for your backend endpoint
        const apiUrl = 'http://localhost:8080/api/users'; // Update with your actual backend URL

        // Send the username and email to the backend
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email }), // Convert data to JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            return response.json();
        })
        .then(data => {
            console.log('User created:', data);
            alert('User created successfully!');
            // Optionally, reset form fields after successful creation
            setUsername('');
            setEmail('');
        })
        .catch(error => {
            console.error('Error creating user:', error);
            alert('Failed to create user. Please try again.');
        });
    } else {
        alert('Please fill out both fields.');
    }
};