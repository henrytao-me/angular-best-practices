// Generated on 2013-11-17 using generator-angular 0.5.1
'use strict';

var sampleAPI = function(app) {
    var isAuthenticated = false;
    app.get('/api/user', function(req, res, next) {
        if (!isAuthenticated) {
            return res.json({
                status: 'error'
            }, 401);
        }
        return res.json({
            status: 'ok',
            data: {
                name: 'Henry Tao'
            }
        });
    });
    app.post('/api/user/authenticate/email', function(req, res, next) {
        if (req.body.email === 'hi@henrytao.me' && req.body.password === '123') {
            isAuthenticated = true;
            return res.json({
                status: 'ok',
                data: {
                    name: 'Henry Tao'
                }
            });
        };
        return res.json({
            status: 'error',
            message: 'Invalid email & password'
        });
    });
    app.post('/api/user/signout', function(req, res, next) {
        isAuthenticated = false;
        return res.json({
            status: 'ok'
        });
    });
};

var express = require('express');
var path = require('path');
var _ = require('underscore');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        express: {
            options: {
                hostname: '*',
                port: 1337
            },
            build: {
                options: {
                    bases: ['build'],
                    middleware: function(app) {
                        app.use(app.router);

                        sampleAPI(app);

                        app.get('*', function(req, res, next) {
                            return res.render(path.resolve(__dirname, 'build', 'index.html'));
                        });
                    }
                }
            }
        }
    });

    /*********************************************************************************
     DEFAULT TASK
     *********************************************************************************/

    grunt.registerTask('default', ['server']);

    /*********************************************************************************
     SERVER TASK
     *********************************************************************************/

    grunt.registerTask('server', ['express:build', 'express-keepalive']);

};