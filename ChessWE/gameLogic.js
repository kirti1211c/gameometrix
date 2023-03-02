
window.onload = function () {
    startGame();
}


function startGame() {
    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const t = urlParams.get('theme');

    if (t == "dark") {
        document.body.style.backgroundColor = "#252627";
        document.body.style.color = "white";

    }
}

//Inserting piece images
function insertImage() {
    document.querySelectorAll('.square').forEach(image => {

        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class = 'allimg allpawn' src = "${image.innerText}.png" alt ="">`
                image.style.cursor = 'pointer'
            }

            else {
                image.innerHTML = `${image.innerText} <img class = 'allimg' src = "${image.innerText}.png" alt ="">`
                image.style.cursor = 'pointer'
            }
        }
    })
}

insertImage()

//Inserting colors in the board

function coloring() {
    const color = document.querySelectorAll('.square')

    color.forEach(color => {

        getID = color.id
        arr = Array.from(getID)
        //console.log(arr)
        //arr.shift()
        //console.log(arr)
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(208, 221, 227)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(125, 159, 180)'
        }
    })
}

coloring()

function reddish() {

    document.querySelectorAll('.square').forEach(i1 => {
        if (i1.style.backgroundColor == 'gray') {
            document.querySelectorAll('.square').forEach(i2 => {
                if (i2.style.backgroundColor == 'olive' && i2.innerText.length !== 0) {

                    oliveText = i2.innerText
                    grayText = i1.innerText


                    grayColor = ((Array.from(grayText)).shift()).toString()
                    oliveColor = ((Array.from(oliveText)).shift()).toString()


                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup

                    if (a % 2 == 0 && grayColor == oliveColor) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }

                    if (a % 2 !== 0 && grayColor == oliveColor) {
                        i2.style.backgroundColor = 'rgb(77, 59, 36)'
                    }
                }
            })
        }
    })
}


tog = 1

document.querySelectorAll('.square').forEach(item => {

    item.addEventListener('click', function () {


        //delete a piece and replace it with the piece that killed it

        if (item.style.backgroundColor == 'olive' && item.innerText.length == 0) {
            tog = tog + 1
        }

        else if (item.style.backgroundColor == 'olive' && item.innerText.length !== 0) {

            document.querySelectorAll('.square').forEach(i => {
                if (i.style.backgroundColor == 'gray') {
                    grayId = i.id
                    grayText = i.innerText

                    document.getElementById(grayId).innerText = ''
                    item.innerText = grayText
                    coloring()
                    insertImage()
                    tog = tog + 1


                }
            })
        }

        getId = item.id
        arr = Array.from(getId);
        console.log(arr)
        //arr.shift()
        //console.log(arr)
        aside = eval(arr.pop())
        arr.push('0')
        console.log(arr)
        aup = eval(arr.join(''))
        a = aside + aup
        console.log(aside, aup, a)
        //console.log(arr)


        //Piece laws
        function whosTurn(toggle) {


            //a.Pawn
            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'gray'

                if (tog % 2 !== 0 && aup < 800) {

                    if (aup == 200 && document.getElementById(`${a + 100}`).innerText.length == 0 && document.getElementById(`${a + 200}`).innerText.length == 0) {
                        document.getElementById(`${a + 100}`).style.backgroundColor = 'olive'
                        document.getElementById(`${a + 200}`).style.backgroundColor = 'olive'
                    }

                    if (document.getElementById(`${a + 100}`).innerText.length == 0) {
                        document.getElementById(`${a + 100}`).style.backgroundColor = 'olive'
                    }

                    if (aside < 8 && document.getElementById(`${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`${a + 100 + 1}`).style.backgroundColor = 'olive'
                    }

                    if (aside > 1 && document.getElementById(`${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`${a + 100 - 1}`).style.backgroundColor = 'olive'
                    }
                }

                if (tog % 2 == 0 && aup > 100) {

                    if (aup == 700 && document.getElementById(`${a - 100}`).innerText.length == 0 && document.getElementById(`${a - 200}`).innerText.length == 0) {
                        document.getElementById(`${a - 100}`).style.backgroundColor = 'olive'
                        document.getElementById(`${a - 200}`).style.backgroundColor = 'olive'
                    }

                    if (document.getElementById(`${a - 100}`).innerText.length == 0) {
                        document.getElementById(`${a - 100}`).style.backgroundColor = 'olive'
                    }

                    if (aside < 8 && document.getElementById(`${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`${a - 100 + 1}`).style.backgroundColor = 'olive'
                    }

                    if (aside > 1 && document.getElementById(`${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`${a - 100 - 1}`).style.backgroundColor = 'olive'
                    }
                }

            }

            //b.King

            if (item.innerText == `${toggle}king`) {

                if (aside < 8) {
                    document.getElementById(`${a + 1}`).style.backgroundColor = 'olive'
                }

                if (aside > 1) {
                    document.getElementById(`${a - 1}`).style.backgroundColor = 'olive'
                }

                if (aup < 800) {
                    document.getElementById(`${a + 100}`).style.backgroundColor = 'olive'
                }

                if (aup > 100) {
                    document.getElementById(`${a - 100}`).style.backgroundColor = 'olive'
                }

                if (aup > 100 && aside < 8) {
                    document.getElementById(`${a - 100 + 1}`).style.backgroundColor = 'olive'
                }

                if (aup > 100 && aside > 1) {
                    document.getElementById(`${a - 100 - 1}`).style.backgroundColor = 'olive'
                }

                if (aup < 800 && aside < 8) {
                    document.getElementById(`${a + 100 + 1}`).style.backgroundColor = 'olive'
                }

                if (aup < 800 && aside > 1) {
                    document.getElementById(`${a + 100 - 1}`).style.backgroundColor = 'olive'
                }
                item.style.backgroundColor = 'gray'
            }

            //c. Bishop



            if (item.innerText == `${toggle}bishop`) {

                for (let i = 1; i < 9; i++) {

                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText == 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'olive'
                    }

                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText !== 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText == 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'olive'
                    }

                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText !== 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'olive'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'olive'
                        break
                    }

                }

                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'olive'
                    }

                    else if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                // for (let i = 1; i < 9; i++) {
                //     if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText == 0) {
                //         document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'olive'
                //     }
                //     if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText !== 0) {
                //         document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'olive'
                //         break
                //     }
                // }

                item.style.backgroundColor = 'gray'


            }



            //d. Rook

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`${a + i * 100}`).innerText == 0) {
                        document.getElementById(`${a + i * 100}`).style.backgroundColor = 'olive'
                    }

                    else if ((a + i * 100) < 900 && document.getElementById(`${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`${a + i * 100}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`${a - i * 100}`).innerText == 0) {
                        document.getElementById(`${a - i * 100}`).style.backgroundColor = 'olive'
                    }

                    else if ((a - i * 100) > 100 && document.getElementById(`${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`${a - i * 100}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`${a + i}`).innerText == 0) {
                        document.getElementById(`${a + i}`).style.backgroundColor = 'olive'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`${a + i}`).innerText !== 0) {
                        document.getElementById(`${a + i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > aup && document.getElementById(`${a - i}`).innerText == 0) {
                        document.getElementById(`${a - i}`).style.backgroundColor = 'olive'
                    }

                    else if ((a - i) > aup && document.getElementById(`${a - i}`).innerText !== 0) {
                        document.getElementById(`${a - i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                item.style.backgroundColor = 'gray'
            }

            //e. Queen

            if (item.innerText == `${toggle}queen`) {

                //Rook Movements

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`${a + i * 100}`).innerText == 0) {
                        document.getElementById(`${a + i * 100}`).style.backgroundColor = 'olive'
                    }

                    else if ((a + i * 100) < 900 && document.getElementById(`${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`${a + i * 100}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`${a - i * 100}`).innerText == 0) {
                        document.getElementById(`${a - i * 100}`).style.backgroundColor = 'olive'
                    }

                    else if ((a - i * 100) > 100 && document.getElementById(`${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`${a - i * 100}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`${a + i}`).innerText == 0) {
                        document.getElementById(`${a + i}`).style.backgroundColor = 'olive'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`${a + i}`).innerText !== 0) {
                        document.getElementById(`${a + i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > aup && document.getElementById(`${a - i}`).innerText == 0) {
                        document.getElementById(`${a - i}`).style.backgroundColor = 'olive'
                    }

                    else if ((a - i) > aup && document.getElementById(`${a - i}`).innerText !== 0) {
                        document.getElementById(`${a - i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                //Bishop Movements

                for (let i = 1; i < 9; i++) {

                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText == 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'olive'
                    }

                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`${a + i * 100 + i}`).innerText !== 0) {
                        document.getElementById(`${a + i * 100 + i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText == 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'olive'
                    }

                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`${a - i * 100 + i}`).innerText !== 0) {
                        document.getElementById(`${a - i * 100 + i}`).style.backgroundColor = 'olive'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'olive'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a + i * 100 - i}`).style.backgroundColor = 'olive'
                        break
                    }

                }

                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'olive'
                    }

                    else if (i < aup / 100 && i < aside && document.getElementById(`${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`${a - i * 100 - i}`).style.backgroundColor = 'olive'
                        break
                    }
                }







                item.style.backgroundColor = 'gray'


            }

            if (item.innerText == `${toggle}knight`) {


                if (aside < 7 && aup < 800) {
                    document.getElementById(`${a + 100 + 2}`).style.backgroundColor = 'olive'
                }

                if (aside < 7 && aup > 200) {
                    document.getElementById(`${a - 100 + 2}`).style.backgroundColor = 'olive'
                }

                if (aside < 8 && aup < 700) {
                    document.getElementById(`${a + 200 + 1}`).style.backgroundColor = 'olive'
                }

                if (aside > 1 && aup < 700) {
                    document.getElementById(`${a + 200 - 1}`).style.backgroundColor = 'olive'
                }

                if (aside > 2 && aup < 800) {
                    document.getElementById(`${a + 100 - 2}`).style.backgroundColor = 'olive'
                }

                if (aside > 2 && aup > 100) {
                    document.getElementById(`${a - 100 - 2}`).style.backgroundColor = 'olive'
                }

                if (aside < 8 && aup > 200) {
                    document.getElementById(`${a - 200 + 1}`).style.backgroundColor = 'olive'
                }

                if (aside > 1 && aup > 200) {
                    document.getElementById(`${a - 200 - 1}`).style.backgroundColor = 'olive'
                }

                item.style.backgroundColor = 'gray'

            }



        }

        //who's turn to move
        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"

            whosTurn('W')
        }

        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }

        reddish()

        //whoWins?

        checkmate = 0
        document.querySelectorAll('.square').forEach(win => {

            if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                checkmate += 1
            }
        })



        if (checkmate == 1) {
            setTimeout(() => {

                if (tog % 2 == 0) {
                    alert("White Wins!!")
                    location.reload()
                }

                else if (tog % 2 !== 0) {
                    alert("Black Wins!!")
                    location.reload()
                }
            }, 100)
        }

    })
})


document.querySelectorAll('.square').forEach(sq => {

    sq.addEventListener('click', function () {

        if (sq.style.backgroundColor == 'gray') {

            grayId = sq.id
            grayText = sq.innerText

            document.querySelectorAll('.square').forEach(sq2 => {

                sq2.addEventListener('click', function () {
                    if (sq2.style.backgroundColor == 'olive' && sq2.innerText.length == 0) {

                        document.getElementById(grayId).innerText = ''
                        sq2.innerText = grayText
                        coloring()
                        insertImage()
                    }
                })

            })
        }
    })
})

//Avoiding multiple selection

i = 0
document.querySelectorAll('.square').forEach(sq => {

    sq.addEventListener('click', function () {
        i = i + 1
        if (i % 2 == 0 && sq.style.backgroundColor !== 'olive') {
            coloring()
        }
    })
})