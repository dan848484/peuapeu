import * as React from "react";
import * as topStyles from "../components/css/top.module.css";
import logo from "../img/logo.png";
import { graphql, useStaticQuery } from "gatsby";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TopPropsInterface {
  result: {
    edges: {
      node: {
        name: string;
        publicURL: string;
      };
    }[];
  };
}

interface TopStateInterface {
  index: number;
}

export class Top extends React.Component<TopPropsInterface, TopStateInterface> {
  backgroundURL: string[];
  elements = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  interval: NodeJS.Timeout = null;
  constructor(props: TopPropsInterface) {
    super(props);
    this.backgroundURL = this.props.result.edges.map((element) => {
      return element.node.publicURL;
    });
    this.state = { index: null };

    gsap.registerPlugin(ScrollTrigger);
  }

  componentDidMount(): void {
    this.interval = setInterval(this.changeBackground.bind(this), 1500);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: `.${topStyles.container}`,
          start: "top top",
          scrub: true,
          pin: true,
          end: "+=400",
        },
      })
      .to(`.${topStyles.back}`, {
        scale: 2,
        duration: 1,
        ease: "Power4.out",
      });
  }
  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  private changeBackground(): void {
    if (this.state.index == null) {
      this.setState({ index: 0 });
    } else if (this.state.index == 5) {
      this.setState({ index: 0 });
    }

    if (this.elements == undefined) {
      return;
    }
    switch (this.state.index) {
      case 0:
        this.elements[0].current.className =
          topStyles.back +
          " " +
          topStyles.back_anniversary +
          " " +
          topStyles.outAnimation;

        break;

      case 1:
        this.elements[1].current.className =
          topStyles.back +
          " " +
          topStyles.back_store +
          " " +
          topStyles.outAnimation;

        break;
      case 2:
        this.elements[2].current.className =
          topStyles.back +
          " " +
          topStyles.back_light +
          " " +
          topStyles.outAnimation;

        break;
      case 3:
        this.elements[3].current.className =
          topStyles.back +
          " " +
          topStyles.back_bike +
          " " +
          topStyles.outAnimation;

        break;
      default:
        this.elements[4].current.className =
          topStyles.back +
          " " +
          topStyles.back_grass +
          " " +
          topStyles.outAnimation;
        setTimeout(() => {
          this.elements.map((element) => {
            element.current.classList.remove(topStyles.outAnimation);
          });
        }, 550);
        break;
    }

    this.setState({ index: this.state.index + 1 });
  }

  render() {
    return (
      <section className={topStyles.container}>
        <div className={topStyles.back + " " + topStyles.back_anniversary} />
        <div
          className={topStyles.back + " " + topStyles.back_grass}
          ref={this.elements[4]}
        />
        <div
          className={topStyles.back + " " + topStyles.back_bike}
          ref={this.elements[3]}
        />
        <div
          className={topStyles.back + " " + topStyles.back_light}
          ref={this.elements[2]}
        />
        <div
          className={topStyles.back + " " + topStyles.back_store}
          ref={this.elements[1]}
        />
        <div
          className={topStyles.back + " " + topStyles.back_anniversary}
          ref={this.elements[0]}
        />
        <div className={topStyles.mask}>
          <img src={logo} className={topStyles.logo} alt="" />
        </div>

        <div className={topStyles.arrow}>
          <div className={topStyles.scroll}>SCROLL</div>
          <div className={topStyles.line}></div>
        </div>
      </section>
    );
  }
}
