'use strict';

var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var localConfig;

try {
  localConfig = require('./../local.env');
} catch(e) {
  localConfig = {};
}

// Main configuration
// All environments will share this configuration
var all = {
	env: process.env.NODE_ENV,
	serverOptions:{
		host: 'http://localhost',
		port: 8000
	},	
	clientOptions:{
		host: 'http://localhost',
		port: 9000
	},
	productCategories: [
		{
			name: "Invitaciones",
			view: "views/invitationDetails.html"
		},
		{
			name: "Escritorio",
			view: "views/desktopMaterialDetails.html"
		}
	],
	defaultProductProperties: {
		Default: {
			provider: "Tunari",
			quantity: 10000,
			locations: [
				{
					type: "Tienda",
					value: "Deposito Z, Estante 100, Peldaño 100"
				},
				{
					type: "Deposito",
					value: "Deposito Z, Estante 100, Peldaño 100"
				}
			],
			properties:{
				quantityPerPackage: 100
			}
		},
		Escritorio: {
			provider: "Faber Castell",
			quantity: 20,
			properties:{
				quantityPerPackage: 12
			}
		}
	},
	invitationTypes: [
		"Virgenes",
		"Santos",
		"Promociones",
		"Mementos",
		"Bautizos",
		"1º Comunion",
		"Matrimonios",
		"Estampas"
	],
	invitationsDetails: {
		Default: {			
			sizes: [
				"Postal",
				"Doble Esquela",
				"Esquela",
				"Triple",
				"Banderin",
				"Doble Postal"				
			],
			genres: [
				"Hombre",
				"Mujer",
				"Unisex"
			]
		},
		Mementos: {			
			sizes: [
				"Pequeño",
				"Mediano",
				"Grande"				
			]
		},
		Matrimonios: {
			genres: ["Unisex"]
		},
		Virgenes: {
			genres: ["Unisex"]
		}
	},
	statisticsViews: [
    	{
    		name: 'Ventas',
    		view: '../../views/sellingCharts.html'
    	},
    	{
    		name: 'Cantidad de Invitaciones',
    		view: '../../views/invitationsQuantityCharts.html'
    	}
    ]
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {},
  localConfig);

