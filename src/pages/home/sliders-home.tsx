import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISliders_Home } from "../../interface";
import { firestore } from "../../services/firebase";

const Sliders_Home: React.FunctionComponent = () => {
  const [sliders, setSliders] = useState<ISliders_Home[]>([]);

  useEffect(() => {
    (async () => {
      const refSliders = collection(firestore, "sliders-home");

      await getDocs(refSliders).then((snapshot) => {
        let list = [] as ISliders_Home[];
        setSliders([]);
        snapshot.forEach((doc) => {
          list.push({
            route: doc.data().route,
            url: doc.data().url,
            color: doc.data().color,
          });
        });
        setSliders(list);
      });
    })();
  }, []);

  return (
    <CustomSwiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      color="orange"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {sliders?.map((img) => (
        <Container key={img.url} style={{ backgroundColor: `#${img.color}` }}>
          <Navigate>
            <Image src={img.url} />
          </Navigate>
        </Container>
      ))}
    </CustomSwiper>
  );
};

export default Sliders_Home;

const CustomSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: #0f081e;
  }

  .swiper-pagination-bullet {
    background-color: #0f081e;
    opacity: 0.4;
  }

  .swiper-pagination-bullet-active {
    background-color: #0f081e;
    opacity: 1;
  }
`;

const Container = styled(SwiperSlide)`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.585),
      transparent
    );
    filter: blur(1px);
    z-index: 0;
  }
`;

const Navigate = styled.a`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 9 / 3;
  object-fit: contain;
  max-width: 700px;

  position: relative;
  z-index: 1;
`;
