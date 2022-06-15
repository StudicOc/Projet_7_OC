const db = require("../config.db/db");

//*******************Obtenez tous les articles avec des commentaires****************** */
exports.getAllArticle = async (req, res) => {
  try {
    const articleComment = await db.query(
      "SELECT * FROM articles left join comments on comments.ArticleId = articles._id",
      (error, results, fields) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results, articleComment });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
