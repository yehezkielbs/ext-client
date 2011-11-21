/*global Ext*/

Ext.define('ExtClient.util.FieldTypeMap', {
    // map from backend types:
    // :string, :text, :integer, :float, :decimal, :datetime, :timestamp, :time, :date, :binary, :boolean
    statics: {

        getDataFieldType: function(fieldType) {
            switch (fieldType) {
                case 'string':
                case 'text':
                    return Ext.data.Types.STRING;
                case 'integer':
                    return Ext.data.Types.INTEGER;
                case 'float':
                case 'decimal':
                    return Ext.data.Types.FLOAT;
                case 'boolean':
                    return Ext.data.Types.BOOL;
                case 'date':
                    return Ext.data.Types.DATE;
                case 'time':
                    return Ext.data.Types.DATE;
                // TODO: datetime
                case 'datetime':
                case 'timestamp':
                    return Ext.data.Types.DATE;
                default:
                    return Ext.data.Types.AUTO;
            }
        },

        getFormField: function(field) {
            switch (field.type) {
                case 'boolean':
                    return {
                        xtype: 'checkboxfield'
                    };
                case 'float':
                case 'decimal':
                    return {
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: field.scale || 2
                    };
                case 'integer':
                    return {
                        xtype: 'numberfield',
                        allowDecimals: false
                    };
                case 'date':
                    return {
                        xtype: 'datefield'
                    };
                // TODO: datetime
                case 'datetime':
                case 'timestamp':
                    return {
                        xtype: 'datefield'
                    };
                case 'time':
                    return {
                        xtype: 'timefield'
                    };
                default:
                    return {
                        xtype: 'textfield'
                    };
            }
        },

        getGridColumn: function(field) {
            switch (field.type) {
                case 'boolean':
                    return {
                        xtype: 'booleancolumn'
                    };
                case 'integer':
                    return {
                        xtype: 'numbercolumn',
                        format: '0,000'
                    };
                case 'float':
                    return {
                        xtype: 'numbercolumn',
                        format: '0.00'
                    }
                case 'decimal':
                    return {
                        xtype: 'numbercolumn',
                        format: '0.000000'
                    };
                case 'date':
                    return {
                        xtype: 'datecolumn',
                        format: 'Y-m-d'
                    };
                case 'time':
                    return {
                        xtype: 'datecolumn',
                        format: 'H:i:s'
                    };
                case 'datetime':
                case 'timestamp':
                    return {
                        xtype: 'datecolumn',
                        format: 'Y-m-d H:i:sO'
                    };
                default:
                    return {
                        xtype: 'gridcolumn'
                    };
            }
        }
    }
});