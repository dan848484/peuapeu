import * as React from "react";
import * as styles from "./css/menu.module.css";
import anime from "animejs";
import { ImagesContext } from "../pages/index";

export enum MenuTitles {
  CUT,
  COLOR,
  PERM,
  TREATMENT,
  SET,
  OTHERS,
}

interface MenuPropsInterface {
  titile: MenuTitles;
  datail: { key: string; price?: number; limit?: boolean; header?: boolean }[];
  option?: JSX.Element;
}

interface MenuStateInterface {
  isOpen: boolean;
}

export const Menu = (props: MenuPropsInterface) => {
  const [isOpen, setState] = React.useState(false);
  const images = React.useContext(ImagesContext);
  const plusIconDom = React.createRef<HTMLDivElement>();
  const contentsContainerDom = React.createRef<HTMLDivElement>();
  const contentsDom = React.createRef();
  const tableDom = React.createRef<HTMLTableElement>();
  const click = (event: React.MouseEventHandler<HTMLDivElement>) => {
    if (isOpen) {
      //展開された状態で閉じる処理はここ
      setState(false);
      if (
        isExist(plusIconDom.current) &&
        isExist(contentsContainerDom) &&
        isExist(contentsDom)
      ) {
        //プラスボタンのアニメーション
        anime({
          targets: plusIconDom.current,

          rotate: 0,
        });

        //
        contentsContainerDom.current.className = styles.contentsContainerDom;

        contentsDom.current.className =
          styles.contentsDom + "  " + styles.contentsDom_Closed;
      }
    } else {
      //まだ展開されてない状態だとここのブロック
      if (
        isExist(plusIconDom.current) &&
        isExist(contentsContainerDom) &&
        isExist(contentsDom)
      ) {
        anime({
          targets: plusIconDom.current,
          rotate: 45,
        });

        contentsContainerDom.current.className =
          styles.contentsContainerDom +
          " " +
          styles.contentsContainerDom_Opened;

        contentsDom.current.className =
          styles.contentsDom + " " + styles.contentsDom_Opened;
      }

      setState(true);
    }
  };

  const isExist = (element: any) => {
    if (element != null && element != undefined) {
      return true;
    } else {
      return false;
    }
  };

  const convertPrice = (price: number): string => {
    if (String(price).length <= 3) {
      return "￥" + String(price);
    }

    let copy = String(price);
    const count = Math.floor(price.toString().length / 3);
    let splitedPrice: string[] = [];

    for (let i = 0; i < count; i++) {
      splitedPrice.push(copy.substring(copy.length - 3));
      copy = copy.substring(0, copy.length - 3);
    }

    splitedPrice.push(copy);
    // push rest of values to array.

    const reversed = splitedPrice.reverse();

    let complite = "";
    reversed.map((value, index) => {
      complite += value + ",";
    });
    return "￥" + complite.substring(0, complite.length - 1);
  };

  const getMenuTitleStyleName = (title: MenuTitles): string => {
    let css = "initial";
    switch (title) {
      case MenuTitles.CUT:
        css = styles.cutBackground;
        break;

      case MenuTitles.COLOR:
        css = styles.colorBackground;
        break;

      case MenuTitles.PERM:
        css = styles.permBackground;
        break;

      case MenuTitles.TREATMENT:
        css = styles.treatmentBackground;
        break;

      case MenuTitles.SET:
        css = styles.setBackground;
        break;

      default:
        css = styles.othersBackground;
        break;
    }
    return css;
  };
  const getMenuTitleImage = (title: MenuTitles): string => {
    let url = "";
    switch (title) {
      case MenuTitles.CUT:
        url = images["menu"]["cut.png"]?.url;
        break;
      case MenuTitles.COLOR:
        url = images["menu"]["color.png"]?.url;
        break;
      case MenuTitles.PERM:
        url = images["menu"]["perm.png"]?.url;
        break;

      case MenuTitles.TREATMENT:
        url = images["menu"]["treatment.png"]?.url;
        break;
      case MenuTitles.SET:
        url = images["menu"]["Set.png"]?.url;
        break;
    }
    return url;
  };

  let option: JSX.Element = <td></td>;
  if (props.option != undefined) {
    option = props.option;
  }
  if (tableDom.current != undefined) {
    contentsContainerDom.current.style.height = String(
      tableDom.current.clientHeight + "px"
    );
  }

  let contents = (
    <table ref={tableDom} className={styles.table}>
      <thead></thead>
      <tbody>
        {props.datail.map((datails, index) => {
          if (
            props.datail[index].header == undefined ||
            !props.datail[index].header
          ) {
            const hyphen = datails.limit ? "~" : "";

            return (
              <tr key={index}>
                <td className={styles.keyName}>{datails.key + ":"}</td>
                <td className={styles.content}>
                  {convertPrice(datails.price) + hyphen}
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={index}>
                <td>
                  <div className={styles.miniTitle}>
                    {props.datail[index].key}{" "}
                  </div>
                </td>
              </tr>
            );
          }
        })}
        <tr className={styles.option}>{option}</tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  );

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.clickArea} onClick={click}>
          <h3
            className={getMenuTitleStyleName(props.titile)}
            style={{
              backgroundImage: "url(" + getMenuTitleImage(props.titile) + ")",
            }}
          ></h3>
          <div
            ref={plusIconDom}
            className={"fas fa-plus " + styles.plusIcon}
          ></div>
        </div>
        <div ref={contentsContainerDom} className={styles.contentsContainerDom}>
          <div ref={contentsDom} className={styles.contentsDom}>
            {contents}
          </div>
        </div>
      </div>
      <div className={styles.lines}>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

// export class Menu extends React.Component<
//   MenuPropsInterface,
//   MenuStateInterface
// > {
//   //DOM elements here
//   plusIconDom = React.createRef();
//   contentsContainerDom = React.createRef();
//   contentsDom = React.createRef();
//   tableDom = React.createRef();

//   constructor(props: MenuPropsInterface) {
//     super(props);
//     this.state = { isOpen: false };
//     this.click = this.click.bind(this);
//   }

//   click(event: React.MouseEventHandler<HTMLDivElement>): void {
//     if (this.state.isOpen) {
//       //展開された状態で閉じる処理はここ
//      setState(false);
//       if (
//         this.isExist(this.plusIconDom.current) &&
//         this.isExist(this.contentsContainerDom) &&
//         this.isExist(this.contentsDom)
//       ) {
//         //プラスボタンのアニメーション
//         anime({
//           targets: this.plusIconDom.current,

//           rotate: 0,
//         });

//         //
//         this.contentsContainerDom.current.className =
//           styles.contentsContainerDom;

//         this.contentsDom.current.className =
//           styles.contentsDom + "  " + styles.contentsDom_Closed;
//       }
//     } else {
//       //まだ展開されてない状態だとここのブロック
//       if (
//         this.isExist(this.plusIconDom.current) &&
//         this.isExist(this.contentsContainerDom) &&
//         this.isExist(this.contentsDom)
//       ) {
//         anime({
//           targets: this.plusIconDom.current,
//           rotate: 45,
//         });

//         this.contentsContainerDom.current.className =
//           styles.contentsContainerDom +
//           " " +
//           styles.contentsContainerDom_Opened;

//         this.contentsDom.current.className =
//           styles.contentsDom + " " + styles.contentsDom_Opened;
//       }

//       this.setState({ isOpen: true });
//     }
//   }

//   private isExist(element: any): boolean {
//     if (element != null && element != undefined) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   render() {
//     let option: JSX.Element = <td></td>;
//     if (this.props.option != undefined) {
//       option = this.props.option;
//     }
//     if (this.tableDom.current != undefined) {
//       this.contentsContainerDom.current.style.height = String(
//         this.tableDom.current.clientHeight + "px"
//       );
//     }

//     let contents = (
//       <table ref={this.tableDom} className={styles.table}>
//         <thead></thead>
//         <tbody>
//           {this.props.datail.map((datails, index) => {
//             if (
//               this.props.datail[index].header == undefined ||
//               !this.props.datail[index].header
//             ) {
//               const hyphen = datails.limit ? "~" : "";

//               return (
//                 <tr key={index}>
//                   <td className={styles.keyName}>{datails.key + ":"}</td>
//                   <td className={styles.content}>
//                     {this.convertPrice(datails.price) + hyphen}
//                   </td>
//                 </tr>
//               );
//             } else {
//               return (
//                 <tr key={index}>
//                   <td>
//                     <div className={styles.miniTitle}>
//                       {this.props.datail[index].key}{" "}
//                     </div>
//                   </td>
//                 </tr>
//               );
//             }
//           })}
//           <tr className={styles.option}>{option}</tr>
//         </tbody>
//         <tfoot></tfoot>
//       </table>
//     );

//     return (
//       <div>
//         <div className={styles.container}>
//           <div className={styles.clickArea} onClick={this.click}>
//             <h3 className={this.getMenuTitlestyleName(this.props.titile)}></h3>
//             <div
//               ref={this.plusIconDom}
//               className={"fas fa-plus " + styles.plusIcon}
//             ></div>
//           </div>
//           <div
//             ref={this.contentsContainerDom}
//             className={styles.contentsContainerDom}
//           >
//             <div ref={this.contentsDom} className={styles.contentsDom}>
//               {contents}
//             </div>
//           </div>
//         </div>
//         <div className={styles.lines}>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//     );
//   }

//   private convertPrice(price: number): string {
//     if (String(price).length <= 3) {
//       return "￥" + String(price);
//     }

//     let copy = String(price);
//     const count = Math.floor(price.toString().length / 3);
//     let splitedPrice: string[] = [];

//     for (let i = 0; i < count; i++) {
//       splitedPrice.push(copy.substring(copy.length - 3));
//       copy = copy.substring(0, copy.length - 3);
//     }

//     splitedPrice.push(copy);
//     // push rest of values to array.

//     const reversed = splitedPrice.reverse();

//     let complite = "";
//     reversed.map((value, index) => {
//       complite += value + ",";
//     });
//     return "￥" + complite.substring(0, complite.length - 1);
//   }

//   private getMenuTitlestyleName(title: MenuTitles): string {
//     let css = "initial";
//     switch (title) {
//       case MenuTitles.CUT:
//         css = styles.cutBackground;
//         break;

//       case MenuTitles.COLOR:
//         css = styles.colorBackground;
//         break;

//       case MenuTitles.PERM:
//         css = styles.permBackground;
//         break;

//       case MenuTitles.TREATMENT:
//         css = styles.treatmentBackground;
//         break;

//       case MenuTitles.SET:
//         css = styles.setBackground;
//         break;

//       default:
//         css = styles.othersBackground;
//         break;
//     }
//     return css;
//   }
//   private getMenuTitleImage(title: MenuTitles): string {
//     let url = "initial";
//     switch (title) {
//       case MenuTitles.CUT:
//         url =
//         break;

//       case MenuTitles.COLOR:
//         css = styles.colorBackground;
//         break;

//       case MenuTitles.PERM:
//         css = styles.permBackground;
//         break;

//       case MenuTitles.TREATMENT:
//         css = styles.treatmentBackground;
//         break;

//       case MenuTitles.SET:
//         css = styles.setBackground;
//         break;

//       default:
//         css = styles.othersBackground;
//         break;
//     }
//     return css;
//   }
// }
