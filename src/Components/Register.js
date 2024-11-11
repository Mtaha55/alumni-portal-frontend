import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: '',
        employmentStatus: '',
        acceptedAgreement: false,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Validate and handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword, acceptedAgreement } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
        } else if (!acceptedAgreement) {
            setError('You must accept the agreement to register.');
        } else {
            setError('');
            // Add your registration logic here (e.g., API call)
            console.log('Form Submitted', formData);
            // Redirect to another page upon successful registration
            navigate('/profile');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="organization">
                            <Form.Control
                                as="select"
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                            >
                                <option value="">Select Organisation</option>
                                <option value="Org1">Organisation 1</option>
                                <option value="Org2">Organisation 2</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Check
                                inline
                                label="Currently Employed"
                                name="employmentStatus"
                                type="radio"
                                value="currentlyEmployed"
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                label="Previously Employed"
                                name="employmentStatus"
                                type="radio"
                                value="previouslyEmployed"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="firstName">
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Check
                                type="checkbox"
                                name="acceptedAgreement"
                                label="Do you accept the Agreement?"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="mt-3" block>
                            Proceed
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
