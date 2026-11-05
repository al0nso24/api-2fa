//Importa la biblioteca bcryptjs, para crear y comprobar hashes
import bcrypt from "bcryptjs";

//AVANCE 1: convertir la contraseña en un hash
console.log('1. De contraseña a hash');
const password = 'Clave-Segura-2026'; //guarda una contraseña

//await = espera el resultado antes de continuar
//bcrypt.hash(...) = realiza el cálculo y devuelve un resultado de forma asíncrona.
//10 = indica cuántas rondas de trabajo usa bcrypt
const hash = await bcrypt.hash(password, 10);

console.log('Contraseña', password);
console.log('', ' ▼ bcrypt');
console.log('Hash:', hash); //imprime el hash