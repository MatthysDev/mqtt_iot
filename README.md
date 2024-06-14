# IOT MQTT

[Matthys Ducrocq](https://github.com/matthysdev)
[Corentyn Masset](https://github.com/corentyn)

## Documentation

### Requirements

- Node.js

### Installation

```bash
npm install
```

### Usage

Remplacer la variable dbUrl du fichier consumer.js par l'url de votre base de données MongoDB.

```javascript
const dbUrl = 'mongodb://localhost:27017/iot';
```

- [ ] Vérifier que vous êtes bien connecté en ouvrant mongo Atlas et en y ajoutant votre adresse IP.

- [ ] Ouvrir 3 terminaux et lancer les commandes suivantes :

```bash
node producer.js
```

```bash
node consumer.js
```

```bash
node requeue.js
```

- [ ] Ouvrir mongodb compass et vérifier que les données sont bien insérées dans la base de données.

Les messages seront mis en status 'pending' le temps que le consumer les traite. Une fois traités, ils seront mis en status 'done'.

### Architecture

- producer.js : Envoie des messages sur le topic 'iot'.
- consumer.js : Consomme les messages du topic 'iot' et les insère dans la base de données.
- requeue.js : Remet les messages en status 'pending' pour les traiter à nouveau.

### Technologies

- Node.js
- MongoDB
- MQTT


