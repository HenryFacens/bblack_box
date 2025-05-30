const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Black Box',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
    },
    servers: [
      //{ url: 'https://bblackbox-f3btf4c3g7fydhaf.westus-01.azurewebsites.net' }
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {           
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  
        },
      },
    },
    security: [                
      {
        bearerAuth: []
      }
    ],
  },
  apis: ['./src/modules/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
