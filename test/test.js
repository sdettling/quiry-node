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

describe('Questions', function () {
  describe('GET /api/questions', function(){
    it('responds with json', function(done){done();})
  });
  describe('POST /api/questions', function(){
    it('responds with json on success', function(done){
      var question = { description : 'My question?', minSelections : 1, maxSelections: 4, ranked: false, published: false, choices: [ {description: 'choice 1'}, {description: 'choice 2'}, {description: 'choice 3'}, {description: 'choice 4'}]};
      request(app)
        .post('/api/questions')
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic c3RldmU6cGFzc3dvcmQ=')
        .send(question)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          expect(res.body.status).to.equal("success");
          expect(res.body.data._id).not.to.be.null;
          done();
        });
    })
    it('should not have less than 2 choices', function(done){
      var question = { description : 'My question?', minSelections : 1, maxSelections: 1, ranked: false, published: false, choices: [ {description: 'choice 1'}]};
      request(app)
        .post('/api/questions')
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic c3RldmU6cGFzc3dvcmQ=')
        .send(question)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          expect(res.body.status).to.equal("error");
          expect(res.body.message).to.equal("Question must have at least 2 choices");
          done();
        });
    })
    it('min selections should be greater than 0', function(done){
      var question = { description : 'My question?', minSelections : 0, maxSelections: 1, ranked: false, published: false, choices: [ {description: 'choice 1'}, {description: 'choice 2'}]};
      request(app)
        .post('/api/questions')
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic c3RldmU6cGFzc3dvcmQ=')
        .send(question)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          expect(res.body.status).to.equal("error");
          expect(res.body.message.minSelections.message).to.equal("Path `minSelections` () is less than minimum allowed value (1).");
          done();
        });
    })
    it('max selections should be greater than 0', function(done){done();})
    it('max selections should be less than or equal to total choices', function(done){done();})
    it('min selections should be less than or equal to max selections', function(done){done();})
    it('min and max selections should be equal when question type is ranked', function(done){done();})
    it('should belong to a user', function(done){done();})
    it('should have a description less than 300 characters', function(done){done();})
    it('should return unauthorized if user not logged in', function(done){done();})
    it('should have unique choices', function(done){done();})
  });
  describe('PUT /api/questions', function(){
    it('responds with json', function(done){done();})
    it('should not replace identical choices', function(done){done();})
  });
  describe('DELETE /api/questions', function(){
    it('responds with json', function(done){done();})
    it('deletes the specified question', function(done){done();})
  });
});

/*
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
        expect(res.body).to.have.length.above(0);
        done();
      });
  });

  it("doesn't duplicate user", function(done){
    var user = { username : 'test', password : 'TestPass!'};
    request(app)
      .post("/api/users")
      .send(user)
      .expect(200)
      .end(function(err, res){
        //console.log(res.body)
        expect(res.body.message).to.equal('Submitted username already exists');
        done();
      });
      //.expect('{"message":"New user added!"}', done);
  });
});
*/
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