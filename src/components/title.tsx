import * as React from "react";
import * as styles from "./css/title.module.css";
import { miniTitle } from "../css/about.module.scss";
import { ImagesContext } from "../pages/index";

export enum Titles {
  ABOUT,
  MENUS,
  ACCESS,
  PREVENTION,
  PAYMENT,
}

interface TitleInterface {
  title: Titles;
}

export const Title = (props: TitleInterface) => {
  const images = React.useContext(ImagesContext);

  if (Object.keys(images["all"]).length === 0) {
    return <p>..loading</p>;
  }

  let css;
  let titleAtribute = "";
  let url = "";

  switch (props.title) {
    case Titles.ABOUT:
      css = styles.about;
      titleAtribute = "About us";
      url = images["about"]["AboutUs.png"]?.url;
      break;

    case Titles.MENUS:
      css = styles.menus;
      titleAtribute = "Menus";
      url = images["menu"]["Menus.png"]?.url;
      break;

    case Titles.ACCESS:
      css = styles.access + " " + miniTitle;
      titleAtribute = "Access";
      url = images["about"]["adress.png"]?.url;
      break;

    case Titles.PREVENTION:
      css = styles.prevention;
      titleAtribute = "Virus Prevention";
      url = images["all"]["images/others/VirusPrevention.png"]?.url;
      break;

    default:
      css = styles.payment;
      titleAtribute = "Payment Methods";
      url = images["payments"]["PaymentMethods.png"]?.url;
  }

  const title: JSX.Element = (
    <h2
      title={titleAtribute}
      className={(styles.title as string) + " " + css}
      style={{
        backgroundImage: "url(" + url + ")",
      }}
    ></h2>
  );

  return title;
};
