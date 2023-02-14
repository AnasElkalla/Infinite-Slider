const left = document.querySelector("span.left");
const right = document.querySelector("span.right");
const divs = document.getElementsByClassName("box");
const imagesBox = document.querySelector(".imagesBox");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
let active = document.querySelector("div.active");
const divRect = divs[0].getBoundingClientRect();
let oneRect, twoRect, threeRect;
const l = "left";
const r = "right";
let images = 20;
const getRect = () => {
  oneRect = one.getBoundingClientRect();
  twoRect = two.getBoundingClientRect();
  threeRect = three.getBoundingClientRect();
};
const next = (div, direction) => {
  if (r === direction) {
    if (div === one) {
      return two;
    } else if (div === two) {
      return three;
    } else if (div === three) {
      return one;
    }
  } else if (l === direction) {
    if (div === one) {
      return three;
    } else if (div === two) {
      return one;
    } else if (div === three) {
      return two;
    }
  }
};
const changeSrc = (div, direction) => {
  let i = div.querySelector("img").getAttribute("src").match(/\d+/)[0];
  const nextDiv = next(div, direction);
  // console.log(i);
  if (l === direction) {
    i === "1" ? (i = images + 1) : i;
    nextDiv.querySelector("img").src = `images/${--i}.jpg`;
    // console.log(nextDiv.querySelector("img").src, i);
  } else if (r === direction) {
    +i === images ? (i = 0) : i;
    nextDiv.querySelector("img").src = `images/${++i}.jpg`;
    // console.log(nextDiv.querySelector("img").src);
  }
  // div.querySelector("img").src = `images/${i}.jpg`;
};
Array.from(divs).forEach((div, i) => {
  div.querySelector("img").src = `images/${i + 1}.jpg`;
});

const oneR = () => {
  changeSrc(one, "right");
  setTimeout(() => {
    active.style.transform =
      three.style.transform =
      two.style.transform =
        "translateX(0)";
    // {one:[-100,0],two:[0,0],three:[100,0]}
    active.classList.remove("active");
    two.classList.add("active");
    activeDiv = 2;
    active = document.querySelector(".active");
  }, 200);
};
const twoR = () => {
  changeSrc(two, "right");
  setTimeout(() => {
    active.style.transform = three.style.transform = "translateX(-100vw)";
    one.style.transform = "translateX(200vw)";
    // {one:[-100,200],two:[0,-100],three:[100,-100]}
    active.classList.remove("active");
    three.classList.add("active");
    activeDiv = 3;
    active = document.querySelector(".active");
  }, 200);
};
const threeR = () => {
  changeSrc(three, "right");
  setTimeout(() => {
    active.style.transform = "translateX(-200vw)";
    two.style.transform = "translateX(-100vw)";
    one.style.transform = "translateX(100vw)";
    // {one:[-100,100],two:[0,-100],three:[100,-200]}
    active.classList.remove("active");
    one.classList.add("active");
    activeDiv = 1;
    active = document.querySelector(".active");
    two.style.transform = "translateX(100vw)";
  }, 200);
};

let activeDiv = 2;
let time;
const slider = () => {
  // console.log(Date.now() - time);

  // time = Date.now();
  if (activeDiv === 1) {
    oneR();
  } else if (activeDiv === 2) {
    twoR();
  } else if (activeDiv === 3) {
    threeR();
  }
};
let auto = setInterval(slider, 6000);

right.addEventListener("click", function (e) {
  clearInterval(auto);

  document.body.style.setProperty("--origin", "right");
  getRect();
  if (active.classList.contains("two") && twoRect.left === 0) {
    twoR();
  } else if (active.classList.contains("three") && threeRect.left === 0) {
    threeR();
  } else if (active.classList.contains("one") && oneRect.left === 0) {
    oneR();
  }
  return (auto = setInterval(slider, 6000));
});
left.addEventListener("click", function (e) {
  clearInterval(auto);

  document.body.style.setProperty("--origin", "left");
  getRect();
  if (active.classList.contains("two") && twoRect.left === 0) {
    changeSrc(two, "left");

    setTimeout(() => {
      two.style.zIndex = three.style.zIndex = "9 !important";
      two.style.transform = one.style.transform = "translateX(100vw)";
      three.style.transform = "translateX(-200vw)";
      // {one:[-100,100],two:[0,100],three:[100,-200]}
      active.classList.remove("active");
      one.classList.add("active");
      activeDiv = 1;
      active = document.querySelector(".active");
    }, 50);
  } else if (active.classList.contains("three") && threeRect.left === 0) {
    changeSrc(three, "left");

    setTimeout(() => {
      two.style.zIndex = three.style.zIndex = "9 !important";
      three.style.transform =
        two.style.transform =
        one.style.transform =
          "translateX(0)";
      // {one:[-100,0],two:[0,-0],three:[100,0]}
      active.classList.remove("active");
      two.classList.add("active");
      activeDiv = 2;
      active = document.querySelector(".active");
    }, 50);
  } else if (active.classList.contains("one") && oneRect.left === 0) {
    changeSrc(one, "left");

    setTimeout(() => {
      one.style.zIndex = three.style.zIndex = "9 !important";
      one.style.transform = "translateX(200vw)";
      two.style.transform = "translateX(-100vw)";
      three.style.transform = "translateX(-100vw)";
      // {one:[-100,200],two:[0,-100],three:[100,-100]}
      active.classList.remove("active");
      three.classList.add("active");
      activeDiv = 3;
      active = document.querySelector(".active");
    }, 50);
  }
  return (auto = setInterval(slider, 6000));
});
