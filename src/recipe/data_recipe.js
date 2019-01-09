// == Internal helpers ==============================================

export const FAKE_RECIPES = [
  {
    id: 0,
    name: "crepes",
    isFavorite: false,
    nbPerson: 2,
    ingredients: [
      { qty: 3, unit: "g", food: "egg" },
      { qty: 100, unit: "g", food: "flou" },
      { qty: 1, unit: "l", food: "milk" }
    ],
    description: "easy to do... start with the eggs and flour then add milk",
    steps: ["mix flour and eggs", "add slowly milk"]
  },
  {
    id: 1,
    name: "lasagna",
    isFavorite: false,
    nbPerson: 4,
    ingredients: [
      { qty: 500, unit: "g", food: "steak" },
      { qty: 200, unit: "g", food: "pasata lasagna" },
      { qty: 100, unit: "cl", food: "creme fraiche" },
      { qty: 50, unit: "g", food: "parmesan" }
    ],
    description: "",
    steps: [
      "cook in a pan steak with tomato sauce",
      "when ready put in container some meet",
      "put slices of pasta",
      "recover with creme",
      "add another layer of pasta",
      "put meat",
      "put cheese on the top"
    ]
  },
  {
    id: 2,
    name: "burritos",
    isFavorite: true,
    nbPerson: 4,
    ingredients: [
      { qty: 500, unit: "g", food: "steak" },
      { qty: 1, unit: "", food: "spice mix packet" },
      { qty: 8, unit: "", food: "tortilla" },
      { qty: 1, unit: "", food: "avocado" },
      { qty: 1, unit: "", food: "salad" },
      { qty: 2, unit: "", food: "tomato" }
    ],
    description: "",
    steps: [
      "cook in a pan steak",
      "when it is almost cook add 20 cl of water and the spice mix packet",
      "in the meantime prepare the salad and cut in little squares tomatos and avocado",
      "when ready put torillas in microwaves",
      "mix in your plates meat with salad tomato and avocado"
    ]
  }
];
// var recipesTmp = [
//       {
//           "id": 3,
//           "name": "Cabillaud au Four",
//           "isPublic": true,
//           "user": {"id": 2117, "pseudo": "mathou", "email": null},
//           "pixName": 'cabillaudFour.jpg',
//           "recipeType": {"idType": 2, "nameType": "course"},
//           "ingredients": [{
//               "qty": 200,
//               "unit": "g",
//               "food": {"id": 7, "name": "cabillaud", "idCategory": 3, "isValidated": false}
//           }],
//           "descriptions": [{"name": "", "numDescrip": 1}],
//           "origin": {"id": 1, "name": "français", "numRank": 1},
//           "categories": [{"id": 2, "name": "four", "numRank": 5}, {"id": 3, "name": "legume", "numRank": 3}, {
//               "id": 4,
//               "name": "poisson",
//               "numRank": 2
//           }],
//           "nbPerson": 2, "rating": 0, "nbVoter": 0,
//           "timeCooking": 220,
//           "timePreparation": 10,
//           "isValidated": false,
//           "isFavorite": false,
//           "isForPlanning": false,
//           "ratingUser": 0,
//           "isHide": false
//           // "ratingSystem":{"isUserEditing":false,"starsEdit":[false,false,false,false,false]},
//           // "timeTotal":230,"onOver":false}
//       }]
