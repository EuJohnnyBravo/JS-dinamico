console.log("to do list!");

const KEY = "@LISTA";

const input = document.querySelector<HTMLInputElement>("#inputTexto");
const botao = document.querySelector<HTMLInputElement>("#salvar");
const lista = document.querySelector<HTMLInputElement>("#todoList");
let tarefas: string[] = [];
const tarefasArmazenadasString = localStorage.getItem(KEY);
if (tarefasArmazenadasString) {
  tarefas = JSON.parse(tarefasArmazenadasString);
  mostrarTarefas();
}

function salvarTarefa() {
  if (input) {
    const tarefa = input.value;
    console.log(input);
    tarefas.push(tarefa);
    localStorage.setItem(KEY, JSON.stringify(tarefas));
  }
}

function mostrarTarefas() {
  if (lista) {
    lista.innerHTML = "";
  }
  const ul = document.createElement("ul");
  tarefas.forEach((t) => {
    const li = document.createElement("li");
    li.innerText = t;
    ul.appendChild(li);
  });
  lista?.appendChild(ul);
}

if (botao) {
  botao.addEventListener("click", () => {
    salvarTarefa();
    if (input) {
      input.value = "";
      mostrarTarefas();
    }
  });
}
