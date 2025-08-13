import { Autor } from "./autor.model"
import { Categoria } from "./categoria.model"

export interface Libro  {
    idLibro: number
    titulo: string
    editorial: string
    numPaginas: number
    edicion: string
    idioma: string
    fechaPublicacion: Date
    descripcion: string
    tipoPasta: string
    iSBN: string
    numEjemplares: number
    portada: string
    presentacion: string
    precio: number
    categoria: Categoria
    autor: Autor

    [key: string]: any;

}