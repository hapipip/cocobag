'use strict';

const Lab =  require('lab');
const Hapi = require('hapi');
const Path = require('path');
const {expect} = require('code');
const {describe, it, before, beforeEach} = exports.lab = Lab.script();

describe('Test nconf building', () => {

  let server;

  beforeEach(done => {
    server = new Hapi.Server();
    server.connection();
    done();
  });


  it('Loading only defaults', (done) => {
    server.register({
      register: require('../lib/index'),
      options: {
        defaults: [Path.join(__dirname, 'fixtures', 'default')]
      }
    }, (err) => {
      expect(err).to.not.exist()
      expect(server.bag).to.be.an.object();
      expect(server.bag.get('a:b:c')).to.be.true();
      expect(server.bag.get('a:b:d')).to.be.true();
      done();
    });
  });

  it('Loading only paths', (done) => {
    server.register({
      register: require('../lib/index'),
      options: {
        overrides: [Path.join(__dirname, 'fixtures', 'dev')]
      }
    }, (err) => {
      expect(err).to.not.exist()
      expect(server.bag).to.be.an.object();
      expect(server.bag.get('a:b:c')).to.not.exist();
      expect(server.bag.get('a:b:d')).to.be.false();
      expect(server.bag.get('a:b:e')).to.be.true();
      done();
    });
  });

  it('Loading all', (done) => {

    server.register({
      register: require('../lib/index'),
      options: {
        defaults: [Path.join(__dirname, 'fixtures', 'default')],
        overrides: [Path.join(__dirname, 'fixtures', 'dev')]
      }
    }, (err) => {
      expect(err).to.not.exist();
      expect(server.bag).to.be.an.object();
      expect(server.bag.get('a:b:c')).to.be.true();
      expect(server.bag.get('a:b:d')).to.be.false();
      expect(server.bag.get('a:b:e')).to.be.true();
      done();
    });
  });


});
