export interface IAdmin{
    admin_id:string;
    nom:string;
    prenom:string;
    email:string;
   
}

export const adAdminList: IAdmin[] =[
    {
        admin_id:"ouma1",
        nom:"dabbek",
        prenom:"omaima",
        email:"omayma@gmail.com",
      

    },
   
];

export enum PageEnum {
    list,
    update,
}