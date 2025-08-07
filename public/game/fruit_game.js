const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 載入籃子圖片
const basketImg = new Image();
basketImg.src = "game/basket.png";

// 玩家籃子
const player = {
  x: 220,
  y: 340,
  width: 80,
  height: 60,
  speed: 7
};

// 仔入水果圖片
const fruitImages = [
  { name: "apple", img: new Image() },
  { name: "bananas", img: new Image() },
  { name: "blueberry", img: new Image() },
  { name: "cherries", img: new Image() },
  { name: "grapes", img: new Image() },
  { name: "lemon", img: new Image() },
  { name: "orange", img: new Image() },
  { name: "passion-fruit", img: new Image() },
  { name: "pineapple", img: new Image() },
  { name: "strawberry", img: new Image() },
  { name: "watermelon", img: new Image() }
];

fruitImages.forEach(f => f.img.src = `game/${f.name}.png`);


// 水果
//const fruit = {
  //x: Math.random() * 440,
  //y: 0,
  //size: 30,
  //speed: 2
//};

let score = 0;
let keys = {};
// 水果物件與隨機水果設定
let fruit = {
  x: Math.random() * 440,
  y: 0,
  size: 50,
  speed: 2,
  image: fruitImages[Math.floor(Math.random() * fruitImages.length)].img
};


document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function drawPlayer() {
  ctx.drawImage(basketImg, player.x, player.y, player.width, player.height);
}

function drawFruit() {
  ctx.drawImage(fruit.image, fruit.x, fruit.y, fruit.size, fruit.size);
}

// 重設水果&隨機選圖
function resetFruit() {
  fruit.x = Math.random() * 440;
  fruit.y = -fruit.size;
  fruit.image = fruitImages[Math.floor(Math.random() * fruitImages.length)].img;
}

function movePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}


// 顯示Game Over畫面
function showGameOver() {
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillText("你的分數：" + score, canvas.width / 2, canvas.height / 2 + 20);
}



// Game Over機制 (水果掉地上)
let isGameOver = false;

function updateFruit() {
  if (isGameOver) return;

  fruit.y += fruit.speed;

  // 判斷有沒有接到
  if (
    fruit.y + fruit.size >= player.y &&
    fruit.x + fruit.size >= player.x &&
    fruit.x <= player.x + player.width
  ) {
    score++;
    resetFruit();
  }

  // 掉到地板：Game Over
  if (fruit.y > canvas.height) {
    isGameOver = true;
    showGameOver();
  }
}



function drawScore() {
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "#333";
  ctx.fillText("得分：" + score, 10, 25);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawFruit();
  drawScore();
  movePlayer();
  updateFruit();
  if (!isGameOver) {
  requestAnimationFrame(gameLoop);
}
}

// 確認所有圖片都載完才顯示按鈕
let totalImagesToLoad = fruitImages.length + 1; // 水果圖 + 籃子圖
let imagesLoaded = 0;

function checkAllImagesLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImagesToLoad) {
    console.log("✅ 所有圖片載入完成，按鈕可以顯示囉！");

    // 隱藏載入中文字
    document.getElementById("loadingText").style.display = "none";

    // 顯示開始按鈕
    const startBtn = document.getElementById("startBtn");
    const canvas = document.getElementById("gameCanvas");

    startBtn.style.display = "inline-block";

    // 設定開始按鈕點擊事件
    startBtn.addEventListener("click", () => {
      startBtn.style.display = "none";
      canvas.style.display = "block";
      gameLoop(); // 啟動遊戲
    });
  }
}

// 籃子圖片載入完成
basketImg.onload = checkAllImagesLoaded;

// 每張水果圖片載入完成
fruitImages.forEach(f => {
  f.img.onload = checkAllImagesLoaded;
});