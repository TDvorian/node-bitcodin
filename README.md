# node-bitcodin

[![NPM](https://nodei.co/npm/node-bitcodin.png)](https://nodei.co/npm/node-bitcodin/)

 community node.js callback-based module for bitcodin.com

Simple callback-based module for bitcodin.com REST-API
(only supports Amazon S3 if you need other types of storage, please contact me. )

## Super simple to use
### install:
```sh
$ npm i node-bitcodin --save
```
### init:

```javascript
var bitcodin = require('node-bitcodin')('THIS_IS_MY_API_KEY');
```
or
```javascript
var bitcodin = require('node-bitcodin');
/*
other code
*/
var bitcodinClient = new bitcodin('THIS_IS_MY_API_KEY');

```
### add s3 credentials: 

```javascript
   bitcodinClient.setS3({
        "accessKey": "THIS_IS_MY_S3_ACCESS_KEY",
        "secretKey": "THIS_IS_MY_S3_SECRET_KEY"
    });
```

More info see:   [bitcodin cloud transcoding system](http://www.bitcodin.com)


### createInput
```javascript
   bitcodinClient.createInput(
                {
                    "type": "s3",
                    "bucket": "THIS_IS_MY_S3_BUCKET",
                    "region": "THIS_IS_MY_S3_REGION",
                    "objectKey": "THIS_IS_MY_OBJECT"
                }, function (err, result) {
                    if (err) {
                     ...
                    }
                   ...

                });
```
### createOutput
```javascript
   bitcodinClient.createOutput(
                {
                    "type": "s3",
                    "bucket": "THIS_IS_MY_S3_BUCKET",
                    "region": "THIS_IS_MY_S3_REGION",
                    "prefix": "THIS_IS_MY_FOLDER",
                    "makePublic": false
                }, function (err, result) {
                    if (err) {
                     ...
                    }
                   ...

                });
```
### createJob
```javascript
   bitcodinClient.createJob(
                {
                "inputId": "THIS_IS_MY_INPUT_ID",
                "outputId": "THIS_IS_MY_OUTPOT_ID",
                "encodingProfileId": THIS_IS_MY_ENCDING_PROFILE_ID,
                "manifestTypes": ["mpd", "m3u8"],
                "speed": "standard",
                "duration": 10 // in seconds
                }, function (err, result) {
                    if (err) {
                     ...
                    }
                   ...

                });
```
### jobStatus
```javascript
   bitcodinClient.jobStatus(THIS_IS_MY_JOB_ID, function (err, result) {
                    if (err) {
                     ...
                    }
                   ...

                });
```


### Todos

 - Write Tests
 - Add raw
 - Add other inputs and outputs

License
----

MIT




