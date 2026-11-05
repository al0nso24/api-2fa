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
console.log();

//AVANCE 2: comprobar contraseñas sin conocer la original
console.log('2. El login compara, no descifra');

async function probar(intento) {
    const coincide = await bcrypt.compare(intento, hash);
    if (coincide){
        //Devuelve true si el intento corresponde a la contraseña usada para crear el hash
        console.log(`✅ ${intento} coincide con el hash`);
    }else{
        console.log(`❌ ${intento} no coincide`);
    }
}

//Probando contraseñas
await probar('Clave-Segura-2026');
await probar('clave-segura-2026');
await probar('123456');