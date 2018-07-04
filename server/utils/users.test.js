const expect = require('expect');
const {Users}  = require('./users');

describe('Users', () => {
    var users;

    beforeEach(()=>{
       users = new Users();
       users.users=[{
           id: '1',
           name: 'Afzal',
           room: "A"
            },
            {
               id: '2',
               name: 'Yousuf',
               room: "B"
            },
            {
               id: '3',
               name: 'Hunain',
               room: "A"
            }
       ]
    });

    it('should create new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'hunain',
            room: 'Room A'
        };
        let result = users.addUsers(user.id, user.name, user.room);
        expect(result).toInclude(user);
    });

    it('should find user', () => {
        let id = '1';
        let user = users.getUser(id);
        expect(user.id).toBe(id);
    });

    it('should not find user', () => {
        let id = '123';
        let user = users.getUser(id);
        expect(user).toNotExist();
    });

    it('should return names for room A', () =>{
       let names = users.getUserList('A');
       expect(names).toEqual(['Afzal', 'Hunain'])
    });

    it('should return names for room B', () =>{
        let names = users.getUserList('B');
        expect(names).toEqual(['Yousuf']);
    });

    it('should remove user', () => {
        let id = '1';
        let user = users.removeUser(id);
        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let id = '12';
        let user = users.removeUser(id);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});
