const supertest = require('supertest');
//const router = require('./routers'); 
//var expect = require('expect.js')
const app = require('./server')
// Replace 'app' with the path to your Express.js or other API app.
const request = require('supertest')
//const api = supertest(app);

//https://www.linkedin.com/pulse/how-test-api-nodejs-serdar-zeybek-hxfbf



describe('API Testing with Supertest', () => {

  it('responds with json', function(done) {
    request(app)
      .get('/api/item')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should create an item', function(done) {
    request(app)
      .post('/api/item/additem')
      .send({item_name:'testitem',amount_in_stock:5 ,price:100 ,description:'testitem', category:'testitems'})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      
        });
        
  });

  it('should delete an item', function(done) {
    request(app)
      .del('/api/item/deleteitem?itemname=testitem')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(204)
      .end(done);
  });

  it('create a user', function(done) {
    request(app)
      .post('/api/user/adduser')
      .send({user_email: 'tests@run', username: 'testsrun', address: 'testaddress', post_number:'90000', card_pan:'1234123412341234', card_exp_date:'12/12', card_security_code: '123', password: 'testpassword11', firstname: 'tests', lastname: 'run'})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect('{"msg":"user added"}')
      .end(done);
  });

  it('should get 401, because no jwt auth',function(done){
    request(app)
      .get('/api/user/loggedinuserinfo?user_email=tests@run')
      .set('Accept', 'application/json')
      .expect(401)
      .end(done);
  })

  it('delete a user', function(done) {
    request(app)
      .del('/api/user/deleteuser?username=testsrun')
      .set('Accept', 'application/json')
      .expect(200)
      .expect("User deleted")
      .end(done);
  });

});
 