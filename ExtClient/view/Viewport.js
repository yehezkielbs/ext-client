Ext.define('ExtClient.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',
    renderTo: Ext.getBody(),
    items: [
        {
            xtype: 'box',
            id: 'header-panel',
            region: 'north',
            html: '<h1>Ext-Client</h1>',
            height: 30
        },
        {
            xtype: 'menu'
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            margins: '5 5 5 0',
            id: 'content-panel'
        }
    ]
});