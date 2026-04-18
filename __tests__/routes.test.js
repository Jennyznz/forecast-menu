import request from 'supertest';
import app from '../src/server/app.js';
import { User } from '../src/server/models/User.js'; 
import { WeeklyPlan } from '../src/server/models/WeeklyPlan.js';

// Models do not interact with the real SQL database
jest.mock('../src/server/models/User.js');
jest.mock('../src/server/models/WeeklyPlan.js');

describe('GET / (Calendar View)', () => {
    it('Should redirect to /login if the user is not authenticated', async () => {
        const res = await request(app).get('/');
        
        expect(res.statusCode).toEqual(302); // Check for a redirect status code
        expect(res.headers.location).toBe('/login'); 
    });

    it('Should load the calendar if the user is logged in', async () => {
        // Mock model returns an empty array rather than looking in the database
        WeeklyPlan.getByUserId.mockResolvedValue([]);

        // Stimulates a logged in session
        const res = await request(app)
            .get('/')
            .set('Cookie', ['userId=1']); 

        expect(res.statusCode).toEqual(200); // Check for successful page load
        expect(res.text).toContain('Weekly Meal Plan'); // Check that the correct HTML page is rendered
    });
});

