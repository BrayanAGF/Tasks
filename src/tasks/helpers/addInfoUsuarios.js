import { getInfoUser } from "./getInfoUser";

export const addInfoUsuarios = async(arreglo) => {
    
    let arregloTemp = []; 

    for (let elemento of arreglo) {
        const {Integrantes, id} = elemento;
        for (const p of Integrantes) {
          arregloTemp.push(getInfoUser(p));
        }
        let infoUsers = await Promise.all(arregloTemp);
        elemento = {...elemento, infoU: infoUsers}
        const arregloTemp2 = arreglo.filter(e => e.id !== id);
        arreglo = [...arregloTemp2, elemento];
        arregloTemp = []
      }

    return arreglo;
}
