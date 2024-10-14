const name = document.querySelector<HTMLInputElement>("#name");
const email = document.querySelector<HTMLInputElement>("#email");
const birthday = document.querySelector<HTMLInputElement>("#birthday");
const cep = document.querySelector<HTMLInputElement>("#cep");
const address = document.querySelector<HTMLInputElement>("#address");
const city = document.querySelector<HTMLInputElement>("#city");
const estate = document.querySelector<HTMLInputElement>("#estate");
const num = document.querySelector<HTMLInputElement>("#number");
const button = document.querySelector("button");

async function getData<T>(url: string) {
  const response = await fetch(url);
  const json: T = await response.json();

  return json;
}

function getCep() {
  return cep?.value.replace("-", "");
}

interface IAddress {
  cep: string;
  logradouro: string;
  localidade: string;
  uf: string;
}

function viaCepData() {
  if (cep) {
    cep.addEventListener("blur", async () => {
      const cepValue = getCep();
      await getData<IAddress>(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then((value) => {
          if (value.hasOwnProperty("erro")) {
            throw new Error("CEP não encontrado.");
          }

          if (address && estate && city) {
            address.value = value.logradouro;
            estate.value = value.uf;
            city.value = value.localidade;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao buscar o CEP: " + error.message);
        });
    });
  }
}

function formData() {
  const nameValue = name?.value;
  const emailValue = email?.value;
  const birthdayValue = birthday?.value;
  const cepValue = cep?.value;
  const addressValue = address?.value;
  const cityValue = city?.value;
  const estateValue = estate?.value;
  const numberValue = num?.value;

  const obj = {
    nameValue,
    emailValue,
    birthdayValue,
    cepValue,
    addressValue,
    cityValue,
    estateValue,
    numberValue,
  };
  console.log(obj);
}

function init() {
  viaCepData();
  button?.addEventListener("click", formData);
}

init();
