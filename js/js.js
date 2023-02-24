
import onClassChange from "./utils/onClassChange.js";
import { Scene } from "./Scene.js";
import { Product } from "./Product.js";











gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
  smooth: 2,   // seconds it takes to "catch up" to native scroll position
  effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
});




















// ANIMATION BACKGROUND 
const line = document.querySelectorAll('.line')

window.onscroll = function () {
  onScroll()
}

function onScroll() {
    line.forEach(element => {
        element.style.transform = `translateX(${(window.scrollY - 30000) / 10}px)`;
        element.style.setProperty('--after', `${(window.scrollY - 30000) / 10}px`)
        element.style.setProperty('--before', `${(window.scrollY - 30000) / 10 * 2}px`)
    });
}

// MENU
const button = document.querySelector('.burger-svg');
const header = document.querySelector('.header');

button.addEventListener('click', (event) => {
    button.classList.toggle('open')
    header.classList.toggle('open')
});

let linkMenu = document.querySelectorAll('.header-nav-wrapper-item-link')


linkMenu.forEach(element => {
    element.addEventListener("mouseover", (event) => {
        let item = element.getAttribute('item')
        let list = document.querySelectorAll('.header-side-svg')
        let logo = document.querySelector('.header-side-logo')
        
        list.forEach(element => {
            let itembis = element.getAttribute('item')
            let grad = element.parentNode

            if (itembis === item) {
                //element.classList.toggle('active')
                grad.classList.add('active')
                logo.classList.add('active')
            } else {
                //element.classList.remove('active')
                grad.classList.remove('active')
            }
        });

        if (list = item) {

        }
    });

    element.addEventListener("mouseout", (event) => {
        let item = element.getAttribute('item')
        let list = document.querySelectorAll('.header-side-svg')
        let logo = document.querySelector('.header-side-logo')

        logo.classList.remove('active')

        list.forEach(element => {
            let itembis = element.getAttribute('item')
            let grad = element.parentNode            
            if (itembis === item) {
                element.classList.remove('active')
                grad.classList.remove('active')
            }
        });

        if (list = item) {

        }
    });

});

 var options = {
  "animate": true,
  "patternWidth": 342.73,
  "patternHeight": 297.94,
  "grainOpacity": 0.86,
  "grainDensity": 1,
  "grainWidth": 5.47,
  "grainHeight": 3
  }
  grained('#layeur' , options);


  let socialPath = document.querySelectorAll('.navigation-item path')
  let verticalMenuLink = document.querySelectorAll('.verticalmenu-item-link')
  

  onClassChange(header, (node) => {
    node.classList.contains('open')
      ? addClass()
      : removeClass();
  });

  gsap.set(socialPath, {
    y: "120%",
    stagger: 0.1,
    duration: 0.25,
  });

  gsap.set(verticalMenuLink, {
    y: '-100%',
    stagger: 0.1,
    duration: 0.25,
  });
  
  function addClass() {
    gsap.to(socialPath, {
        y: 0,
        stagger:-.1,
        duration: 0.25,
    });

    gsap.to(verticalMenuLink, {
        y: 0,
        stagger: 0.1,
        duration: 0.25,
    });
  }
  
  function removeClass() {
    gsap.to(socialPath, {
        y: "120%",
        stagger:-.1,
        duration: 0.25,
    });

    gsap.to(verticalMenuLink, {
        y: '-100%',
        stagger: 0.1,
        duration: 0.25,
    });
  }

new Scene('myThreeJsCanvas', '../assets/BAT/dragon.png');

new Product('product1', '../assets/BAT/dragon.png', 'boutique-item-canvas');
new Product('product2', '../assets/BAT/black.png', 'boutique-item-canvas');
new Product('product3', '../assets/BAT/wild.png', 'boutique-item-canvas');





gsap.config({
  force3D: false
});

// CREATION DE LA TIMELINE
let tl = gsap.timeline({
  scrollTrigger: {
    start: 0,
    end: "bottom-=1px",
    scrub: 4,
    //markers: true   
  },
});



// tl.fromTo(".containerCan", {

//   x: 0,
//   opacity: 1,
// }, {
//   x: 1000,
//   opacity: 0,
//   ease: "expoScale(0.01, 1)",
// }, "<")





// tl.fromTo(".containerText", {

//   y: 0,
//   opacity: 1,
// }, {
//   y: -300,
//   opacity: 0,
//   ease: "expoScale(0.01, 1)",
// }, "<")


// tl.fromTo(".containerCan", {

//   y: 0,
//   opacity: 1,
// }, {
//   y: -300,
//   opacity: 0,
//   ease: "expoScale(0.01, 1)",
// }, "<")




// tl.fromTo(".containerCan", {

//   y: 0,
//   opacity: 1,
// }, {
//   y: -300,
//   opacity: 0,
//   ease: "expoScale(0.01, 1)",
// }, "<")





jQuery(document).ready(function(){
  jQuery('.slider').slick({
      draggable:true,
      slidesToShow:7,
      infinite:true,
      slidesToScrol1: 1,
      autoplay: true,
      autoplaySpeed: 90, 
      arrows:false,
      speed:2500,
      bordFriction: 1,
    easing:'linear',
      variableWidth:true,
      pauseOnHover:true,
    slide: '.slider .group',
    swipeToSlide:true,
  });
jQuery('.slider' ).hover(function(){
  //jQuery('.slider').slick("slickSetOption", "slidesToScroll", 0, false);
  
},function(){
  //jQuery('.slider').slick("slickSetOption", "slidesToScroll", 1, false);                
});
jQuery('.slider .item').hover(function(){
  var $neededSpace = (170 + 95);
        jQuery(this).removeClass('display-left');

  
  var $myPosX = ((jQuery('.slider').offset().left) + (jQuery('.slider').outerWidth(true))) - jQuery(this).offset().left;
  
  if ($myPosX < $neededSpace) {
          jQuery(this).addClass('display-left');    
    
  }
});
jQuery('.prev').click(function(){
        alert("!");
        jQuery('.slider').slick('slickPrev');
  
});
jQuery('.next').hover(function(){
        jQuery('.slider').slick('slidesToScroll', 1, true ,false);

  
});
});