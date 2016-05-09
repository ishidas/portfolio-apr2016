'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var mongoose = require('mongoose');
var server = require(__dirname + '/../server.js');

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
    server.request('localhost:3000')
    .post('/admin/blog')
    .send({'title': 'new title', 'body': 'new body'})
    .end((err,res)=>{
      expect(res.body).to.be.an('Object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.eql('Success!');
      done();
    });
  });//end of it block

  it('should GET all data', (done)=>{
    request('localhost:3000')
    .get('/blog/articles')
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.have.property('title', 'new title');
      expect(res.body[0]).to.have.property('body', 'new body');
      done();
    });
  });//end of it block

  // it('should GET only one by id', (done)=>{
  //   request('localhost:3000')
  //   .get('/blog/articles/' + id)
  //   .end((err, res)=>{
  //
  //   });
  // });//end of it block

});//end of describe block
