//************Le fichier nous permettra de regrouper les requêtes http pour la partie User //
//******************Récupérer les données depuis leurs fonctions**********/
import http from "../Service/http-common";

class UsersDataService {
  //getUser() {return http.get("/profil");}
  putUser(data) {
    return http.put("/profil", data);
  }
  deleteUser() {
    return http.delete("/profil");
  }
}

export default new UsersDataService();
