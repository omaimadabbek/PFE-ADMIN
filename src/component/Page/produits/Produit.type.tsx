export interface IProduit{
    id_produit:string;
    id_categorie:string;
    nom:string;
    prix:string;
    image:string;
    repture_de_stock:string;
    description:string;

}

export const prdProduitList: IProduit[] =[];

export enum PageEnum {
    list,
    add,
    update,
    
}