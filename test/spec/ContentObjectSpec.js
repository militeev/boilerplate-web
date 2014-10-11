define([
    'jquery',
    'underscore',
    'models/ContentObject'
], function($, _, ContentObject) {
    'use strict';

    describe("ContentObject", function() {

        var MOCK_GET_DATA = {
            UUID: 'object-6101f230-1dae-11e4-8c21-0800200c9a66'
        };

        var Model, Collection;

        beforeEach(function() {
            Model = ContentObject.Model;
            Collection = ContentObject.Collection;
        });

        it("can have model created", function() {
            var model = new Model();
            expect(model).toBeTruthy();
            expect(model.isNew()).toBeTruthy();
        });

        it("can have collection created", function() {
            var collection = new Collection();
            expect(collection).toBeTruthy();
            expect(collection.size()).toEqual(0);
        });

        it("can have model initialized with data", function() {
            var model = new Model(MOCK_GET_DATA);
            expect(model.get("UUID")).toEqual("object-6101f230-1dae-11e4-8c21-0800200c9a66");
            expect(model.isNew()).toBeFalsy();
        });

        describe('when fetching model data', function() {

            var model;

            beforeEach(function() {
                spyOn($, 'ajax').and.callFake(function(options) {
                    if (options.type === 'GET') {
                        options.success(MOCK_GET_DATA);
                    }
                });

                model = new Model();
                model.fetch({
                    url: '/'
                });
            });

            afterEach(function() {
                model = undefined;
            });

            it('should be able to parse mocked service response', function() {
                expect(_.isEmpty(model.attributes)).toBeFalsy();
                expect(model.get('UUID')).toEqual('object-6101f230-1dae-11e4-8c21-0800200c9a66');
                expect(model.isNew()).toBeFalsy();
            });

        });

        describe('when saving model data', function() {

            var model;

            beforeEach(function() {
                spyOn($, 'ajax').and.callFake(function(options) {
                    if (options.type === 'PUT') {
                        options.success(options.data);
                    } else if (options.type === 'POST') {
                        var dataAsJson = JSON.parse(options.data);
                        dataAsJson.UUID = 'object-6101f230-1dae-11e4-8c21-0800200c9a66';
                        options.success(dataAsJson);
                    }
                });
                model = new Model();
            });

            afterEach(function() {
                model = undefined;
            });

            it('should be able to issue PUT call to the service', function() {
                var options;
                model.set({
                    'UUID': 'object-6101f230-1dae-11e4-8c21-0800200c9a66',
                    'name': 'My Object Name'
                });
                model.save({}, {
                    url: '/'
                });
                options = $.ajax.calls.mostRecent().args[0];
                expect(JSON.parse(options.data).UUID).toEqual('object-6101f230-1dae-11e4-8c21-0800200c9a66');
                expect(options.type).toEqual('PUT');
            });

            it('should be able to issue POST call to the service', function() {
                var options;
                model.set('name', 'My Object Name');
                model.save({}, {
                    url: '/',
                    success: function(model) {
                        expect(model.get('UUID')).toEqual('object-6101f230-1dae-11e4-8c21-0800200c9a66');
                        expect(model.get('name')).toEqual('My Object Name');
                    }
                });
                options = $.ajax.calls.mostRecent().args[0];
                expect(options.type).toEqual('POST');
            });

            it('must validate the object before saving', function() {
                var saveResult;
                saveResult = model.save({}, {
                    url: '/'
                });
                expect(saveResult).toBeFalsy();
                expect(model.validationError.name).toEqual('name-empty');
                saveResult = model.save({
                    name: '123456789012345678901234567890123456789012345678901234567890'
                }, {
                    url: '/'
                });
                expect(saveResult).toBeFalsy();
                expect(model.validationError.name).toEqual('name-too-long');
            });

        });

    });

});
