/**
 * Created by Syed Afzal
 */
const expect = require('expect');
const {generateMessage}  = require('./messages');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Test';
        let text = 'Testing purpose text';
        let meesage = generateMessage(from, text);
        expect(meesage.createdAt).toBeA('number')
        expect(meesage).toInclude({from, text})
    })
})