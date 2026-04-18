import { getTempCategory } from '../src/server/services/weatherService.js';

describe('Weather Service Logic', () => {
    test('getTempCategory should return "Hot" for 90 degrees', () => {
        const result = getTempCategory(90);
        expect(result).toBe('Hot');
    });

    test('getTempCategory should return "Cold" for 20 degrees', () => {
        const result = getTempCategory(20);
        expect(result).toBe('Cold');
    });
});
