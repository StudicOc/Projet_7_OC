const Article = require("../models/Article");
const User = require("../models/User");
const Comment = require("../models/Comment");

//***************Gestions de plusieurs articles***********//
exports.getAllArticles = async (req, res) => {
  try {
    await Article.findAll({
      order: [["createdAt", "DESC"]],
      group: ["_id"],

      include: [
        {
          model: User,
          attributes: ["userId", "firstname", "lastname"],
        },

        {
          model: Comment,
          separate: true,
          required: false,
          include: [
            { model: User, attributes: ["userId", "firstname", "lastname"] },
          ],
        },
      ],
    })
      .then((articles) => {
        res.status(200).json(articles);
      })
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    console.error(
      "Impossible de recupérer les articles avec les commentaires:",
      error
    );
  }
};
