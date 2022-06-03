//************Le fichier nous permettra de regrouper les requêtes http pour la partie Articles //
//******************Récupérer les données depuis leurs fonctions**********/

import http from "../Service/http-common";

class ArticleDataService {
  postArticle(data) {
    return http.post("/article/add", data);
  }
}

export default new ArticleDataService();
