
import onClassChange from "./utils/onClassChange.js";
// import { Scene } from "./Scene.js";
// import { Product } from "./Product.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// let smoother = ScrollSmoother.create({
//   smooth: 2,   // seconds it takes to "catch up" to native scroll position
//   effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
// });


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

// new Scene('myThreeJsCanvas', '../assets/BAT/dragon.png');

// new Product('product1', '../assets/BAT/dragon.png', 'boutique-item-canvas');
// new Product('product2', '../assets/BAT/black.png', 'boutique-item-canvas');
// new Product('product3', '../assets/BAT/wild.png', 'boutique-item-canvas');
// new Product('product4', '../assets/BAT/fresh.png', 'boutique-item-canvas');
// new Product('product5', '../assets/BAT/fresh.png', 'boutique-item-canvas');
// new Product('product6', '../assets/BAT/fresh.png', 'boutique-item-canvas');





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

tl.fromTo(".title", {

  x: 0,
}, {
  x: 1000,
  ease: "expoScale(0.01, 1)",
}, "<")

