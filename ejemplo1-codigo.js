//AVANCE 1: crear el secreto que compartirán el servidor y el celular
import { generateSecret, generate, verify } from "otplib";

const secreto = generateSecret();
console.log("1. Secreto compartido: ", secreto);

const codigo = await generate({ secret: secreto });
console.log(`2. Código actual: ${codigo}`);

const prueba1 = await verify({ secret: secreto, token: codigo });
if (prueba1.valid) console.log(`${codigo} es correcto`);

const prueba2 = await verify({
    secret: secreto, token: '123456'
});

if (!prueba2.valid) console.log('123456 es incorrecto');

//AVANCE 4: ver cómo se acaba el tiempo y cambia el código
let restantes = 30 - (Math.floor(Date.now() / 1000) % 30);

while (restantes > 0) {
    console.log(` ${barra(restantes, 30)}
String(restantes).padStart(2)} s`);
    const pausa = Math.min(5, restantes);
    await esperar(pausa * 1000);
    restantes -= pausa;
}

await esperar(1000);
const codigoNuevo = await generate({ secret: secreto });
nota('Empezó una ventana nueva. Este es el código de ahora:');
digitos(codigoNuevo);

const prueba3 = await verify({ secret: secreto, token: codigo });
if (!prueba3.valid) mal(`${codigo} ya venció`);