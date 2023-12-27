document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");
  const boxSize = 20;

  let snake = [{ x: 20, y: 20 }];
  let direction = "right";
  let food = generateFoodPosition();

  function generateFoodPosition() {
    return {
      x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
      y: Math.floor(Math.random() * (canvas.height / 20)) * 20,
    };
  }

  function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, 20, 20));
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
  }

  function update() {
    // Update snake position based on direction
    const head = { ...snake[0] };
    switch (direction) {
      case "up":
        head.y -= 20;
        break;
      case "down":
        head.y += 20;
        break;
      case "left":
        head.x -= 20;
        break;
      case "right":
        head.x += 20;
        break;
    }

    // Check for collisions with walls or self
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvas.width ||
      head.y >= canvas.height ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      alert("Game Over!");
      resetGame();
      return;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
      // Increase snake length and generate new food
      snake.unshift({ ...head });
      food = generateFoodPosition();
    } else {
      // Move the snake
      snake.pop();
      snake.unshift({ ...head });
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake and food
    drawSnake();
    drawFood();

    // Repeat the update function
    setTimeout(() => {
      requestAnimationFrame(update);
    }, 175);
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  update();
});
