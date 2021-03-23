import * as React from "react";
import * as styles from "./css/title.module.css";

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

export class Title extends React.Component<TitleInterface, {}> {
  constructor(props: TitleInterface) {
    super(props);
  }

  render(): JSX.Element {
    let css;
    let titleAtribute = "";
    switch (this.props.title) {
      case Titles.ABOUT:
        css = styles.about;
        titleAtribute = "About us";
        break;

      case Titles.MENUS:
        css = styles.menus;
        titleAtribute = "Menus";
        break;

      case Titles.ACCESS:
        css = styles.access;
        titleAtribute = "Access";
        break;

      case Titles.PREVENTION:
        css = styles.prevention;
        titleAtribute = "Virus Prevention";
        break;

      default:
        css = styles.payment;
        titleAtribute = "Payment Methods";
    }

    const title: JSX.Element = (
      <h2
        title={titleAtribute}
        className={(styles.title as string) + " " + css}
      ></h2>
    );

    return title;
  }
}
