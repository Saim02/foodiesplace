import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import Search from "antd/lib/input/Search";
import Axios from "axios";
import Modal from "antd/lib/modal/Modal";

const apiKey1 = "905aac91a6694def8a5d4d733d0307b5";
const apiKey2 = "8862f33e730b4bfaac5b41df5823efd4";

export default function SlideShow(props) {
  const { searchList } = props;
  const [searchResult, setSearchResult] = useState([]);
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [foodFullRecipe, setFoodFullRecipe] = useState([]);
  useEffect(() => {
    Axios.get(
      "https://api.spoonacular.com/recipes/random?&number=12&apiKey=" + apiKey2
    )
      .then((res) => setSearchResult(res.data.recipes))
      .catch((error) => alert(error));
  }, []);

  return (
    <React.Fragment>
      <header id="slideshow">
        <AutoComplete
          onSelect={(title) => {
            Axios.get(
              "https://api.spoonacular.com/recipes/complexSearch?query=" +
                title +
                "&number=12&apiKey=" +
                apiKey2
            )
              .then((res) => setSearchResult(res.data.results))
              .catch((error) => alert(error));
          }}
          onSearch={(value) => {
            Axios.get(
              "https://api.spoonacular.com/recipes/autocomplete?query=" +
                value +
                "&number=12&apiKey=" +
                apiKey2
            )
              .then((res) => setAutoCompleteList(res.data))
              .catch((error) => console.warn(error));
          }}
          className="searchbar"
          size="middle"
          placeholder="Search Recipe"
        >
          {autoCompleteList.map((option) => (
            <AutoComplete.Option key={option.title}>
              {option.title}
            </AutoComplete.Option>
          ))}
        </AutoComplete>
      </header>
      <section id="recipeslistcontainer">
        {searchResult && (
          <ul>
            {searchResult.map((recipe, index) => (
              <li
                key={recipe.id}
                onClick={() => {
                  Axios.get(
                    "https://api.spoonacular.com/recipes/" +
                      recipe.id +
                      "/ingredientWidget.json?apiKey=" +
                      apiKey2
                  )
                    .then((res) => {
                      setFoodFullRecipe(res.data.ingredients);
                      setShowModal(true);
                    })
                    .catch((error) => console.error(error));
                }}
              >
                <div className="overlay">
                  <h2>{recipe.title}</h2>
                </div>
                <img src={recipe.image} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        className="recipemodal"
      >
        <div className="recipemodalcontainer">
          {JSON.stringify(foodFullRecipe)}
        </div>
      </Modal>
    </React.Fragment>
  );
}
