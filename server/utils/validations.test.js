const {isRealString} = require('../utils/validations');
const expect = require('expect');

describe('isRealString', () => {
    it('should reject non-string values', ()=>{
        let str = 904;
        let result = isRealString(str);
        expect(result).toBe(false);
    });

    it('should reject string values with only spaces', ()=>{
        let str = '       ';
        let result = isRealString(str);
        expect(result).toBe(false)
    });

    it('should allow string with non-space characters', ()=>{
        let str = 'Mike Tyson';
        let result = isRealString(str);
        expect(result).toBe(true);
    })
});