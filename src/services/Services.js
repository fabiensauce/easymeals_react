const get = url => {
  return fetch(url)
    .then(resp => resp.json())
    .then(data => data);
};

const post = (url, obj_to_create) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj_to_create)
  })
    .then(resp => resp.json())
    .then(data => data);
};

const put = (url, obj_to_update) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj_to_update)
  })
    .then(resp => resp.json())
    .then(data => data);
};
const delete_ = url => {
  return fetch(url, {
    method: "DELETE"
  })
    .then(res => res)
    .then(err => err);
};

const Services = {
  const URL = 'http://localhost:3004/'
  createRecipe: recipe => post(`${URL}recipes`, recipe),
  getRecipes: () => get("http://localhost:3004/recipes"),
  updateRecipe: (id, recp) => put(`http://localhost:3004/recipes/${id}`, recp),
  deleteRecipe: id => delete_(`http://localhost:3004/recipes/${id}`),

  getMeals: () => get(`http://localhost:3004/meals`),
  updateMeal: (id, meal) => put(`http://localhost:3004/meals/${id}`, meal),

  getNbPerson: () => get(`http://localhost:3004/nbPerson`),
  updateNbPerson: nb => put(`http://localhost:3004/nbPerson`, { value: nb }),

  createCustomErrand: cust => post("http://localhost:3004/customErrands", cust),
  getCustomErrands: () => get(`http://localhost:3004/customErrands`),
  deleteCustomErrand: id => delete_(`http://localhost:3004/customErrands/${id}`)
};
export default Services;
