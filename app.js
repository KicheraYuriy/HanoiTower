// Маленькі коробочки для відстеження подій та положення блоків на поточному ході
var pos = [], events = [];

// Ідентифікатор кожного блоку, це лише для того, щоб допомогти мені створити їх за допомогою CSS
var blocksIds = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten"
};

var from = document.getElementById("from");
var end = document.getElementById("to");
var temp = document.getElementById("spare");
var button = document.getElementById("button");
var tower = document.getElementById("height");

//вирішує головоломку за кадром, зберігаючи кожен рух у масиві
function start(num, from, end, temp) {
    //отримує поточний блок
    var block = document.getElementById(blocksIds[num]);
    //повернути, якщо блоків немає
    if (num === 0) {
        return;
    }
    //перемістить блок у тимчасове положення
    start(num - 1, from, temp, end);
    
    //відстежує кожен хід, зроблений кожним блоком, поточним блоком та його поточне положення
    pos.push([block, end]);
    
    //перемістить блок у кінцеве положення з тимчасового положення.
    start(num - 1, temp, end, from);
}

//Перемістіть блоки на екрані, щоб їх бачив користувач
function moveblocksIds(i) {
    var parent = pos[i][1], block = pos[i][0], firstChild = parent.firstElementChild;
    parent.insertBefore(block, firstChild);
}

/* Викликає moveblocksIds () кожні n * 500 мс, щоб кожен хід не перекривав один одного, і відстежує кожен раз коли
була викликана функція
*/
function solveIt() {
    for (var i = 0; i < pos.length; i++) {
        events.push(setTimeout(moveblocksIds, i*500, i));
    }
}

//очищає екран і створює нову вежу
function clean() {
    //видалить кожен блок
    from.innerHTML = end.innerHTML = temp.innerHTML = "";
    pos = [];
    //очистить чергу подій, щоб запобігти перекриванню
    for (var i in events) {
        clearTimeout(i);
    }

}

function make(n) {
    // Створить нову вежу за заданою висотою розміру n
    for (var j = 1; j <= n; j++) {
        from.innerHTML += "<li id=" + blocksIds[j] + "></li>";
    }
}

// Коли вибрано нову висоту за вказаною опцією, генерує нову вежу
tower.onchange = function () {
    var pegs = tower.options[tower.selectedIndex].value;
    clean();
    make(pegs);
}

// Start solving the puzzle
button.addEventListener("click", function () {
    // Створює нову вежу щоразу перед її вирішенням (див. Визначення функції вище)
    var pegs = tower.options[tower.selectedIndex].value;  
    clean();
    
    make(pegs);
    //pre solve the tower behind the scenes (see function definition above)
    start(pegs, from, end, temp);
    
    //solve it on screen (see function definition above)
    solveIt();
    
});