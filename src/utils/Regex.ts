// Para nome e sobrenome
const regexFullName = /(\w.+\s).+/;

// CPF
const regexCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

// CNPJ
const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

// E-mail
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Datas
const regexDate =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

// Telefone fixo ou celular Brazil
const regexPhoneBrazil =
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

// Telefone internacional
const regexPhoneInternational =
  /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

// CEP
const regexCep = /^\d{5}-\d{3}$/;

// Password Verification
const regexPasswordLowerCase = /\w*[a-z]\w*/; // conter uma letra minuscula
const regexPasswordUpperCase = /\w*[A-Z]\w*/; // Conter uma letra maiuscula
const regexPasswordNumber = /\d/; // conter um número
const regexPasswordSpecialCharacter = /[^a-zA-Z 0-9]+/g; // caractere especial
const regexPasswordMinimumCharacters = /^.{8,}$/; //Mínimo 8 caracteres

export {
  regexFullName,
  regexCpf,
  regexCnpj,
  regexEmail,
  regexDate,
  regexPhoneBrazil,
  regexPhoneInternational,
  regexCep,
  regexPasswordLowerCase,
  regexPasswordUpperCase,
  regexPasswordNumber,
  regexPasswordSpecialCharacter,
  regexPasswordMinimumCharacters,
};
