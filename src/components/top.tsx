import * as React from "react";
import * as topStyles from "../components/css/top.module.css";
import logo from "../img/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageManager } from "../ImageManager";
import { Images } from "../Image";
import { ImagesContext, ImagesWithSections } from "../pages/index";

interface TopState {
  images: ImagesWithSections;
}

export const Top = () => {
  const [images, setImages] = React.useState<ImagesWithSections>(null);
  const contextValue = React.useContext(ImagesContext);
  const isImageExist = () => {
    //何か画像がロードされていたら画像がロードされているとみなす。
    if (images && images["top"]["anniversary.jpg"]) {
      return true;
    } else {
      return false;
    }
  };
  const changeBackground = () => {
    if (!isImageExist()) {
      return;
    }
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      defaults: {
        delay: 1,
        duration: 1,
      },
    });

    timeline
      .set("#second, #third, #fourth, #fifth, #copiedFirst", {
        opacity: 0,
      })
      .to("#second", {
        opacity: 1,
      })
      .to("#third", {
        opacity: 1,
      })
      .to("#fourth", {
        opacity: 1,
      })
      .to("#fifth", {
        opacity: 1,
      })
      .to("#copiedFirst", {
        opacity: 1,
      });
  };
  React.useEffect(() => {
    setImages(contextValue);
    changeBackground();
  });

  return (
    <section className={`${topStyles.container} `}>
      {isImageExist() && (
        <>
          <div
            style={{
              backgroundImage:
                "url(" + images["top"]["anniversary.jpg"].url + ")",
            }}
            id="first"
            className={topStyles.back}
          />
          <div
            style={{
              backgroundImage: "url(" + images["top"]["store1.jpg"].url + ")",
            }}
            id="second"
            className={topStyles.back}
          />

          <div
            style={{
              backgroundImage: "url(" + images["top"]["light.jpg"].url + ")",
            }}
            id="third"
            className={topStyles.back}
          />

          <div
            style={{
              backgroundImage: "url(" + images["top"]["grass.jpg"].url + ")",
            }}
            id="fourth"
            className={topStyles.back}
          />

          <div
            style={{
              backgroundImage: "url(" + images["top"]["bike.jpg"]?.url + ")",
            }}
            id="fifth"
            className={topStyles.back}
          />
          <div
            style={{
              backgroundImage:
                "url(" + images["top"]["anniversary.jpg"].url + ")",
            }}
            id="copiedFirst"
            className={topStyles.back}
          />
        </>
      )}
      <div className={`${topStyles.mask}`}></div>
      {isImageExist() && (
        <img
          src={`${images["all"]["images/logo.png"].url}`}
          alt=""
          className={`${topStyles.logo}`}
        />
      )}
    </section>
  );
};
