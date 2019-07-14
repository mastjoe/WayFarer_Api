import chai from 'chai';
import chatHttp from 'chai-http';
import app from '../src/app';

const {assert} = chai;
const {expect} = chai;

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

    // prototype user
    let suffix = Date.now();
    const testUser = {
        first_name: 'john',
        last_name: 'doe',
        email: `john${suffix}@gmail.com`,
        password: 'password',
    };

    it('Users can sign up', (done) => {
        
        chai.request(app).post('/api/v1/signup')
        .set('Accept', 'application/json')
        .send(testUser)
        .end((err, res) => {
            assert.equal(res.status,201,'user profile not created!');
            done();
        });
    });

    // login test...
    // email requirement for login...
    it('user sign in should require email', (done) =>{
        let loginData = {
            password:testUser.password
        };
        chai.request(app).post('/api/v1/signin')
        .set('Accept','application/json')
        .send(loginData)
        .end((err, res) => {
            assert.equal(res.status,422,'does not return 422 on missing email');
            done();
        });
    });
    // email and password requirement for login...
    it('user sign in is possible with email and password fields', (done ) => {
        let loginData = {
            email: testUser.email,
            password: testUser.password
        }
        chai.request(app).post('/api/v1/signin')
        .set('Accept','application/json')
        .send(loginData)
        .end((err, res) => {
            assert.equal(res.status,200,'successful sign must return 200 status');
            done();
        });
    });

    it('user sign in response returns an object', (done) => {
        let loginData = {
            email: testUser.email,
            password: testUser.password
        }
        chai.request(app).post('/api/v1/signin')
        .set('Accept','application/json')
        .send(loginData)
        .end((err, res) => {
            assert.isObject(res,'response is not an object');
            done();
        });
    });

    it('user signin response object must return data and status', (done) => {
        let loginData = {
            email: testUser.email,
            password: testUser.password
        }
        chai.request(app).post('/api/v1/signin')
        .set('Accept','application/json')
        .send(loginData)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status');
            expect(res.body).to.has.property('data');
            expect(res.body.status).to.equal('success');
            done();
        });
    });

    // 
});