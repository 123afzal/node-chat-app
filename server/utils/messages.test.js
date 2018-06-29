/**
 * Created by Syed Afzal
 */
const expect = require('expect');
const {generateMessage, generateLocationMessage}  = require('./messages');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Test';
        let text = 'Testing purpose text';
        let meesage = generateMessage(from, text);
        expect(meesage.createdAt).toBeA('number')
        expect(meesage).toInclude({from, text})
    })

    it('should generate correct url', () => {
        let from = 'Admin';
        let latitude = 1;
        let longitude = 1;
        let url = `https:www.google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    })
})

