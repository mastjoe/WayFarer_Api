import {assert} from 'chai';
import sinon from 'sinon';
import request from 'request';

describe('User Sign Up', () => {
    before(() => {
      sinon.stub(request,'get')
      .yields(null, null, JSON.stringify({
          id: 1,
          title: 'hello',
        }));
    });

    it('get api returns an object', (done) => {
        getApi(1).then(function(todo){
            assert.isObject(todo);
            done();
        })
        .catch(function(e){
            done(e);
        });
    });
});