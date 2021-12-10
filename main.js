let main_1 = document.querySelector(".main_1");
let main_2 = document.querySelector(".main_2");
let main_3 = document.querySelector(".main_3");
let btn = document.querySelector(".main-btn");
let boxS = document.querySelectorAll(".box");
let timerEl = document.querySelector(".timer");
let scoreEl = document.querySelector(".score");
let timeMsg = document.querySelector(".time-msg");
let winMsg = document.querySelector(".win-msg");
let blackBg = document.querySelector(".black-bg");
let kekW = document.querySelector(".kekw");
let sadKek = document.querySelector(".sad-kek");
let fasterMsg = document.querySelector(".faster-msg");
let tryAgainBtn = document.querySelector(".try");
let musicBtn = document.querySelector(".music-btn");
let menuAudio = new Audio("./audio/mario remix.mp3");
let clickAudio = new Audio("./audio/click.mp3");
let globalClickAudio = new Audio("./audio/mario jump.mp3");
let winAudio = new Audio("./audio/mario win.mp3");
let loseAudio = new Audio("./audio/mario lose.mp3");

let score = 0;
let seconds = 60;
let minutes = 2;

btn.addEventListener("click", () => {
  main_1.style.cssText = "display:none;";
  main_2.style.cssText = "display:flex;";
  menuAudio.play();
  menuAudio.volume = 0.02;
  menuAudio.loop = true;
});

boxS.forEach((box) => {
  function createTarget() {
    let target = document.createElement("span");
    main_3.appendChild(target);
    target.innerHTML = `<img src="${box.children[1].getAttribute(
      "src"
    )}" alt="">`;
    target.style.cssText = `transform: rotate(${Math.ceil(
      Math.random(10) * 360
    )}deg); top:${Math.floor(Math.random() * 800)}px; left:${Math.floor(
      Math.random() * 1800
    )}px;`;

    let stop = setInterval(function () {
      target.remove();
    }, 1500);

    target.addEventListener("click", (e) => {
      e.currentTarget.remove();
      addTarget();
      counter();
      clickAudio.play();
      clickAudio.volume = 0.15;
    });
  }

  function addTarget() {
    setTimeout(createTarget, 1000);
    setTimeout(createTarget, 500);
  }

  function counter() {
    score++;
    scoreEl.innerHTML =
      score < 10 ? `Current Score: 0${score}` : `Current Score:${score}`;
  }

  function timer() {
    function decreaseTime() {
      seconds -= 1;
      if (minutes === 0 && seconds === 0) {
        clearInterval(countdown);
      } else if (seconds === 0) {
        seconds = 59;
        minutes -= 1;
      }
      timerEl.innerHTML =
        seconds < 10
          ? `Time : 0${minutes}:0${seconds}`
          : `Time : 0${minutes}:${seconds}`;

      if (minutes === 0 && seconds === 0) {
        timeMsg.style.cssText = `display:block;`;
        blackBg.style.cssText = `display:block;`;
        menuAudio.pause();
        loseAudio.play();
        loseAudio.volume = 0.1;
        sadKek.addEventListener("click", () => {
          location.reload();
        });
      } else if (score >= 300) {
        winMsg.style.cssText = `display:block;`;
        blackBg.style.cssText = `display:block;`;
        winAudio.play();
        winAudio.volume = 0.1;
        menuAudio.pause();
        clearInterval(countdown);
        kekW.addEventListener("click", () => {
          location.reload();
        });
      }
    }

    let countdown = setInterval(decreaseTime, 1000);
  }

  let checkEmpty = function () {
    if (main_3.children[1] === undefined) {
      blackBg.style.cssText = `display:block;`;
      fasterMsg.style.cssText = `display:block;`;
      menuAudio.pause();
    }
    tryAgainBtn.addEventListener("click", () => {
      location.reload();
    });
  };

  box.addEventListener("click", () => {
    timer();
    main_2.style.cssText = "display:none;";
    main_3.style.cssText = "display:block;";
    globalClickAudio.play();
    globalClickAudio.volume = 0.01;
    createTarget();
    setInterval(checkEmpty, 2000);
  });
});
