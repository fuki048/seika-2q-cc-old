const button = document.getElementById("runaway-btn");

const getRandomNumber = (max) => Math.random() * max;

const animateMove = (element) => {
  const buttonWidth = element.offsetWidth;
  const buttonHeight = element.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const targetX = getRandomNumber(windowWidth - buttonWidth);
  const targetY = getRandomNumber(windowHeight - buttonHeight);

  anime({
    targets: element,
    left: targetX,
    top: targetY,
    duration: 500, // スピードを早くするにはこの値を小さくしてください
    easing: "easeInOutQuad"
  });
};

button.addEventListener("click", function (event) {
  animateMove(this);
  // ボタンがクリックされたら別のページにリダイレクトする
  window.location.href = "app2.html";
  // ここにリダイレクト先のURLを記述
});

button.addEventListener("mouseover", function (event) {
  animateMove(this);
});
