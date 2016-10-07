var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Images', function() {
    it('should list ALL images on /images GET', function(done) {
        chai.request(app)
            .get('/api/images')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });
    it('should list a SINGLE image on /images/:id GET');
    it('should add a SINGLE image on /images POST');
    it('should update a SINGLE image on /images/:id PUT');
    it('should delete a SINGLE image on /images/:id DELETE');
});