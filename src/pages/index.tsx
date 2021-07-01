import * as React from "react";
import "./reset.css";
import * as topStyles from "../components/css/top.module.css";
import * as loadingStyles from "../css/loading.module.css";
import * as aboutStyles from "../css/about.module.scss";
import * as menusStyles from "../css/menus.module.css";
import * as accessStyles from "../css/access.module.css";
import * as preventionStyles from "../css/prevention.module.css";
import * as paymentStyles from "../css/payment.module.css";
import * as footerStyles from "../css/footer.module.css";
import preventionImg from "../img/prevention.jpg";
import { Title, Titles } from "../components/title";
import { MenuTitles, Menu } from "../components/menu";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Top } from "../components/top";
import { PhotoView } from "../components/photoView";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PropsInterface {
  data: {
    img: {
      edges: {
        node: {
          name: string;
          publicURL: string;
        };
      }[];
    };
    background: {
      edges: {
        node: {
          name: string;
          publicURL: string;
        };
      }[];
    };
    logo: {
      edges: {
        node: {
          name: string;
          publicURL: string;
        };
      }[];
    };
  };
}

export const query = graphql`
  {
    img: allFile(filter: { sourceInstanceName: { eq: "img" } }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }

    background: allFile(filter: { sourceInstanceName: { eq: "background" } }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
    logo: allFile(filter: { sourceInstanceName: { eq: "logo" } }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
  }
`;

export default class Index extends React.Component<PropsInterface, {}> {
  isLoaded = false;
  logo = "";

  constructor(props: PropsInterface) {
    super(props);

    //put logo URL into this.logo from graphQL result.
    this.props.data.logo.edges.map((item) => {
      if (item.node.name == "logo") {
        this.logo = item.node.publicURL;
        return;
      }
    });
  }

  private getPaymentJSXElement(
    paymentName: string,
    fileName: string
  ): JSX.Element {
    const path = this.props.data.img.edges.find((element) => {
      return element.node.name == fileName;
    });
    if (path != undefined) {
      return (
        <div className={paymentStyles.tableRow}>
          <div className={paymentStyles.tableData}>
            <img
              className={paymentStyles.icon}
              src={path.node.publicURL}
              alt={fileName}
            />
          </div>
          <div
            className={
              paymentStyles.paymentName + " " + paymentStyles.tableData
            }
          >
            {paymentName}
          </div>
        </div>
      );
    } else {
      return <p>Faild to create Element.({paymentName})</p>;
    }
  }

  private closeLoadingView() {
    gsap
      .timeline()
      .to(`.${loadingStyles.container} > img`, {
        opacity: 1,
        duration: 0.5,
      })
      .to(`.${loadingStyles.container}`, {
        duration: 0.5,
        opacity: 0,
        display: "none",
      });
  }

  componentDidMount() {
    gsap.registerPlugin(ScrollTrigger);
    window.addEventListener("load", () => {
      this.isLoaded = true;
      this.closeLoadingView();
    });

    setTimeout(
      function () {
        if (!this.isLoaded) {
          this.isLoaded = true;
          this.closeLoadingView();
        }
      }.bind(this),
      2800
    );
  }

  render() {
    return (
      <div>
        <div className={loadingStyles.container}>
          <img src={this.logo} alt="" />
        </div>
        <div>
          <Helmet
            meta={[
              {
                name: `google-site-verification`,
                content: `j8uXVeWU4BDVsSEESX8hikeYheNHhGZrlLvpd4p3NRY`,
              },
            ]}
          >
            <script
              src="https://kit.fontawesome.com/6a5025b9a2.js"
              crossorigin="anonymous"
            ></script>
            <link
              href="https://fonts.googleapis.com/css?family=Noto+Sans+JP"
              rel="stylesheet"
            ></link>
            <title>peu a peu</title>
          </Helmet>

          <Top result={this.props.data.background} />
          <section className={aboutStyles.container}>
            <div className={aboutStyles.img}></div>
            <div className={aboutStyles.tableContainer}>
              <div className={aboutStyles.rowContainer}>
                <div className={aboutStyles.introductionContainer}>
                  <Title title={Titles.ABOUT} />
                  <p>
                    PeuaPeu means “little by little” in French.We have been
                    improving little by little.
                  </p>
                  <p>
                    And, we want you to have a more fulfilling time and be
                    happy.
                    <br />
                    This is why we create hair style.
                  </p>
                </div>
                <div className={aboutStyles.adressContainer}>
                  <Title title={Titles.ACCESS}></Title>

                  <p className={aboutStyles.number}>0766-28-4679</p>
                  <p className={aboutStyles.adress}>富山県高岡市上黒田381-82</p>
                  <a
                    className={aboutStyles.button}
                    href="https://www.google.com/maps/place/%E3%80%92933-0854+%E5%AF%8C%E5%B1%B1%E7%9C%8C%E9%AB%98%E5%B2%A1%E5%B8%82%E9%BB%92%E7%94%B0%E6%96%B0%E7%94%BA%EF%BC%93%EF%BC%98%EF%BC%91%E2%88%92%EF%BC%98%EF%BC%92+%E3%83%97%E3%83%BC+%E3%82%A2+%E3%83%97%E3%83%BC/@36.721289,137.004644,19z/data=!4m2!3m1!1s0x5ff782fff52aa87b:0x69128d09f7c3c94?hl=ja&gl=JP"
                  >
                    Open with GoogleMap →
                  </a>
                </div>
              </div>

              <div className={aboutStyles.rowContainer}>
                <div className={aboutStyles.photoContainer}>
                  <PhotoView></PhotoView>
                </div>
              </div>
            </div>
          </section>

          <section className={menusStyles.container}>
            <div className={menusStyles.inside}>
              <Title title={Titles.MENUS} />
              <Menu
                titile={MenuTitles.CUT}
                datail={[
                  { key: "大人", price: 4400, limit: true },
                  { key: "小学生", price: 2500, limit: true },
                  { key: "中・高校生", price: 3000, limit: true },
                  { key: "未就学児", price: 2300, limit: true },
                  { key: "前髪カット", price: 800, limit: true },
                ]}
              ></Menu>

              <Menu
                titile={MenuTitles.COLOR}
                datail={[
                  { key: "※すべてカット込みの値段です", header: true },
                  { key: "リタッチ", price: 9500, limit: true },
                  { key: "全体カラー", price: 10500, limit: true },
                  { key: "ウィービング", price: 9500, limit: true },
                  { key: "ダブルカラー", price: 13500, limit: true },
                  { key: "マニキュア", price: 9500, limit: true },
                  { key: "香草カラー", price: 10500, limit: true },
                  { key: "リタッチのみ", price: 6300, limit: true },
                ]}
              ></Menu>

              <Menu
                titile={MenuTitles.PERM}
                datail={[
                  { key: "パーマ", price: 9500, limit: true },
                  { key: "デジタルパーマ", price: 12500, limit: true },
                  { key: "クリニックパーマ", price: 10500, limit: true },
                  {
                    key: "ストレートパーマ(縮毛矯正)",
                    price: 15500,
                    limit: true,
                  },
                ]}
              ></Menu>

              <Menu
                titile={MenuTitles.TREATMENT}
                datail={[
                  { key: "トリートメント", header: true },
                  { key: "Like", price: 2500, limit: true },
                  { key: "NASEED", price: 2500, limit: true },
                  { key: "SHERPA", price: 2500, limit: true },
                  { key: "SPRINAGE", price: 2500, limit: true },
                  { key: "ヘッドスパ", header: true },
                  { key: "スパイス", price: 2000, limit: true },
                  { key: "MTGプロージュレ", price: 2000, limit: true },
                  { key: "ローランド", price: 4000, limit: true },
                  { key: "H2ケア", header: true },
                  { key: "H2ケア(水素パック)", price: 3000, limit: true },
                  { key: "酸熱ケア", header: true },
                  {
                    key: "酸熱ケア（髪質改善トリートメント）",
                    price: 8000,
                    limit: true,
                  },
                  { key: "BOXOFUSION", price: 8000, limit: true },
                  { key: "SLIMBALANCER", price: 8000, limit: true },
                ]}
              ></Menu>

              <Menu
                titile={MenuTitles.SET}
                datail={[
                  { key: "セット", price: 4200, limit: true },
                  { key: "着付け", price: 8000, limit: true },
                  { key: "MAKE", price: 4200, limit: true },
                  { key: "ポイントMAKE", price: 2000, limit: true },
                ]}
              ></Menu>
            </div>
            {/* <Menu titile={MenuTitles.OTHERS} datail={[]}></Menu> */}
          </section>

          <section className={preventionStyles.container}>
            <Title title={Titles.PREVENTION}></Title>
            <p className={preventionStyles.content}>
              We countermeasure against covid-19.
            </p>
            <img
              src={preventionImg}
              alt="Virus Prevention"
              className={preventionStyles.img}
            />
          </section>

          <section className={paymentStyles.container}>
            <Title title={Titles.PAYMENT}></Title>
            <p className={paymentStyles.introduction}>
              You can pay with these methods or cash.
            </p>
            <div className={paymentStyles.paymentTable}>
              {[
                this.getPaymentJSXElement("Apple Pay", "Apple Pay"),

                this.getPaymentJSXElement("Visa", "visa"),
                this.getPaymentJSXElement("Master", "master"),
                this.getPaymentJSXElement("JCB", "jcb"),
                this.getPaymentJSXElement("Diners", "diners"),
                this.getPaymentJSXElement("AMEX", "amex"),
                this.getPaymentJSXElement("iD", "id"),
                this.getPaymentJSXElement("QUICKPay", "QuickPay"),
                this.getPaymentJSXElement("UnionPay", "UnionPay"),
                this.getPaymentJSXElement("AliPay", "AliPay"),
                this.getPaymentJSXElement("WeChat Pay", "WeChat Pay"),
                this.getPaymentJSXElement("d払い", "d払い"),

                this.getPaymentJSXElement("PayPay", "PayPay"),
                this.getPaymentJSXElement("LINE Pay", "LINE Pay"),
                this.getPaymentJSXElement("au Pay", "auPay"),
              ]}
            </div>

            <div className={paymentStyles.paymentTablePc}>
              <div className={paymentStyles.tableDataPc}>
                {this.getPaymentJSXElement("Apple Pay", "Apple Pay")}
                {this.getPaymentJSXElement("Master", "master")}
                {this.getPaymentJSXElement("Diners", "diners")}
                {this.getPaymentJSXElement("iD", "id")}
                {this.getPaymentJSXElement("UnionPay", "UnionPay")}
                {this.getPaymentJSXElement("WeChat Pay", "WeChat Pay")}
                {this.getPaymentJSXElement("PayPay", "PayPay")}
                {this.getPaymentJSXElement("au Pay", "auPay")}
              </div>
              <div className={paymentStyles.tableDataPc}>
                {this.getPaymentJSXElement("Visa", "visa")}
                {this.getPaymentJSXElement("JCB", "jcb")}
                {this.getPaymentJSXElement("AMEX", "amex")}
                {this.getPaymentJSXElement("QUICKPay", "QuickPay")}
                {this.getPaymentJSXElement("AliPay", "AliPay")}
                {this.getPaymentJSXElement("d払い", "d払い")}
                {this.getPaymentJSXElement("LINE Pay", "LINE Pay")}
              </div>
            </div>

            <div className={paymentStyles.transContainer}>
              <p className={paymentStyles.transTitle}>
                Prepaid transportation cards
              </p>
              <img
                src={
                  this.props.data.img.edges.find((element) => {
                    return element.node.name == "transportation";
                  }).node.publicURL
                }
                className={paymentStyles.transImg}
                alt=""
              />
            </div>
          </section>

          <section className={footerStyles.container}>
            <div className={footerStyles.logo}></div>
            <p>Copyright © PeuaPeu All Rights Reserved.</p>
          </section>
        </div>
      </div>
    );
  }
}
