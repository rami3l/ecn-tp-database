db = new Mongo().getDB("public");

db.createCollection('phonebook', {
    capped: false
});

// Made with https://transform.tools/yaml-to-json. Many thanks to its author!

db.phonebook.insert([{
    "from": {
        "firstName": "Alice",
        "lastName": "DUMOND"
    },
    "data": [{
        "name": "Jacques REY",
        "company": "My Fruit Company",
        "phone": "+33 6 65 89 56 34",
        "email": "Jacques.Rey@fruitcompany.com",
        "result": "Attente avis"
    }, {
        "name": "Adeline PROUST",
        "company": "Les fruits de là bas",
        "phone": "+33 4 98 12 22 11",
        "email": "adproust@gmail.com",
        "result": "Attente de devis de notre part"
    }]
}, {
    "from": {
        "firstName": "Pascal",
        "lastName": "LELIEVRE"
    },
    "data": [{
        "firstName": "Vladimir",
        "lastName": "DIMITRIEVSKI",
        "email": "primerandco@gmail.com",
        "company": "Primeur & co",
        "date": "12/03/2019",
        "result": "A relancer"
    }, {
        "firstName": "Peter",
        "lastName": "NICOLS",
        "email": "com.pote@macompote.com",
        "company": "Com’Pote",
        "date": "21/04/2019",
        "result": "Prêt pour un essai"
    }],
}, {
    "from": {
        "firstName": "Laetitia",
        "lastName": "DUPOND"
    },
    "data": [{
        "name": "Nathalie TOUGERON",
        "phone": "06 12 85 45 76",
        "company": "TOUGERON & Fille",
        "date": "14/05/2019",
        "result": "Devrait passer commande prochainement"
    }, {
        "name": "Alexandra MARKOVA",
        "phone": "06 87 81 20 74",
        "company": "Primeur & co",
        "date": "19/05/2019",
        "result": "A recontacter en fin d’année"
    }]
}])