//************Le fichier nous permettra de regrouper les requêtes http pour la partie Articles //
//******************Récupérer les données depuis leurs fonctions**********/

import http from "../Service/http-common";

class ArticleDataService {
  //****L'id de notre fonction fera référence à notre params de requête ****/
  postArticle(data) {
    return http.post("/article/add", data);
  }
  getAll() {
    return http.get("/articles");
  }

  getOne(id) {
    return http.get(`/article/${id}`);
  }
}

export default new ArticleDataService();
