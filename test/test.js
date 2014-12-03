var chai = require('chai');
var request = require('supertest');
var express = require('express');

var app = require('../server.js');

var assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed


var foobar = {
  sayHello: function() {
    return 'Hello World!';
  }
};

describe('Foobar', function() {
  describe('#sayHello()', function() {
    it('should work with assert', function() {
      assert.equal(foobar.sayHello(), 'Hello World!');
    })

    it('should work with expect', function() {
      expect(foobar.sayHello()).to.equal('Hello World!');
    })

    it('should work with should', function() {
      foobar.sayHello().should.equal('Hello World!');
    })
  })
})

describe('GET /api/questions', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/questions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        console.log(res.body.length)
        expect(res.body).to.have.length.above(5);
        done();
      });
  })
})

/*describe("Posting is easy to test with supertest", function (){
 
  it("posts a new user to api/users", function(done){
    var user = { username : 'test', password : 'TestPass!'};
 
    request(app)
      .post("/api/users")
      .send(user)
      .expect(200)
      .expect('{"message":"New user added!"}', done);
  });
});*/

//tests

//authentication works
//authorization works
//question has at least 2 choices
//max choices is greater or equal to min choices
//max choices is less than or equal to total choices
//min choices is less than or equal to max choices
//if ranked question min and max should be equal
//question char length shouldn't be greater than x chars
//choice char length shouldn't be greater than x chars
//