import * as React from "react";
import { FC } from "react";
import * as styles from "./css/photoView.module.css";
import * as childStyles from "./css/photoChild.module.css";
import { useStaticQuery, graphql } from "gatsby";

// interface Query {
//   allFile: {
//     edges: {
//       node: {
//         name: string;
//         publicURL: string;
//       };
//     }[];
//   };
// }

export function PhotoView(): React.ReactElement {
  // const data: Query = useStaticQuery(graphql`
  //   {
  //     allFile(filter: { sourceInstanceName: { eq: "photoview" } }) {
  //       edges {
  //         node {
  //           name
  //           publicURL
  //         }
  //       }
  //     }
  //   }
  // `);
  // let datas = data.allFile.edges;
  // console.log(datas);
  return <div className={styles.container}>{/* 表示停止 */}</div>;
}

interface childPropsInterface {
  images: { first: string; second: string; third: string; forth: string };
}

class Page extends React.Component<childPropsInterface, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={childStyles.container}>
        <div className={childStyles.container}>
          <div className={childStyles.row}>
            <div
              className={childStyles.image}
              style={{
                backgroundImage: "url(" + this.props.images.first + ")",
              }}
            />
            <div
              className={childStyles.image}
              style={{
                backgroundImage: "url(" + this.props.images.second + ")",
              }}
            />
          </div>
          <div className={childStyles.row}>
            <div
              className={childStyles.image}
              style={{
                backgroundImage: "url(" + this.props.images.third + ")",
              }}
            />
            <div
              className={childStyles.image}
              style={{
                backgroundImage: "url(" + this.props.images.forth + ")",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
