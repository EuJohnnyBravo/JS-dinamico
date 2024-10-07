const nome = document.querySelector<HTMLInputElement>("#nome");
const email = document.querySelector<HTMLInputElement>("#email");
const idade = document.querySelector<HTMLInputElement>("#idade");
const cpf = document.querySelector<HTMLInputElement>("#cpf");
const dados = document.querySelector<HTMLElement>("#dados");

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", () => {
    if (email && nome && idade && cpf && dados) {
      const valorNome = nome.value;
      const valorEmail = email.value;
      const valorIdade = Number(idade.value);
      const valorCpf = cpf.value;

      if (validarDados(valorNome, valorEmail, valorIdade, valorCpf)) {
        dados.innerText = `Olá ${valorNome}! Seus dados estão corretos! :D`;
      }
    }
  });
}

function validarEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validarCPF(cpf: string): boolean {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}

function validarIdade(idade: number): boolean {
  if (idade >= 0) {
    return true;
  }
  return false;
}

function validarDados(
  valorNome: string,
  valorEmail: string,
  valorIdade: number,
  valorCpf: string
): boolean {
  if (dados) {
    if (!valorNome) {
      dados.innerText = `Nome invalido`;
      return false;
    }
    if (!validarEmail(valorEmail)) {
      dados.innerText = `Email com formato invalido`;
      return false;
    }
    if (!validarIdade(valorIdade)) {
      dados.innerText = `Idade menor que 0`;
      return false;
    }
    if (!validarCPF(valorCpf)) {
      dados.innerText = `CPF invalido`;
      return false;
    }
  }
  return true;
}
