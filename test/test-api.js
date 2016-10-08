process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var app = require('../app');
var Image = require('../api/models/image');

var should = chai.should();
chai.use(chaiHttp);

describe('Images', function() {
    
    Image.collection.drop();

    beforeEach(function(done) {
        var defaultImage = new Image({
            title: 'Great Image',
            description: 'The best image',
            creator: 'Me',
            url: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg'
        });
        defaultImage.save(function(err) {
            if (err) {
                console.log(err);
            }
            done();
        });   
    });
    
    afterEach(function(done) {
        Image.collection.drop();
        done();
    });
    
    it('should list ALL images on /images GET', function(done) {
        chai.request(app)
            .get('/api/images')
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                }
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('creator');
                res.body[0].creator.should.equal('Me');
                res.body[0].title.should.equal('Great Image');
                done();
            });
    });
    
    it('should list a SINGLE image on /images/:id GET', function(done) {
        var newImage = new Image({
            title: 'Single Image',
            description: 'The second best image',
            creator: 'Everyone',
            url: 'http://theinfobay.com/wp-content/uploads/2014/04/20494_138338332984307_1682284487_n.jpg'
        });
        
        newImage.save(function(err, data) {
            chai.request(app)
                .get('/api/images/' + data.id)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.title.should.equal('Single Image');
                    res.body.creator.should.equal('Everyone');
                    res.body._id.should.equal(data.id);
                    done();
                });
        });
    });
    
    it('should add a SINGLE image on /images POST', function(done) {
        var newImage = new Image({
            title: 'Second Image',
            description: 'The second best image',
            creator: 'Us',
            url: 'http://theinfobay.com/wp-content/uploads/2014/04/20494_138338332984307_1682284487_n.jpg'
        });
        chai.request(app)
            .post('/api/images')
            .send(JSON.stringify(newImage))
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                }
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('title');
                res.body.SUCCESS.should.have.property('description');
                res.body.SUCCESS.should.have.property('url');
                res.body.SUCCESS.should.have.property('_id');
                res.body.SUCCESS.creator.should.equal('Us');
                res.body.SUCCESS.title.should.equal('Second Image');
                done();
            });
    });
    
    it('should update a SINGLE image on /images/:id PUT', function(done) {
        chai.request(app)
            .get('/api/images')
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                }
                chai.request(app)
                    .put('/api/images/'+res.body[0]._id)
                    .send({'title': 'Updated Title'})
                    .end(function(error, response) {
                        if (error) {
                            console.log(err);
                        }
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('UPDATED');
                        response.body.UPDATED.should.be.a('object');
                        response.body.UPDATED.should.have.property('title');
                        response.body.UPDATED.should.have.property('_id');
                        response.body.UPDATED.title.should.equal('Updated Title');
                        done();
                    });
            });
        });
    
    it('should delete a SINGLE image on /images/:id DELETE', function(done) {
        chai.request(app)
            .get('/api/images')
            .end(function(err, res) { 
                if (err) {
                    console.log(err);
                }
                chai.request(app)
                    .delete('/api/images/' + res.body[0]._id)
                    .end(function(error, response) {
                        response.should.have.status(204);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('REMOVED');
                        response.body.REMOVED.should.be.a('object');
                        response.body.REMOVED.should.have.property('title');
                        response.body.REMOVED.should.have.property('_id');
                        response.body.REMOVED.name.should.equal('Great Image');
                        done();
                    });
            });
    });
    
});