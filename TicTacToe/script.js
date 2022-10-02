let cells = cube.getElementsByTagName('div');



let Cross = true;

let poses = [0, 0, 0];


let cells_boolen = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
];

let end = 0;
let win = false;


console.log(cells);

for (var i = 0; i < cells.length; i++) {
    cells[i].setAttribute("pos", i);
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
        if (!win) {


            let circle_class = this.getElementsByClassName('circle');
            let left_class = this.getElementsByClassName('left');
            let right_class = this.getElementsByClassName('right');


            let circle = !circle_class[0].classList.contains('show');
            let leftdiag = !left_class[0].classList.contains('cube_cross_diag_left');
            let rightdiag = !right_class[0].classList.contains('cube_cross_diag_right');


            if (Cross && circle && leftdiag && leftdiag && end < 10) {

                this.getElementsByClassName('circle')[0].classList.add("show");
                Cross = false;
                cells_boolen[Math.floor(this.attributes[1].value / 3)][this.attributes[1].value % 3] = 1;
                end++;

            } else if (!Cross && circle && leftdiag && rightdiag && end < 10) {

                left_class[0].classList.add("cube_cross_diag_left");
                right_class[0].classList.add("cube_cross_diag_right");
                Cross = true;
                cells_boolen[Math.floor(this.attributes[1].value / 3)][this.attributes[1].value % 3] = 0;
                end++;
            }
            checkWinner = WhoWin(cells_boolen)
            if (checkWinner == "Circle") {
                winner.innerHTML = "<h1 style='color:#EB242A;font-size: 20px;max-width:30%;'>Circle team Win!</h1>";
                circle_score.innerHTML = Number(circle_score.innerHTML) + 1;

            } else if (checkWinner == "Cross") {
                winner.innerHTML = "<h1 style='color:#22EB77;font-size: 20px;max-width:30%;'>Cross team Win!</h1>";
                cross.innerHTML = Number(cross.innerHTML) + 1;

            } else if (end == 9) {
                winner.innerHTML = "<h1 style='color:#5E5B58;font-size: 20px;max-width:30%;'>Draw!</h1>";
                draw.innerHTML = Number(draw.innerHTML) + 1;
            }
            if (checkWinner == "Circle" || checkWinner == "Cross" || end == 9) {
                win = true;
                reset_btn.style.display = 'inline-block';
                fillSquare();

            }
        }


    });
}


function fillSquare(color = '#fff', opacity = '0.5') {
    for (var i = 0; i < cells_boolen.length && poses[0] + poses[1] != 0; i++) {
        cells[poses[i]].style.backgroundColor = color;
        cells[poses[i]].style.opacity = opacity;
    }

}


function reset() {

    reset_btn.style.display = 'inline-block';

    winner.innerHTML = "";
    end = 0;
    cells_boolen = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
    ];
    win = false;
    Cross = true;
    fillSquare("#fff", '1');
    poses = [0, 0, 0];




    for (var i = 0; i < cells.length; i++) {
        cells[i].getElementsByClassName('circle')[0].classList.remove("show");
        cells[i].getElementsByClassName('left')[0].classList.remove("cube_cross_diag_left");
        cells[i].getElementsByClassName('right')[0].classList.remove("cube_cross_diag_right");
    }



    reset_btn.style.display = 'none';
}

function WhoWin(cells_boolen) {
    let shape = ["Cross", "Circle"];
    /* Circle */
    for (var k = 0; k < 2; k++) {
        for (var i = 0; i < 3; i++) {
            if (cells_boolen[i][0] == k && cells_boolen[i][1] == k && cells_boolen[i][2] == k) {
                poses = [i * 3, i * 3 + 1, i * 3 + 2];
                return shape[k];
            } else if (cells_boolen[0][i] == k && cells_boolen[1][i] == k && cells_boolen[2][i] == k) {
                poses = [i, 3 + i, 6 + i];
                return shape[k];
            }

        }
        if (cells_boolen[0][0] == k && cells_boolen[1][1] == k && cells_boolen[2][2] == k) {
            poses = [0, 4, 8];
            return shape[k];
        }

        if (cells_boolen[0][2] == k && cells_boolen[1][1] == k && cells_boolen[2][0] == k) {
            poses = [2, 4, 6];
            return shape[k];
        }

    }

    return "";

}
