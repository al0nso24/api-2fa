//AVANCE 1: crear el secreto que compartirán el servidor y el celular
//generateSecret() crea un secreto aleatorio
//generate() crea un código temporal a partir de ese secreto
//verify() comprueba si un código corresponde al secreto
import { generateSecret, generate, verify } from "otplib";
//esperar es una pausa asíncrona
import { setTimeout as esperar } from 'node:timers/promises';

//Genera un secreto aleatorio
const secreto = generateSecret();
console.log("1. Secreto compartido: ", secreto);

const codigo = await generate({ secret: secreto });
console.log(`2. Código actual: ${codigo}`);

//prueba1.valid indica si la verificación fue exitosa
const prueba1 = await verify({ secret: secreto, token: codigo });
if (prueba1.valid) console.log(`${codigo} es correcto`);

const prueba2 = await verify({
    secret: secreto, token: '123456'
});

//Si no es válido
if (!prueba2.valid) console.log('123456 es incorrecto');

//Barra en tiempo real
const secreto_2 = generateSecret();;
const codigo_2 = await generate({ secret: secreto_2 });

//Calcula los segundos que faltan para el próximo límite de 30 segundos
while (true) {
    //Date.now() obtiene la hora actual en milisegundos
    //"/1000" la convierte a segundos
    //"restantes" calcula cuántos faltan para el siguiente ciclo
    const restantes = 30 - (Math.floor(Date.now() / 1000) % 30);
    //Se dibuja la barra
    console.log(`${'█'.repeat(restantes)}${'░'.repeat(30 - restantes)} ${restantes} s`);
    if (restantes <= 5) break;
    await esperar(5000); //el bucle se detiene cuando quedan cinco segundos o menos
}


//FALTA COMENTAR

//Este cálculo espera hasta el siguiente límite de 30 segundos
//esperar() recibe milisegundos, el tiempo calculado se multiplica por 1000
//Si coincide con el límite, espera 0 milisegundos
await esperar(30 - (Math.floor(Date.now() / 1000) % 30) === 30
    ? 0
    : (30 - (Math.floor(Date.now() / 1000) % 30)) * 1000);

//Genera un nuevo código usando el segundo secreto
const nuevo = await generate({ secret: secreto_2 });

//Lo dibuja en la terminal, repitiendo caracteres para formar el recuadro
console.log('→ Empezó una ventana nueva. Este es el código de ahora:');
console.log(`┌${'───┬'.repeat(5)}───┐`);
//Separa los dígitos para mostrarlos ordenados
console.log(`│ ${nuevo.split('').join(' │ ')} │`);
console.log(`└${'───┴'.repeat(5)}───┘`);

//Comprueba si el código guardado antes todavía se acepta
const resultado = await verify({ secret: secreto_2, token: codigo_2 });
//? : = if/else
//Si resultado.valid es verdadero muestra que sigue válido, si no, muestra que venció
console.log(resultado.valid
    ? `${codigo_2} todavía es válido`
    : `${codigo_2} ya venció`);