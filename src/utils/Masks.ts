// Cep
function maskCep(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{5})(\d)/, '$1-$2');
  return value;
}

// Telefone
function maskPhone(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  return value;
}

// dinheiro
function maskCurrency(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  return value;
}

// Cpf
function maskCpf(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1-$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  return value;
}

// Data
function maskDate(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '$1/$2');
  value = value.replace(/(\d)(\d{4})$/, '$1/$2');
  return value;
}

// Data
function maskTime(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '$1:$2');
  return value;
}

// Peso
function maskWeight(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{3})$/, '$1,$2');
  return value;
}

// temperatura
function maskTemperature(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  return value;
}

// Só número
function maskOnlyNumber(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/[^\d\s-/]/g, '');
  return value;
}

export {
  maskCep,
  maskPhone,
  maskTime,
  maskWeight,
  maskCurrency,
  maskCpf,
  maskDate,
  maskOnlyNumber,
  maskTemperature,
};
