import * as React from "react";
import * as styles from "./css/photoView.module.css";
import * as childStyles from "./css/photoChild.module.css";
import { ImagesContext } from "../pages/index";

export function PhotoView(): React.ReactElement {
  const images = React.useContext(ImagesContext);
  const pages: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    pages.push(
      <Page
        images={{
          first: images["about"]["bottoles.jpg"]?.url,
          second: images["about"]["chandelier.jpg"]?.url,
          third: images["about"]["grass.jpg"]?.url,
          forth: images["about"]["leaf.jpg"]?.url,
        }}
      />
    );
  }

  return (
    <>
      {images["about"] && (
        <>
          <div className={styles.container}>
            <div className={styles.subContainer}>{pages}</div>
          </div>
        </>
      )}
    </>
  );
}

interface childPropsInterface {
  images: { first: string; second: string; third: string; forth: string };
}

const Page = (props: childPropsInterface) => {
  return (
    <div className={childStyles.container}>
      <div className={childStyles.container}>
        <div className={childStyles.row}>
          <div
            className={childStyles.image}
            style={{
              backgroundImage: "url(" + props.images.first + ")",
            }}
          />
          <div
            className={childStyles.image}
            style={{
              backgroundImage: "url(" + props.images.second + ")",
            }}
          />
        </div>
        <div className={childStyles.row}>
          <div
            className={childStyles.image}
            style={{
              backgroundImage: "url(" + props.images.third + ")",
            }}
          />
          <div
            className={childStyles.image}
            style={{
              backgroundImage: "url(" + props.images.forth + ")",
            }}
          />
        </div>
      </div>
    </div>
  );
};
