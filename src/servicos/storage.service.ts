import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_key.config";
import { LocalUser } from "../dominio/local_user";


// Insere um token no local storage do HTML 5 
@Injectable()
export class StorageService {


   // o parse foi usado pois o local storage retorna string
    getLocalUser(): LocalUser {
         let user = localStorage.getItem(STORAGE_KEYS.localUser);
       
        console.log(`Local user ${user}`);
         if (user == null)
             return null;
          else 
          return JSON.parse(user);
    }

    // seta o token do usuário no localStorage
    setLocalUser(user : LocalUser){
     // passar user null é pq deve ser removido
       console.log(`Local user foi setado para :  ${user}`);
        if(user == null)
            localStorage.removeItem(STORAGE_KEYS.localUser)
         else   
            // armazenar o objeto que contém o token 
             localStorage.setItem(STORAGE_KEYS.localUser,  JSON.stringify(user));
      
    }

}