document.addEventListener("DOMContentLoaded", function () {
    let spaceship = document.querySelector(".spaceship");
    let isLeftPosition = true;
    document.addEventListener("click", function () {
        if (isLeftPosition) {
            spaceship.style.left = "auto";
            spaceship.style.right = "0";
        } else {
            spaceship.style.left = "0";
            spaceship.style.right = "auto";
        }
        isLeftPosition = !isLeftPosition;
    });

    let meteor = document.querySelector(".meteor");
    let isGameOver = false;

    // Hàm để tạo số ngẫu nhiên trong khoảng từ min đến max
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm để kiểm tra va chạm giữa meteor và spaceship
    function checkCollision() {
        if (!isGameOver) {
            let spaceshipRect = spaceship.getBoundingClientRect();
            let meteorRect = meteor.getBoundingClientRect();

            if (
                spaceshipRect.left < meteorRect.right &&
                spaceshipRect.right > meteorRect.left &&
                spaceshipRect.top < meteorRect.bottom &&
                spaceshipRect.bottom > meteorRect.top
            ) {
                isGameOver = true;
                alert("Game over! Spaceship collided with meteor.");
                isGameOver = false;
            }
        }
    }

    // Hàm để di chuyển meteor từ trên xuống
    function moveMeteor() {
        let screenHeight = window.innerHeight;
        let meteorTop = -150; // Điểm bắt đầu ban đầu của meteor

        // Thiết lập vị trí ban đầu bên trái hoặc bên phải
        if (getRandom(0, 1) === 0) {
            meteor.style.left = "0";
        } else {
            meteor.style.right = "0";
        }

        // Điều khiển di chuyển của meteor
        function animateMeteor() {
            if (!isGameOver) {
                meteorTop += 30; // Tốc độ di chuyển của meteor

                // Cập nhật vị trí top của meteor
                meteor.style.top = meteorTop + "px";

                // Kiểm tra nếu meteor ra khỏi màn hình, thì reset và di chuyển lại từ trên xuống
                if (meteorTop > screenHeight) {
                    meteorTop = -150; // Reset vị trí ban đầu
                    meteor.style.top = meteorTop + "px";

                    // Thiết lập vị trí ban đầu bên trái hoặc bên phải
                    if (getRandom(0, 1) === 0) {
                        meteor.style.left = "0";
                        meteor.style.right = "auto";
                    } else {
                        meteor.style.left = "auto";
                        meteor.style.right = "0";
                    }
                }

                // Kiểm tra va chạm
                checkCollision();

                // Lặp lại vòng lặp
                requestAnimationFrame(animateMeteor);
            }
        }

        // Bắt đầu di chuyển meteor
        animateMeteor();
    }

    // Bắt đầu di chuyển meteor khi trang tải hoàn thành
    moveMeteor();
});