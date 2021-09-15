/*eslint-env node */
'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    auth = require('./api/helpers/auth');


var app = require('express')();
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8443;
// authorization definition for role admin and user and resources student, students and user from oas api definition
var grants = {
  admin: {
    'student': {
      'read:any': ['*'],
      'delete:any': ['*']
    },
    'students': {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*']
    },
    'user': {
      'read:any': ['*'],
      'delete:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*']
    }
  },
  user: {
    'student': {
      'read:any': ['*']
    },
    'students': {
      'read:any': ['*']
    },
    'user': {
      'read:own': ['*'],
      'update:own': ['*']
    }
  }
};

// swaggerRouter configuration
var options = {
  controllers: path.join(__dirname, './api/controllers'),
  checkControllers: true,
  loglevel: 'debug',
  validator: true,
  oasSecurity: true,
  securityFile: {
    Bearer: {
      iss: "VM_Auth",
      key: 'mamamamisumysemame'
  }
  },
  oasAuth: true,
  grantsFile: {
    Bearer: grants
  },
  docs: {
    apiDocs: '/api-docs',
    apiDocsPrefix: '',
    swaggerUi: '/docs',
    swaggerUiPrefix: ''
  }
};
oasTools.configure(options);


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);
var soptions = {
   key  : fs.readFileSync('key.pem'),
   cert : fs.readFileSync('cert.pem')
};

// Initialize the Swagger middleware
oasTools.initializeMiddleware(swaggerDoc, app, function () {


  // Start the server
  https.createServer(soptions, app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (https://ibm-i-vm1:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on https://ibm-i-vm1:%d/docs', serverPort);
  });
});
