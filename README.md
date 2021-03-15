# wallet soap

_SOAP API para simular una wallet_

_Crear un .env en base a .env.example con HOST y PORT opcionales (por defecto corre en el puerto 8000)_
_Se recomienda [mailtrap](https://mailtrap.io/) para el testeo de correo_
_Puede revisar el xml en HOST:PORT/wallet?wsdl_

## Instalación
```
# Instala las dependencias
$ npm install

# Levanta el servidor de desarrollo con formateo de codigo y reload
$ npm run dev

# Levanta el servidor de desarrollo
$ npm run start

# Prepara el proyecto para producción
$ npm run build

# Levanta el servidor en modo producción
$ npm run serve
``` 
## Herramientas
* [prettier](prettier.io) Formateador de código
* [esLint](eslint.org) Analizador de código de javascript
* [babel](https://babeljs.io/) Compilador de javascript
* [nodemon](https://nodemon.io/) Para monitorear los cambios y reiniciar el servidor en modo desarrollo
* [soap](https://www.npmjs.com/package/soap) Servidor SOAP para nodejs
* [mongoose](https://mongoosejs.com/) Modelado y conexion a una BD mongoDB
* [nodemailer](https://nodemailer.com/about/) Modulo para el envio de emails

_NOTA: Todas las respuestas son en ingles para estandarización
