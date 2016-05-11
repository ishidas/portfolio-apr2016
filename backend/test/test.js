'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
var mongoose = require('mongoose');
require(__dirname + '/../server.js');

chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;

//*************************************************
//run these test after changing the db to test db!!!
//otherwise you will be doomed.
//*************************************************
describe('CRUD integration test', ()=>{
  var id;
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

  it('should GET all data', (done)=>{
    request('localhost:3000')
    .get('/blog/articles')
    .end((err, res)=>{
      id = res.body[0]._id;
      expect(err).to.be.null;
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.have.property('title', 'new title');
      expect(res.body[0]).to.have.property('body', 'new body');
      done();
    });
  });//end of it block

  it('should GET only one by id', (done)=>{
    request('localhost:3000')
    .get('/blog/articles/' + id)
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res.body).to.be.an('Object');
      done();
    });
  });//end of it block

  it('should take care of PUT request', (done)=>{
    request('localhost:3000')
    .put('/admin/blog/article/' + id)
    .send({'title': 'new title edited'})
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res.body).to.have.property('title', 'new title edited');
      expect(res.body._id).to.eql(id);
      done();
    });
  });//end of it block

  it('should delete a specified id data set', (done)=>{
    request('localhost:3000')
    .delete('/admin/blog/article/' + id)
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res.body).to.be.an('Object');
      expect(res.body).to.have.property('msg', 'Success!');
      done();
    });
  });//end of it block

});//end of describe block
