//AVANCE 1: crear el secreto que compartirán el servidor y el celular
function generateSecret() {
  return 'mi-secreto-123';
}

function titulo(texto) {
  console.log(texto);
}

function dato(label, valor) {
  console.log(label + ':', valor);
}

function nota(texto) {
  console.log(texto);
}

function cian(texto) {
  return texto;
}

titulo('1. El secreto compartido');
const secreto = generateSecret();
dato('Secreto', cian(secreto));
nota('Lo guardan el servidor y el celular. No se vuelve a enviar.');

//AVANCE 2: calcular el código de este momento
titulo('2. El código de este momento');
const codigo = await generate({ secret: secreto });
digitos(codigo);
nota('Se calculó con el secreto y la hora actual.');