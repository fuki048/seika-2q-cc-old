// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/css/bundle';




const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});





console.log(swiper.realindex);
let swiperTitle = document.getElementById('swiper-title');
let titleText = 'スライドを' + document.createTextNode + '表示しています。';
swiperTitle.appendChild(titleElement);

swiper.on('slidChange', function () {
  console.log('slide change');

  if (titleElement) {
    titleElement.remove();
  }
  const titleText = titleList[swiper.realIndex];
  titleElement = document.createTextNode(titleText);
  swiperTitle.appendChild(titleElement);
});


//////////////////////////////////////////////////////////////////////////////////////////////
//２つ目の  swiper


const swiper2 = new Swiper('.swiper-2', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const titleList = [
  '1つ目のタイトル',
  '2つ目のタイトル',
  '3つ目のタイトル',
  '4つ目のタイトル',
];

const swiperTitle2 = document.getElementById('swiper-title-2');
const titleText2 = titleList[swiper.realIndex];
let titleElement2 = document.createTextNode(titleText2);
swiperTitle2.appendChild(titleElement2);

swiper.on('slidChange', function () {
  console.log('slide change');

  if (titleElement2) {
    titleElement2.remove();
  }
  const titleText2 = 'スライドを' + swiper2.realIndex + '表示しています';
  titleElement2 = document.createTextNode(titleText2);
  swiperTitle2.appendChild(titleElement2);
});











console.log('test');


const validator = new JustValidate('#basic_form');
import JustValidate from 'just-validate';


validator
  .addField('#basic_name', [
    {
      rule: 'required',
      errorMessage: '必須入力項目です。'
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: '3文字以上入力してください。'
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: '15文字以上入力してください。'
    },
  ])
  .addField('#basic_email', [
    {
      rule: 'required',
      errorMessage: '必須入力項目です。'
    },
    {
      rule: 'required',
      errorMessage: '必須入力項目です。'
    },
    {
      rule: 'email',
    },
  ])
  .addField('#basic_password', [
    {
      rule: 'required',
      errorMessage: '必須入力項目です。'
    },
    {
      rule: 'password',
    },
  ])
  .addField('#basic_age', [
    {
      rule: 'required',
      errorMessage: '必須入力項目です。'
    },
    {
      rule: 'number',
    },
    {
      rule: 'minNumber',
      value: 18,
    },
    {
      rule: 'maxNumber',
      value: 150,
    },
  ])
  .addField('#basic_addres', [
    {
      rule: 'required',
      errorMessage: '必須入力項目です。'
    },
  ])
  .onSucces(event);

function onSuccess(event) {
  let formData = new FormData(event.target);
  console.log(formData.get("name"));
  console.log(formData.get("email"));
  console.log(formData.get("password"));
  console.log(formData.get("age"));
  console.log(formData.get("addres"));
}

