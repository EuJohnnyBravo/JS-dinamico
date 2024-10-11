import { Tarefa } from "./tarefa";

const KEY = "@LISTA";

const input = document.querySelector<HTMLInputElement>("#inputTexto");
const salvar = document.querySelector<HTMLInputElement>("#salvar");
const lista = document.querySelector<HTMLInputElement>("#todoList");

const tarefasArmazenadasString = localStorage.getItem(KEY);
let tarefas: Tarefa[] = tarefasArmazenadasString
  ? JSON.parse(tarefasArmazenadasString)
  : [];

function excluirTarefa(id: number) {
  tarefas = tarefas.filter((t) => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(tarefas));
  mostrarTarefas();
}

function editarTarefa(id: number) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa) {
    const novaTarefa = prompt("Editando tarefa:", tarefa.descricao);
    if (novaTarefa !== null && novaTarefa.trim() !== "") {
      tarefa.descricao = novaTarefa;
      localStorage.setItem(KEY, JSON.stringify(tarefas));
    }
  }
  mostrarTarefas();
}

function salvarTarefa() {
  if (input) {
    if (input.value) {
      const tarefa = new Tarefa(input.value.trim());
      tarefas.push(tarefa);
      localStorage.setItem(KEY, JSON.stringify(tarefas));
    }
  }
}

function mostrarTarefas() {
  if (lista) {
    lista.innerHTML = "";
    const ul = document.createElement("ul");
    for (const t of tarefas) {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="tarefa">
          <a>${t.descricao} </a>
          <button id="excluir" class="botao-tarefa">❌</button>
          <button id="editar" class="botao-tarefa">✏️</button>
        </div>
      `;
      li.querySelector("#excluir")?.addEventListener("click", () =>
        excluirTarefa(t.id)
      );
      li.querySelector("#editar")?.addEventListener("click", () =>
        editarTarefa(t.id)
      );
      ul.appendChild(li);
    }
    lista.appendChild(ul);
  }
}

if (salvar) {
  salvar.addEventListener("click", () => {
    salvarTarefa();
    if (input) {
      input.value = "";
      mostrarTarefas();
    }
  });
}

mostrarTarefas();
