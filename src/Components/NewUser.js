import React, { useState } from 'react';

// En funktionell komponent för att hantera skapandet av nya användare
const NewUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleCreateUser = () => {
        if (username && email) {
            // API-URL till din backend-endpoint
            const apiUrl = 'http://localhost:8080/api/users'; // Uppdatera med din faktiska backend-URL

            // Skicka användarnamn och e-post till backend
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }), // Konvertera data till JSON
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
                // Återställ formulärfält efter lyckad skapelse
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
    }

    return (
        <div>
            <h2>Create New User</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleCreateUser}>Create User</button>
        </div>
    );
}

export default NewUser;
