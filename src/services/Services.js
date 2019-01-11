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
  createRecipe: recipe => post("http://localhost:3004/recipes", recipe),
  getRecipes: () => get("http://localhost:3004/recipes"),
  updateRecipe: (id, recipe) =>
    put(`http://localhost:3004/recipes/${id}`, recipe),
  deleteRecipe: id => delete_(`http://localhost:3004/recipes/${id}`),

  getPlanning: id => get(`http://localhost:3004/planning`)
};
export default Services;

//////////////////
// ex :  import Services, { get2, post2 } from './services'
//////////////////
// export function get2(url) {
//   console.log(" ---- GET 2 ------   url ", url);
// }
// export function post2(url, new_obj) {
//   console.log("---- POST 2------    url", url);
// }
