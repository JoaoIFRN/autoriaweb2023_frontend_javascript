import { Usuario } from "./Usuario.js";

export class Tarefa {
  constructor(titulo, descricao) {
      this._titulo = titulo;
      this._descricao = descricao;
      this._isCompleta = false;
      this._dataAbertura = Date.now();
      this._dataPrevistaFinalizacao = null;
      this._usuario = null;
  }

  set titulo(titulo){
    this._titulo = titulo;
  }

  set descricao (descricao){
    this._descricao = descricao ;
  }

  set isCompleta (isCompleta){
    this._isCompleta = isCompleta ;
  }

  set dataAbertura (dataAbertura){
    this._dataAbertura = dataAbertura ;
  }

  set dataPrevistaFinalizacao (_dataPrevistaFinalizacao){
    this._dataPrevistaFinalizacao = dataPrevistaFinalizacao ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }

  get titulo(){
    return this._titulo;
  }

  get descricao(){
    return this._descricao;
  }  

  get isCompleta(){
    return this._isCompleta;
  }    

  get dataAbertura(){
    return this._dataAbertura;
  }   

  get dataPrevistaFinalizacao(){
    return this._dataPrevistaFinalizacao;
  }    

  get usuario(){
    return this._usuario;
  }   

}