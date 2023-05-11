export interface ICategorie{
    id_categorie:string;
    nom_categorie:string;
    image:string;
}

export const catCategorieList: ICategorie[] =[];

export enum PageEnum {
    list,
    add,
    update,
}