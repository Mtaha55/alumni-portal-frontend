import React, { Component, useState } from 'react';
import NewUser from Components/NewUser;

const AdminDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('');

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                <li onClick={() => handleMenuClick('newUser')}>New Users</li>
                <li onClick={() => handleMenuClick('allUsers')}>All Users</li>
                <li onClick={() => handleMenuClick('organisations')}>Organisations</li>
                <li onClick={() => handleMenuClick('accessManagement')}>Access Management</li>
            </ul>

            <div>
                {activeComponent === 'newUser' && <NewUser />}
                {/* Include other components similarly */}
            </div>
        </div>
    );
};

export default AdminDashboard;
