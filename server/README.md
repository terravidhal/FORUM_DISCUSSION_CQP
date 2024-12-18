# Backend Express

Ce projet est un backend construit avec Express.js. Il utilise MongoDB Atlas pour la base de données et JWT pour l'authentification.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) sur votre machine.

## Installation

Pour installer les packages nécessaires, exécutez la commande suivante dans votre terminal à la racine du projet :

```bash
npm install
```

## Configuration de l'environnement

1. **Créer un fichier `.env`** :
   À la racine de votre projet, créez un fichier nommé `.env`.

2. **Remplir le fichier `.env`** :
   Ouvrez le fichier `.env` et ajoutez les informations suivantes :

   ```env
   MONGO_URL='your url mongo db atlas'
   JWT_SECRET='your secret code'
   NAME_ADMIN='your admin name'
   EMAIL_ADMIN='your admin email'
   PASSWORD_ADMIN='your admin password'
   ROLE_ADMIN='superAdmin'


3. **ouvrir le terminal et lancer le serveur** :  
    `npm start`


2. **Pour créer un compte administrateur, ouvrez un autre terminal et exécutez la commande suivante** :  
    `npm run admin-seeder`

3. **connecter vous au front-end de l'application à travers le "login page" en utilisant le 'EMAIL_ADMIN' et 'PASSWORD_ADMIN' rempli  precedemment** :  
   