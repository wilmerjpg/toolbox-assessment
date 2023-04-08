import fs from 'fs';
import server from '../../index.js';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import dotenv from 'dotenv';

dotenv.config();
// Assertion
chai.should();
chai.use(chaiHttp);

const MockFilesListResponse = {
  files: ['test1.csv', 'test2.csv', 'test3.csv', 'test4.csv'],
};

const test1CSV = `file,text,number,hex`;

const test3CSV = `file,text,number,hex
test3.csv,lwynW
test3.csv,DCRTCpqqgAdkAVtrx,075271149,2bfe9a3062236e19154ab59d32a277f8
test3.csv,LIfQUHiVNDYdGZwCmAYtTn,508536,114288602d8b91bc304e0761e3fcb265
test3.csv,DgShMGGidLdpSXyLuvTrCXZxgMs,56458981475334496392303902447466,0849db6e1ef45a265fb97e26d1059fcc`;

const test4CSV = `file,text,number,hex
test3.csv,lwynW
test3.csv,DCRTCpqqgAdkAVtrx,075271149,2bfe9a3062236e19154ab59d32a277f8
test3.csv,LIfQUHiVNDYdGZwCmAYtTn,508536,114288602d8b91bc304e0761e3fcb265
test3.csv,DgShMGGidLdpSXyLuvTrCXZxgMs,56458981475334496392303902447466,0849db6e1ef45a265fb97e26d1059fcc`;

const MockFileDataResponse500 = {
  code: 'API-500',
  message: 'File error',
  details: 'FILE_ERROR',
  status: 500,
};

nock(process.env.EXTERNAL_API_URL)
  .persist()
  .get('/secret/files')
  .reply(200, MockFilesListResponse);

nock(process.env.EXTERNAL_API_URL)
  .persist()
  .defaultReplyHeaders({
    'Content-Type': 'text/csv',
  })
  .get('/secret/file/test1.csv')
  .reply(200, test1CSV);

nock(process.env.EXTERNAL_API_URL)
  .persist()
  .get('/secret/file/test2.csv')
  .reply(500, MockFileDataResponse500);

nock(process.env.EXTERNAL_API_URL)
  .persist()
  .defaultReplyHeaders({
    'Content-Type': 'text/csv',
  })
  .get('/secret/file/test3.csv')
  .reply(200, test3CSV);

nock(process.env.EXTERNAL_API_URL)
  .persist()
  .defaultReplyHeaders({
    'Content-Type': 'text/csv',
  })
  .get('/secret/file/test4.csv')
  .reply(200, test4CSV);

describe('Files APIs', () => {
  describe('Test GET route /files/data', () => {
    it('It should return files data', (done) => {
      chai
        .request(server)
        .get('/files/data')
        .end((_err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(6);
          done();
        });
    });

    it('It should return status 500 using query param', (done) => {
      chai
        .request(server)
        .get('/files/data?fileName=test2.csv')
        .end((_err, response) => {
          expect(response.status).to.equal(500);
          done();
        });
    });

    it('It should return empty data using query param', (done) => {
      chai
        .request(server)
        .get('/files/data?fileName=test1.csv')
        .end((_err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(0);
          done();
        });
    });

    it('It should return valid file records using query param', (done) => {
      chai
        .request(server)
        .get('/files/data?fileName=test3.csv')
        .end((_err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(3);
          done();
        });
    });
  });

  describe('Test GET route /files/list', () => {
    it('It should return files list', (done) => {
      chai
        .request(server)
        .get('/files/list')
        .end((_err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.files).to.be.an('array');
          expect(response.body.files.length).to.equal(4);
          done();
        });
    });
  });
});
