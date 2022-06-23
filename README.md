# Projet_7_OC

# About 🔥

Groupomania un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

Groupomania laisse la liberté sur les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

# Feature 🧾

Voici les exigences émises par le comité de pilotage :

- La présentation des fonctionnalités doit être simple ;
- La création d’un compte doit être simple et possible depuis un téléphone mobile ;
- Le profil doit contenir très peu d’informations pour que sa complétion soit rapide ;
- La suppression du compte doit être possible ;
- L’accès à un forum où les salariés publient des textes doit est présent;
- Les utilisateurs peuvent commenter les publications;
- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés ;
- Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre
  salariés;

# Responsive design🔥

Utilisation de bootstrap 4 pour un responsive design adapté

# Package Frontend 🧾

- Gestion des dates au format date avec le package dayjs.
- Si le format date n'est pas reconnu, installer via la commande : `npm install dayjs`

# Lancement des services Frontend ⚙️

- Frameworks Vue.js Version 3
- Avec la commande `cd` se rendre dans le dossier Front-end puis `cd social-media`.
- Pour lancer l'application `npm run serve`

# Backend ⚙️

Avec la commande cd se rendre dans le dossier backend et lancer le serveur: `nodemon server`.

# Important information ⚙️

Notre application est protégée avec dotenv.

# Exigences de sécurité 🔒

Frontend 🔒

- Vérifications des saisies de l'utilisateur (inscription) avec les regex javascript.
- Aucune données sensibles stocké dans le localstorage.

Backend 🔒

- Authentification par Token.
- Algorithme de hachage.
- Helmet.
