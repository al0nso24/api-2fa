//AVANCE 1: crear el secreto que compartirán el servidor y el celular
import { generateSecret, generate, verify } from "otplib";
import { setTimeout as esperar } from 'node:timers/promises';

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


//Barra en tiempo real
const secreto_2 = generateSecret();;
const codigo_2 = await generate({ secret: secreto_2 });

while (true) {
    const restantes = 30 - (Math.floor(Date.now() / 1000) % 30);
    console.log(`${'█'.repeat(restantes)}${'░'.repeat(30 - restantes)} ${restantes} s`);
    if (restantes <= 5) break;
    await esperar(5000);
}

await esperar(30 - (Math.floor(Date.now() / 1000) % 30) === 30
    ? 0
    : (30 - (Math.floor(Date.now() / 1000) % 30)) * 1000);

const nuevo = await generate({ secret: secreto_2 });

console.log('→ Empezó una ventana nueva. Este es el código de ahora:');
console.log(`┌${'───┬'.repeat(5)}───┐`);
console.log(`│ ${nuevo.split('').join(' │ ')} │`);
console.log(`└${'───┴'.repeat(5)}───┘`);

const resultado = await verify({ secret: secreto_2, token: codigo_2 });
console.log(resultado.valid
    ? `${codigo_2} todavía es válido`
    : `${codigo_2} ya venció`);