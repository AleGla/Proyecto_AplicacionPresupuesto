class Dato{
    constructor(descripcion, valor){
        this._descripcion=descripcion;
        this._valor=valor;
    }

    get getDescripcion(){
        return this._descripcion;
    }

    get getValor(){
        return this._valor;
    }

    set setValor(valor){
        this._valor=valor;
    }

    set setDescripcion(descripcion){
        this._descripcion=descripcion;
    }
    
}