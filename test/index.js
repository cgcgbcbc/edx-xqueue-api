import EdxQueueApi from '../lib';
import chai from 'chai';

const assert = chai.assert;
const URL = 'XQUEUE_URL';
const QUEUE = 'XQUEUE_NAME';
const USERNAME = 'LMS_USERNAME';
const PASSWORD = 'LMS_PASSWORD';
const ID = 'SUBMISSION_ID';
const KEY = 'SUBMISSION_KEY';

const url = process.env[URL];
const queue = process.env[QUEUE];
const username = process.env[USERNAME];
const password = process.env[PASSWORD];
const submissionId = process.env[ID];
const submissionKey = process.env[KEY];

describe('edx-queue-api', function () {
  let helper = context;
  if (process.env['CI']) {
    helper = context.skip;
  }
  helper('test api', () => {
    "use strict";
    it('should login', (done) => {
      let xqueue = new EdxQueueApi(url, queue);
      xqueue.login(username, password, (err, res, body) => {
        try {
          assert.isNull(err);
          assert.equal(body.return_code, 0);
          done();
        } catch(e) {
          done(e);
        }
      });
    });
    context('other api', () => {
      let xqueue;
      before((done) => {
        xqueue = new EdxQueueApi(url, queue);
        xqueue.login(username, password, (err, res, body) => {
          if (err != null) {
            done(err);
          } else {
            done();
          }
        });
      });
      it('should get queue len', (done) => {
        xqueue.getQueueLength((err, res, body) => {
          try {
            assert.equal(body.return_code, 0);
            done();
          } catch(e) {
            done(e);
          }
        });
      });
      it('should get submission', (done) => {
        xqueue.getSubmission((err, res, body) => {
          try {
            assert.equal(body.return_code, 1);
            done();
          } catch(e) {
            done(e);
          }
        });
      });
      it('should put result', (done) => {
        xqueue.putResult(submissionId, submissionKey, true, 1, "test", (err, res, body) => {
          try {
            assert.equal(body.return_code, 0);
            done();
          } catch(e) {
            done(e);
          }
        });
      });
    });
  });
});
