import React, { useState } from 'react';

// A class or functional component for handling New User creation
const NewUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleCreateUser = () => {
        // Logic to create a new user, e.g., an API call to create a user
        if (username && email) {
            console.log('Creating user:', { username, email });
            // Here, you would send the username and email to your backend
            // For example, using fetch or axios to POST the data
            alert('User created successfully!');
        } else {
            alert('Please fill out both fields.');
        }
    };

    return (
        <div>
            <h2>Create New User</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <button type="button" onClick={handleCreateUser}>
                    Create User
                </button>
            </form>
        </div>
    );
};

export default NewUser;
