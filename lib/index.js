import request from 'request';

function parseBody(err, res, body, done) {
  "use strict";
  if (err != null) {
    done(err, res, null);
    return;
  }
  try {
    done(err, res, JSON.parse(body));
  } catch(e) {
    done(e, res, null);
  }
}

export default class {
  constructor(url, queue) {
    "use strict";
    this.url = url;
    this.queue = queue;
    this.client = request.defaults({jar: true});
  }
  login(username, password, done) {
    "use strict";
    this.client.post({
      url: this.url + '/xqueue/login/',
      body: `username=${username}&password=${password}`
    }, (err, res, body) => {
      parseBody(err, res, body, done);
    });
  }
  getQueueLength(done) {
    "use strict";
    this.client.get({
      url: this.url + '/xqueue/get_queuelen/',
      qs: {
        queue_name: this.queue
      }
    }, (err, res, body) => {
      parseBody(err, res, body, done);
    });
  }
  getSubmission(done) {
    "use strict";
    this.client.get({
      url: this.url + '/xqueue/get_submission/',
      qs: {
        queue_name: this.queue
      }
    }, (err, res, body) => {
      parseBody(err, res, body, done);
    });
  }
  putResult(id, key, correct, score, msg, done) {
    "use strict";
    this.client.post({
      url: this.url + '/xqueue/put_result/',
      form: {
        xqueue_header: `{"submission_id":${id},"submission_key":"${key}"}`,
        xqueue_body: `{"correct":${correct},"score":${score},"msg":"${msg}"}`
      }
    }, (err, res, body) => {
      parseBody(err, res, body, done);
    });
  }
};
