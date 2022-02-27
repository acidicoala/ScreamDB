import React from "react";
import { Route, Switch } from "react-router-dom";
import { path } from "../../util/paths";
import { Home } from "../../pages/Home";
import { Games } from "../../pages/Games";
import { SadFace } from "../util/SadFace";
import { useLocale } from "../../hooks/locale";
import { Offers } from "../../pages/Offers";

export function ScreamSwitch() {
  const { locale } = useLocale();

  return (
    <Switch>
      <Route exact path={path.to.home} children={<Home />} />
      <Route exact path={path.to.games} children={<Games />} />
      <Route exact path={path.to.offers(":namespace")} children={<Offers />} />
      <Route children={<SadFace children={locale.not_found} />} />
    </Switch>
  );
}
