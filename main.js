let containers = document.querySelectorAll("form .input-container")
let box = document.querySelector("body .box");
let tl = gsap.timeline({defaults: {duration: 1}});


//Line
const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
  let placeholder = container.querySelector(".placeholder");
  let input = container.querySelector("input");
  let line = container.querySelector(".elastic-line");

  input.addEventListener("focus", ()=>{
    if (!input.value) {
      gsap.fromTo(
        line, 
        {attr: {d: start}},
        {attr: {d: end}, ease: "Power2.easeOut", duration: 0.5}
      );
    }
    gsap.to(line, {attr: {d: start}, ease: "elastic.out(3, 0,1)", delay: 0.2, duration:1});
    gsap.to(placeholder, {scale: 0.7, top: 4, left: 0, delay: 0.3, duration: 0.2, ease: "Power1.easeOut"});
  })
})

//revert the placeholder 
containers.forEach((container) => {
  let placeholder = container.querySelector(".placeholder");
  let input = container.querySelector("input");
  let line = container.querySelector(".elastic-line");

  box.addEventListener("click", (e)=>{
    if(e.target !== input) {
      if (!input.value) {
        gsap.to(placeholder, {scale: 1, top: 15, duration: 0.2, ease: "Power2.easeOut"});
      }
    }
  })
  
  //validation for the inputs
  input.addEventListener("input", (e) => {
    if(e.target.type === "text") {
      let inputText = e.target.value
      if (inputText.length > 3) {
        colorize('#6190e8', line, placeholder);
      }
      else {
        colorize("#FE8C99", line, placeholder);
      }
    }
    if (e.target.type === "email") {
      let valid = validateEmail(e.target.value);
      if (valid) {
        colorize("#6190e8", line, placeholder);
      }
      else {
        colorize("#FE8C99", line, placeholder);
      }
    }
    if (e.target.type === "tel") {
      let valid = validatePhone(e.target.value);
      if (valid) {
        colorize("#6190e8", line, placeholder);
      }
      else {
        colorize("#FE8C99", line, placeholder);
      }
    }
  })
})


//validate functions by using regular expression
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

//colorize function (blue if it correct or red if it wrong)
function colorize(color, line, placeholder) {
  gsap.to(line, {stroke: color, duration: 0.75});
  gsap.to(placeholder, {color: color, duration: 0.75});
}


let checkbox = document.querySelector(".checkbox-container input");
let tl2 = gsap.timeline({defaults: {duration: 0.3}});

let tickmarkPath = document.querySelector(".checkbox-container svg path");
let tickmarkPathLength = tickmarkPath.getTotalLength();

gsap.set(tickmarkPath, {
  strokeDashoffset: tickmarkPathLength,
  strokeDasharray: tickmarkPathLength
});

checkbox.addEventListener("click", ()=>{
  if (checkbox.checked) {
    tl2.to('.checkbox-container .checkbox-fill', {top: "0%"});
    tl2.fromTo(tickmarkPath, {strokeDashoffset: tickmarkPathLength}, {strokeDashoffset: 0}, '<50%');
    tl2.to('.promo-container .checkbox-label', {color: '#6190e8', duration: 0.5});
  }
  else {
    tl2.to('.checkbox-container .checkbox-fill', {top: '100%'});
    tl2.to('.promo-container .checkbox-label', {color: '#c5c5c5', duration: 0.5});
  }
})
gsap.set('svg #eye', {transformOrigin: 'center'});

gsap.to('svg #eye', {scale: 0.3, repeat: -1, yoyo: true, repeatDelay: 0.5, duration: 0.2});
gsap.to('svg #eyebrow', {y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, duration: 0.2});




let button = document.querySelector("form .button");
let tl3 = gsap.timeline({defaults: {duration: 0.75, ease: 'Power2.easeOut'}});

gsap.set('.box > svg #hand', {transformOrigin: "left"})
button.addEventListener("click", (e)=>{
  e.preventDefault();
  tl3.to(".content, form", {y: 30, opacity: 0, pointerEvents: "none"});
  tl3.to('.box', {scale: 0.8}, "<");
  tl3.fromTo('.box .submitted', {y: 30}, {y: 0, opacity: 1})
  tl3.to('.box > svg #hand', {rotation: -10, y: 3, duration: 2, ease: 'elastic(3,0.2)'}, "<50%")
})