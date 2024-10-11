export class Tarefa {
  public id: number;
  public descricao: string;

  constructor(descricao: string, id?: number) {
    this.id = id ? id : Date.now();
    this.descricao = descricao;
  }
}
