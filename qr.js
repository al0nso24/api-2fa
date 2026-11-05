import { generateSecret, generate, verify, generateURI } from "otplib";
import QRCode from "qrcode";

//AVANCE 1: armar la dirección con los datos para la app
console.log('1. La dirección que entiende la app');
const secreto = generateSecret();
const uri = generateURI({
    issuer: 'MiTienda', //nombre que verá el usuario en la app
    label: 'ana@correo.com', //cuenta delusuario
    secret: secreto,
});
console.log(` ${uri}\n`);

//Separamos la dirección para ver cada parte
const partes = new URL(uri);
console.log('Enlace:', partes.protocol);
console.log('Clase:', partes.host);
console.log('Cuenta:', decodeURIComponent(partes.pathname.slice(1)));
console.log('Secreto:', partes.searchParams.get('secret'));

//AVANCE 2: dibujar esa dirección como QR
console.log('2. La misma dirección, convertida en QR');
const qrTexto = await QRCode.toString(uri, {
    type: 'terminal',
    small: true
});
console.log(qrTexto);
console.log('Apunta con la cámara de tu app autenticadora.');