import React from "react";

import "./home.scss";

function ContainerHome({ cssPage, setCssPage }) {
  if (cssPage !== "home") setCssPage("home");
  return (
    <div className="home_container">
      <h2 className="titleWelcome">Bienvenue sur EasyMeals</h2>

      <div className="quotePhrase">
        J'ai 5 enfants à la maison, c'est difficile d'organiser les repas pour
        la semaine
      </div>
      <div className="quotePhrase">
        Toujours un casse-tête de savoir quoi faire à manger cette semaine !!
      </div>
      <div className="quotePhrase">
        "Organiser des vacances pour 10 c'est vraiment pas simple..."
      </div>

      <div className="divCatchPhrase">
        <div className="catchPhraseBig">
          Mais avec <b>EasyMeals</b> les courses c'est FACILE !!
        </div>
        <div>
          Fini les casse-têtes, place à la <b>Simplicité</b> et la{" "}
          <b>Rapidité</b>
        </div>
      </div>
    </div>
  );
}

export default ContainerHome;
