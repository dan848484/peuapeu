import * as React from "react";
import "./reset.css";
import * as aboutStyles from "../css/about.module.scss";
import * as menusStyles from "../css/menus.module.css";
import * as accessStyles from "../css/access.module.css";
import * as preventionStyles from "../css/prevention.module.css";
import * as paymentStyles from "../css/payment.module.css";
import * as footerStyles from "../css/footer.module.css";
import preventionImg from "../img/prevention.png";
import { Title, Titles } from "../components/title";
import { MenuTitles, Menu } from "../components/menu";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Top } from "../components/top";

interface PropsInterface {
  data: {
    allFile: {
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
    allFile(filter: { sourceInstanceName: { eq: "img" } }) {
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
  constructor(props: PropsInterface) {
    super(props);
  }

  private getPaymentJSXElement(
    paymentName: string,
    fileName: string
  ): JSX.Element {
    const path = this.props.data.allFile.edges.find((element) => {
      return element.node.name == fileName;
    });
    if (path != undefined) {
      return (
        <tr>
          <td>
            <img
              className={paymentStyles.icon}
              src={path.node.publicURL}
              alt={fileName}
            />
          </td>
          <td className={paymentStyles.paymentName}>{paymentName}</td>
        </tr>
      );
    } else {
      return <p>Faild to create Element.({paymentName})</p>;
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <script
            src="https://kit.fontawesome.com/6a5025b9a2.js"
            crossorigin="anonymous"
          ></script>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP"
            rel="stylesheet"
          ></link>
        </Helmet>
        <Top />
        <section className={aboutStyles.container}>
          <div className={aboutStyles.img}></div>
          <div className={aboutStyles.introductionContainer}>
            <Title title={Titles.ABOUT} />
            <p>PeuaPeu means “slow” in French.We have been improving slowly.</p>
            <p>
              And, we want you to have a more fulfilling time and be happy.
              <br />
              This is why we create hair style.
            </p>
            {/* pictures will be placed here. */}
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

        <section className={accessStyles.container}>
          <Title title={Titles.ACCESS}></Title>
          <p className={accessStyles.miniTitle}>Adress &amp; Number</p>
          <p className={accessStyles.contents}>
            富山県高岡市上黒田高岡市381-82
          </p>
          <p className={accessStyles.contents}>0766-28-4679</p>
          <iframe
            className={accessStyles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.21701194889016!2d137.00449804120078!3d36.72139097080784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff782fff52aa87b%3A0x69128d09f7c3c94!2z44OX44O8IOOCoiDjg5fjg7w!5e0!3m2!1sja!2sjp!4v1616493222553!5m2!1sja!2sjp"
            loading="lazy"
          ></iframe>
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
            You can pay with these methods and cash.
          </p>
          <table className={paymentStyles.paymentTable}>
            {[
              this.getPaymentJSXElement("Apple Pay", "Apple Pay"),
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
          </table>
          <p className={paymentStyles.transTitle}>
            Prepaid transportation cards
          </p>
          <img
            src={
              this.props.data.allFile.edges.find((element) => {
                return element.node.name == "transportation";
              }).node.publicURL
            }
            className={paymentStyles.transImg}
            alt=""
          />
        </section>

        <section className={footerStyles.container}>
          <div className={footerStyles.logo}></div>
          <p>Copyright © PeuaPeu All Rights Reserved.</p>
        </section>
      </div>
    );
  }
}
