db = new Mongo().getDB("public");

db.createCollection('employee', {
    capped: false
});

db.createCollection('client', {
    capped: false
});

var ad = ObjectId();
var pl = ObjectId();
var ld = ObjectId();

// Made with https://transform.tools/yaml-to-json. Many thanks to its author!
db.employee.insert([{
    "_id": ad,
    "firstName": "Alice",
    "lastName": "DUMOND"
}, {
    "_id": pl,
    "firstName": "Pascal",
    "lastName": "LELIEVRE"
}, {
    "_id": ld,
    "firstName": "Laetitia",
    "lastName": "DUPOND"
}]);

db.client.insert([{
        "from": ad,
        "firstName": "Jacques",
        "lastName": "REY",
        "company": "My Fruit Company",
        "phone": "+33 6 65 89 56 34",
        "email": "Jacques.Rey@fruitcompany.com",
        "result": "Attente avis"
    }, {
        "from": ad,
        "firstName": "Adeline",
        "lastName": "PROUST",
        "company": "Les fruits de là bas",
        "phone": "+33 4 98 12 22 11",
        "email": "adproust@gmail.com",
        "result": "Attente de devis de notre part"
    }, {
        "from": pl,
        "firstName": "Vladimir",
        "lastName": "DIMITRIEVSKI",
        "company": "Primeur & co",
        "email": "primerandco@gmail.com",
        "date": "12/03/2019",
        "result": "A relancer"
    },
    {
        "from": pl,
        "firstName": "Peter",
        "lastName": "NICOLS",
        "company": "Com’Pote",
        "email": "com.pote@macompote.com",
        "date": "21/04/2019",
        "result": "Prêt pour un essai"
    },
    {
        "from": ld,
        "firstName": "Nathalie",
        "lastName": "TOUGERON",
        "company": "TOUGERON & Fille",
        "phone": "06 12 85 45 76",
        "date": "14/05/2019",
        "result": "Devrait passer commande prochainement"
    },
    {
        "from": ld,
        "firstName": "Alexandra",
        "lastName": "MARKOVA",
        "company": "Primeur & co",
        "phone": "06 87 81 20 74",
        "date": "19/05/2019",
        "result": "A recontacter en fin d’année"
    }
])