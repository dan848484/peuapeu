import * as React from "react";
import * as topStyles from "../components/css/top.module.css";
import logo from "../img/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImagesContext } from "../pages";

export class Top extends React.Component<{}> {
  static contextType = ImagesContext;

  declare context: React.ContextType<typeof ImagesContext>;

  constructor() {
    super({});
    // this.context.get
  }

  componentDidMount(): void {
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
  componentWillUnmount(): void {}

  private changeBackground(): void {}

  render() {
    return <section className={topStyles.container}></section>;
  }
}
