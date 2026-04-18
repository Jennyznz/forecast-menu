import request from 'supertest';
import app from '../src/server/app.js';
import { User } from '../src/server/models/User.js';
import bcrypt from 'bcrypt';

// Intercept calls to models
jest.mock('../src/server/models/User.js');
jest.mock('bcrypt');

describe('Auth Routes', () => {

    // REGISTRATION
    describe('POST /auth/register', () => {
        it('should create a new user and redirect to login', async () => {
            // Create a fake user object
            User.create.mockResolvedValue({ id: 1, email: 'test@test.com' });

            // Send mock form data to route
            const res = await request(app)
                .post('/auth/register')
                .send({
                    email: 'mock@mock.com',
                    password: 'onetwothree123'
                });

            expect(res.statusCode).toEqual(302); // Check for a redirect status after successful sign up
            expect(res.headers.location).toBe('/login'); // Check that the redirect is to the login page
        });
    });

    // LOGIN SUCCESS
    test('POST /auth/login should redirect to home on success', async () => {
        // Setup mock database response
        User.findByEmail.mockResolvedValue({
            id: 1,
            email: 'mock@example.com',
            password_hash: 'mockpassy' 
        });

        // Force bcrypt to always return true
        bcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password321' });

        expect(response.status).toBe(302); // Check for a redirect status code
        expect(response.header.location).toBe('/'); // Check that the redirect brings users back to the homepage/calendar view
    });


    // LOGIN FAIL
    test('POST /auth/login should fail if password is "wrong"', async () => {
        User.findByEmail.mockResolvedValue({ 
            id: 1, 
            email: 'test@example.com' });

        // Force bcrypt to return false 
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password321' });

        expect(response.status).not.toBe(302); // There should be no redirect. Stay on login.
    });
});
