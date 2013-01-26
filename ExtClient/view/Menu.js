/*global Ext*/

Ext.define('ExtClient.view.Menu', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.menu',

  region: 'west',
  collapsible: true,
  split: true,
  title: 'Navigation',
  id: 'navigation-panel',
  width: 275,
  margins: '5 0 5 5',
  store: 'Menu',
  rootVisible: false
});