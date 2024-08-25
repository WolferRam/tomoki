const totalParticipants = 1000;  // 総参加者数
const winners = 2;  // 当選者数
let drawnCount = 0;  // くじを引いた回数
let hasWon = false;  // 当選フラグ

const omikujiElement = document.getElementById("omikuji");
const resultElement = document.getElementById("result");
const drawButton = document.getElementById("drawButton");

drawButton.addEventListener("click", () => {
    if (drawnCount >= totalParticipants || hasWon) {
        drawButton.disabled = true;
        return;
    }

    drawnCount++;
    omikujiElement.classList.add("shake");

    // 1秒後に結果を表示
    setTimeout(() => {
        omikujiElement.classList.remove("shake");

        const drawChance = (winners - (hasWon ? 1 : 0)) / (totalParticipants - drawnCount + 1);
        if (Math.random() < drawChance && !hasWon) {
            resultElement.innerText = "結果: 大吉！おめでとうございます！";
            resultElement.classList.remove("hidden");
            hasWon = true;
        } else {
            const results = ["中吉", "小吉", "吉", "末吉", "凶"];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            resultElement.innerText = `結果: ${randomResult}。残念、もう一度お試しください。`;
            resultElement.classList.remove("hidden");
        }

        if (drawnCount >= totalParticipants || hasWon) {
            drawButton.disabled = true;
            drawButton.innerText = "終了";
        }
    }, 1000);
});

omikujiElement.addEventListener("click", () => {
    drawButton.click();
});