/*global Ext, ExtClient, ExtClientApp*/

Ext.define('ExtClient.controller.Menu', {
  extend: 'Ext.app.Controller',

  models: ['Menu'],
  stores: ['Menu'],
  views: ['Menu'],

  requires: ['ExtClient.controller.Base'],

  init: function () {
    this.control({
      'menu': { itemclick: this.itemClicked }
    });
  },

  itemClicked: function (selModel, record) {
    var resourceStrings;

    if (record.get('leaf')) {
      resourceStrings = ExtClientApp.resourceStringsCollection.get(record.get('model'));
      ExtClient.controller.Base.factory(resourceStrings, function (controller) {
        controller.displayGrid();
      });
    }
  }
});