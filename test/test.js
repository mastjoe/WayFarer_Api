import chai from 'chai';
import chatHttp from 'chai-http';
import app from '../src/app';

const {assert} = chai;
chai.use(chatHttp);
describe('Testing WayFarer Api:', () => {
    // sign up test...
    // sign up fails at incomplete parameters...
    it('Users sign up needs email field', (done) => {
        let user = {
            first_name: 'simon',
            last_name: 'great',
            password:'password'
        };
        chai.request(app).post('/api/v1/signup')
        .set('Accept','application/json')
        .send(user)
        .end((err, res) => {
            assert.equal(res.status,422,'email field required');
            done();
        });
    });

    it('Users can sign up', (done) => {
        let user = {
            first_name: 'john',
            last_name: 'doe',
            email: 'johndoe@gmail.com',
            password: 'password',
        };

        chai.request(app).post('/api/v1/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            assert.equal(res.status,201,'user profile not created!');
            done();
        });
    });
});