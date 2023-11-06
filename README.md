# Mini Auth Starter

## Setup

Installer les dependances
```
npm i
```

Lancer en dev
```
npm run dev
```

Build le projet
```
npm run build
```

Lancer le projet en prod
```
npm run start
```


L'idéal serait de créer de nouveaux modules pour faire le projet

N'oubliez pas d'ajouter, d'utiliser vos controlleurs dans le fichier src/server.ts


## Routes auth

### POST /auth/register
```
{
    "username": "example",
    "password": "example"
}
```

### POST /auth/login
```
{
    "username": "example",
    "password": "example"
}
```

### GET /auth/me
