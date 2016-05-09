'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var mongoose = require('mongoose');
require(__dirname + '/../server.js');

chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

describe('CRUD integration test', ()=>{
  after((done)=>{
    mongoose.connection.db.dropDatabase(()=>{
      done();
    });
  });

  it('should be POSTing a new article', (done)=>{
    request('localhost:3000')
    .post('/admin/blog')
    .send({'title': 'new title', 'body': 'new body'})
    .end((err,res)=>{
      expect(res.body).to.be.an('Object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.eql('Success!');
      done();
    });
  });//end of it block

});//end of describe block
