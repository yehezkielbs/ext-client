/*global Ext, ExtClientApp*/

Ext.define('ExtClient.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',
    renderTo: Ext.getBody(),
    items: [
        {
            xtype: 'panel',
            id: 'header-panel',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            region: 'north',
            title: ExtClientApp.title
        },
        {
            xtype: 'menu',
            id: 'menu-panel'
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            margins: '5 5 5 0',
            id: 'content-panel'
        }
    ]
});