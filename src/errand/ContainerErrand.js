import React, { Component } from "react";
import Services from "../services/Services";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./containerErrand.scss";

function _flattenRecipes(recipes) {
  return recipes.reduce((result_ingredients, currRecipe) => {
    return [...result_ingredients, ...currRecipe.ingredients];
  }, []);
}
function _flattenMeals(meals) {
  return meals.reduce((result_ingredients, currMeal) => {
    let ingredients = _flattenRecipes(currMeal.recipes);
    return [...result_ingredients, ...ingredients];
  }, []);
}
function _mergeIngredients(ingredients) {
  let mergedIngredients = [];
  for (let errand of ingredients) {
    let mergedErrand = mergedIngredients.find(mi => mi.food === errand.food);
    if (mergedErrand) {
      mergedErrand.qty = mergedErrand.qty + errand.qty;
    } else mergedIngredients.push({ ...errand });
  }
  return mergedIngredients;
}
const _computeErrandsFromMeals = meals =>
  _mergeIngredients(_flattenMeals(meals));

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

class ContainerErrand extends Component {
  state = {
    errandsCustom: [],
    valueInputCustom: ""
  };

  componentDidMount() {
    let { cssPage, setCssPage } = this.props;
    if (cssPage !== "errand") setCssPage("errand");

    Services.getCustomErrands().then(dataCustomErrands => {
      console.log("errandsCustom ", dataCustomErrands);
      this.setState({ errandsCustom: dataCustomErrands });
    });
  }

  // Arrow fx for binding
  onChangeInputCustom = event => {
    this.setState({ valueInputCustom: event.target.value });
  };

  addCustom(customErrand) {
    Services.createCustomErrand({ value: customErrand }).then(
      dataCustomErrand => {
        this.setState({
          errandsCustom: [...this.state.errandsCustom, dataCustomErrand],
          valueInputCustom: ""
        });
      }
    );
  }
  deleteCustom(customErrand) {
    let { errandsCustom } = this.state;
    _.remove(errandsCustom, elem => elem.id === customErrand.id);
    Services.deleteCustomErrand(customErrand.id).then(() => {
      this.setState({ errandsCustom });
    });
  }

  render() {
    let { meals } = this.props;
    let errands = _computeErrandsFromMeals(meals);
    return (
      <div className="container_errand">
        {errands.map((ingredient, index) => (
          <div className="ingredient" key={index}>
            {ingredient.qty + " " + ingredient.unit + " " + ingredient.food}
          </div>
        ))}

        <div className="addCustom">
          {this.state.errandsCustom.map((errandCustom, index) => (
            <div className="errandsCustom" key={errandCustom.id}>
              {errandCustom.value}
              <span
                className="deleteRecipe"
                onClick={() => this.deleteCustom(errandCustom)}
              >
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </span>
            </div>
          ))}

          <input
            type="text"
            value={this.state.valueInputCustom}
            onChange={this.onChangeInputCustom}
          />
          <span
            className="btn"
            onClick={() => this.addCustom(this.state.valueInputCustom)}
          >
            ADD +
          </span>
        </div>
      </div>
    );
  }
}

export default ContainerErrand;
