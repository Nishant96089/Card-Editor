$(function () {
    let cardImg = {
        1: "card-images/1.jpg",
        2: "card-images/2.jpg",
        3: "card-images/3.jpg",
        4: "card-images/4.jpg",
        5: "card-images/5.jpg"
    };

    const colorPicker = document.getElementById("colorPicker");
    let isDragging = false;
    let textAreaClone;  // Declare textAreaClone globally

    async function renderImage(images) {
        try {
            for (let i in images) {
                $("#sec-1").append(`<img class='images' src='${images[i]}' />`);
            }
        } catch (error) {
            console.error("Image not rendering.", error);
        }
    }

    function clickImage() {
        $("#sec-1").on("click", ".images", function () {
            const imgClone = $(this).clone();
            textAreaClone = $("#textArea").clone().removeAttr("id");

            $("#edit").empty().append(imgClone).append(textAreaClone);

            imgClone.css({
                height: "98%",
                width: "100%"
            });

            textAreaClone.css({
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "2",  // Adjust zIndex as needed
                background: "none",
                border: "none",
                display: "inline",
                padding: "0",
                color: colorPicker.value
            });

        });

        colorPicker.addEventListener("input", function (event) {
            textAreaClone.css("color", event.target.value);
        });

        $(document).mousedown(function (e) {
            if (isDragging) {
                startX = e.pageX - textAreaClone.offset().left;
                startY = e.pageY - textAreaClone.offset().top;
            }
        });

        $(document).mousemove(function (e) {
            if (isDragging) {
                const newX = e.pageX - startX;
                const newY = e.pageY - startY;

                textAreaClone.css({
                    left: newX,
                    top: newY
                });
            }
        });

        $(document).mouseup(function () {
            isDragging = false;
        });
    }

    colorPicker.addEventListener("input", function (event) {
        var selectedColor = event.target.value;
        console.log("Selected Color: " + selectedColor);
    });

    document.getElementById("fontSelector").addEventListener("change", function (event) {
        var selectedFont = event.target.value;
        document.getElementById("textArea").style.fontFamily = selectedFont;
    });

    document.getElementById("fontSize").addEventListener("input", function (event) {
        var fontSize = event.target.value + "px";
        document.getElementById("textArea").style.fontSize = fontSize;
    });

    renderImage(cardImg);
    clickImage();
});
