import { generateSecret, generateURI } from "otplib";
import QRCode from "qrcode"; //convierte el texto en un código QR

//AVANCE 1: Armar la dirección con los datos para la app
console.log('1. La dirección que entiende la app');
const secreto = generateSecret(); //genera un secreto aleatorio
const uri = generateURI({
    issuer: 'MiTienda', //nombre que verá el usuario en la app
    label: 'ana@correo.com', //cuenta del usuario
    secret: secreto, //el valor recién generado
});
console.log(` ${uri}\n`);

//Separamos la dirección para ver cada parte
const partes = new URL(uri); //convierte la dirección en un objeto para consultar sus componentes
console.log('Enlace:', partes.protocol); //otpauth
console.log('Clase:', partes.host); //host obtiene la parte que indica el tipo de autenticación
//decodeURIComponent interpreta caracteres especiales
//slice(1) quita el "/" inicial
//pathname contiene la cuenta
console.log('Cuenta:', decodeURIComponent(partes.pathname.slice(1)));
//searchParams.get('secret') obtiene el secreto de los parámetros del enlace
console.log('Secreto:', partes.searchParams.get('secret'));

//AVANCE 2: Dibujar esa dirección como QR
console.log('2. La misma dirección, convertida en QR');
//await espera que termine la conversión antes de imprimirlo
const qrTexto = await QRCode.toString(uri, {
    type: 'terminal', //usando caracteres de la terminal para dibujarlo
    small: true
});
console.log(qrTexto); //la imagen del qr
console.log('Apunta con la cámara de tu app autenticadora.');

//AVANCE 3: Guardar el mismo QR como imagen
console.log('3. El QR como imagen');
//Crea un archivo llamado qr.png con el mismo enlace dentro
await QRCode.toFile('qr.png', uri, { width: 240 });
console.log('Se creó el archivo qr.png');
console.log('-> Una página web mostraría esta imagen.');