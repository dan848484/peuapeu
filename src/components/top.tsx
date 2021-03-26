import * as React from "react";
import * as topStyles from "../components/css/top.module.css";
import logo from "../img/logo.png";

export class Top extends React.Component<{}, {}> {
  render() {
    return (
      <section className={topStyles.container}>
        <div className={topStyles.background}>
          <div className={topStyles.mask}>
            <img src={logo} className={topStyles.logo} alt="" />
          </div>
        </div>

        <div className={topStyles.arrow}>
          <div className={topStyles.scroll}>SCROLL</div>
          <div className={topStyles.line}></div>
        </div>
      </section>
    );
  }
}
