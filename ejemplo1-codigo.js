//AVANCE 1: crear el secreto que compartirán el servidor y el celular
titulo('1. El secreto compartido');
const secreto = generateSecret();
dato('Secreto', cian(secreto));
nota('Lo guardan el servidor y el celular. No se vuelve a enviar.');