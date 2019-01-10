import React from "react";

const Services = {
  get: url => {
    return fetch(url)
      .then(resp => resp.json())
      .then(data => data);
  },
  post: (url, new_obj) => {
    console.log("---- POST ------    url", url);
    console.log("new_obj ", new_obj);

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(new_obj)
    })
      .then(resp => resp.json())
      .then(data => data);
  },
  put: (url, updated_obj) => {
    return fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updated_obj)
    })
      .then(resp => resp.json())
      .then(data => data);
  }
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
