import { cLog } from '../../index.js';
import burgerIcon from '../yandex-map/img/burger.png';

// Map
ymaps.ready(init);

var placemarks = [
    {
      latitude: 59.94,
      longitude: 30.31,
      hintContent:
        '<div class="map__hint">Дворцовая пл., 2, Санкт-Петербург, 190000</div>',
      balloonContent: [
        '<div class="balloon-flex">',
        `<img class="balloon-flex__img" src="${burgerIcon}" alt="Бургер"/>`,
        '<div class="balloon-flex__text">',
        'Самые вкусные бургеры у нас!',
        '<br><strong>Адрес:</strong> Дворцовая пл., 2, Санкт-Петербург, 190000',
        '</div>',
        '</div>',
      ],
    },
    {
      latitude: 59.95,
      longitude: 30.31,
      hintContent:
        '<div class="map__hint">Дворцовая пл., 2, Санкт-Петербург, 190000</div>',
      balloonContent: [
        '<div class="balloon-flex">',
        `<img class="balloon-flex__img" src="${burgerIcon}" alt="Бургер"/>`,
        '<div class="balloon-flex__text">',
        'Самые вкусные бургеры у нас!',
        '<br><strong>Адрес:</strong> Дворцовая пл., 2, Санкт-Петербург, 190000',
        '</div>',
        '</div>',
      ],
    },
  ],
  geoObjects = []; //var placemarks end

function init() {
  var map = new ymaps.Map('map', {
    center: [59.94, 30.32],
    zoom: 13,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  }); // var map end

  for (var i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark(
      [placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join(''),
      },
      {
        iconLayout: 'default#image',
        iconImageHref: require('./img/yellow-pin.png'),
        iconImageSize: [50, 50], //размер изображения
        iconImageOffset: [0, -33], //смещение изображения относительно его размеров
      },
    );
  } //for end

  //Кластеризация
  var clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: require('./img/m4.png'), //изображение кластеризатора
        size: [60, 60],
        offset: [-50, -50],
      },
    ],
    clusterIconContentLayout: null, //отключает визуальное отображение количества точек при кластеризации
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);

  //на мобильных устройствах... (проверяем по userAgent браузера)
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    //... отключаем перетаскивание карты
    map.behaviors.disable('drag');
  }
} //init end
