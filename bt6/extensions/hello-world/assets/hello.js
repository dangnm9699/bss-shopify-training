
(function () {
    let maxTries = 10, tries = 0;
    let interval = setInterval(() => {
        let button = document.getElementById('bt6__hello'),
            span = document.getElementsByClassName("close")[0],
            modal = document.getElementById("myModal");

        tries++;
        if ((button && span && modal) || tries >= maxTries) {
            clearInterval(interval);
            if (button) {
                button.onclick = function () {
                    modal.style.display = "block";
                }
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
        }
    }, 200);
})();
