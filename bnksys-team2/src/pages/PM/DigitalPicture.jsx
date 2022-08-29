import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';

import * as Api from '../../api';
import './DigitalPicture.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DigitalPicture = () => {
  const imgUrl =
    'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';

  const [pmNums, setPmNums] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  // 전체화면
  const fullscreen = (element) => {
    if (element.requestFullscreen) return element.requestFullscreen();
    if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen();
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen();
    if (element.msRequestFullscreen) return element.msRequestFullscreen();
  };

  const getDistributePM = () => {
    const clientNo = sessionStorage.getItem('clientNo');
    Api.get(`api/pm/now/${clientNo}`)
      .then((res) => {
        console.log(res);
        let pmArr = res.data.list;
        setPmNums(pmArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const container = document.querySelector('.imgWrap');
    const enterFullscreenBtn = document.querySelector('.enterFullscreenBtn');

    enterFullscreenBtn.addEventListener('click', (e) => {
      fullscreen(container);
    });
    getDistributePM();
    let timer = setInterval(() => {
      getDistributePM();
    }, 60*1000);
    
    return () => clearInterval(timer)
    
  }, []);

  // img preloading
  const [IMAGES, setIMAGES] = useState([]);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  useEffect(() => {
    if (pmNums) {
      let baseUrl = `${Api.getServerUrl()}api/pm/load/`;
      for (let i = 0; i < pmNums.length; i++) {
        let url = baseUrl + pmNums[i].pmNo;
        console.log(url);
        setIMAGES((img) => [...img, url]);
      }
    }
  }, [pmNums]);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.url;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.url);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(IMAGES.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log('Failed to load images', err));
  }, []);

  return (
    <div className="container digitalPicture">
      <h1>현재 배포 중인 저작물</h1>
      <button className="enterFullscreenBtn">전체화면</button>

      <div className="d-flex justify-content-center mb-3">
        <div className="imgWrap">
          <Slider {...settings}>
            {imgsLoaded ?( IMAGES.length != 0?(
              IMAGES.map((image, index) => <img key={index} src={image} alt="Human" />)
            ): (<img  src={`${Api.getServerUrl()}PromotionMaterial/empty.svg`} alt="Human" />)): (
              <h1>Loading images...</h1>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DigitalPicture;
