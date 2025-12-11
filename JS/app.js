const menCheck = document.getElementById("men");
    const womenCheck = document.getElementById("women");
    const body = document.getElementsByTagName("body");

    menCheck.addEventListener("change", function () {
        if (menCheck.checked) {
            womenCheck.checked = false;
        }
    });

    womenCheck.addEventListener("change", function () {
        if (womenCheck.checked) {
            menCheck.checked = false;
        }
    });