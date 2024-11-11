import React, { useState } from 'react';

const Messaging = () => {
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('');
    const [group, setGroup] = useState([]);
    const [isGroupMessage, setIsGroupMessage] = useState(false);

    const handleSendMessage = () => {
        if (isGroupMessage) {
            // Example of sending a group message
            console.log('Sending group message:', message, 'to:', group);
            alert('Group message sent!');
        } else {
            // Example of sending a direct message
            console.log('Sending direct message:', message, 'to:', recipient);
            alert('Direct message sent!');
        }

        // Reset the form
        setMessage('');
        setRecipient('');
        setGroup([]);
    };

    return (
        <div>
            <h2>Messaging Functionality</h2>
            <div>
                <label>
                    <input 
                        type="radio" 
                        checked={!isGroupMessage} 
                        onChange={() => setIsGroupMessage(false)} 
                    />
                    Direct Message
                </label>
                <label>
                    <input 
                        type="radio" 
                        checked={isGroupMessage} 
                        onChange={() => setIsGroupMessage(true)} 
                    />
                    Group Message
                </label>
            </div>

            {isGroupMessage ? (
                <div>
                    <label>Group Recipients (comma-separated):</label>
                    <input 
                        type="text" 
                        value={group.join(', ')} 
                        onChange={(e) => setGroup(e.target.value.split(',').map(user => user.trim()))} 
                    />
                </div>
            ) : (
                <div>
                    <label>Recipient:</label>
                    <input 
                        type="text" 
                        value={recipient} 
                        onChange={(e) => setRecipient(e.target.value)} 
                    />
                </div>
            )}

            <div>
                <label>Message:</label>
                <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
            </div>

            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
};

export default Messaging;
