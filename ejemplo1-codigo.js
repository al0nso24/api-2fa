//AVANCE 1: crear el secreto que compartirán el servidor y el celular
import { generateSecret, generate } from "otplib";

const secreto = generateSecret();
console.log("1. Secreto compartido: ", secreto);

const codigo = await generate({ secret: secreto });
console.log(`2. Código actual: ${codigo}`);