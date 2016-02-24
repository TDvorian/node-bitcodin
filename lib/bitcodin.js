var request = require('request');
var _ = require('underscore');

var Bitcodin = function (bitcodinApiKey) {
    "use strict";

    if (!(this instanceof Bitcodin)) {
        return new Bitcodin(bitcodinApiKey);
    }

    if (!bitcodinApiKey || typeof bitcodinApiKey !== 'string') {
        throw new Error('No bitcodin API Key given');
    }

    this.bitcodinId = bitcodinApiKey;
    this.s3 = {};
    this.apiUrl = 'http://portal.bitcodin.com/api/';
    this.requestOptions = {
        headers: {
            'Content-type': 'application/json',
            'bitcodin-api-version': 'v1',
            'bitcodin-api-key': this.bitcodinId,
        },
        'json': true
    };

    function reqCb(error, response, body, cb) {

        if (error) {
            return cb(error)
        }

        if (response.statusCode >= 400) {
            return cb(body);
        }

        cb(null, body);
    }

    this.createInput = function (inputObject, cb) {

        var url = this.apiUrl + '/input/create';
        var options;
        var error;

        if (inputObject.type === 's3') {
            inputObject.accessKey = inputObject.accessKey || this.s3.accessKey;
            inputObject.secretKey = inputObject.secretKey || this.s3.secretKey;

            if (!(inputObject.secretKey && inputObject.accessKey )) {
                error = new Error();
                error.status = 400;
                error.message = 'Bad request';
                return cb(error)
            }
        }

        options = _.clone(this.requestOptions);
        options.url = url;
        options.method = 'POST';
        options.body = inputObject;

        function callback(error, response, body) {
            reqCb(error, response, body, cb);
        }

        request(options, callback);


    };

    this.createOutput = function (inputObject, cb) {

        var url = this.apiUrl + '/output/create';
        var options;
        var error;

        if (inputObject.type === 's3') {
            inputObject.accessKey = inputObject.accessKey || this.s3.accessKey;
            inputObject.secretKey = inputObject.secretKey || this.s3.secretKey;


            if (!(inputObject.secretKey && inputObject.accessKey )) {
                error = new Error();
                error.status = 400;
                error.message = 'Bad request';
                return cb(error)
            }
        }
        options = _.clone(this.requestOptions);
        options.url = url;
        options.method = 'POST';
        options.body = inputObject;

        function callback(error, response, body) {
            reqCb(error, response, body, cb);
        }

        request(options, callback);

    };


    this.createJob = function (inputObject, cb) {

        var url = this.apiUrl + '/job/create';
        var options;

        options = _.clone(this.requestOptions);
        options.url = url;
        options.method = 'POST';
        options.body = inputObject;

        function callback(error, response, body) {
            reqCb(error, response, body, cb);
        }

        request(options, callback);

    };

    this.jobStatus = function (jobId, cb) {

        var url = this.apiUrl + '/job/' + jobId + '/status';
        var options;

        function callback(error, response, body) {
            reqCb(error, response, body, cb);
        }

        options = _.clone(this.requestOptions);
        options.url = url;
        options.method = 'GET';

        request(options, callback);
    };

    this.setS3 = function (avsS3) {
        var s3 = {};
        this.s3 = s3;
        s3.accessKey = avsS3.accessKey;
        s3.secretKey = avsS3.secretKey;

    }

};


module.exports = Bitcodin;


