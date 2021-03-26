import * as React from "react";
import * as topStyles from "../components/css/top.module.css";
import logo from "../img/logo.png";

interface TopStateInterface {
  index: number;
  class: string;
}

export class Top extends React.Component<{}, TopStateInterface> {
  backgrounds: string[] = [];
  backgroundElement = React.createRef();
  constructor(props: {}) {
    super(props);
    this.backgrounds = [
      topStyles.back_store,
      topStyles.back_light,
      topStyles.back_bike,
      topStyles.back_grass,
    ];

    this.state = { index: null, class: topStyles.background };
    setTimeout(this.changeBackground.bind(this), 100);
  }

  componentDidMount(): void {
    setInterval(this.changeBackground.bind(this), 2000);
  }

  private changeBackground(): void {
    console.log("背景変更");
    if (this.state.index == null) {
      this.setState({ index: 0 });
    } else if (this.state.index == 4) {
      this.setState({ index: 0 });
    }

    switch (this.state.index) {
      case 0:
        this.setState({
          class: topStyles.background + " " + topStyles.back_store,
        });

        break;
      case 1:
        this.setState({
          class: topStyles.background + " " + topStyles.back_light,
        });

        break;
      case 2:
        this.setState({
          class: topStyles.background + " " + topStyles.back_bike,
        });
        break;
      default:
        this.setState({
          class: topStyles.background + " " + topStyles.back_grass,
        });
        break;
    }

    this.setState({ index: this.state.index + 1 });
  }

  render() {
    return (
      <section className={topStyles.container}>
        <div ref={this.backgroundElement} className={this.state.class}>
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
