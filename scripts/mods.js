
//Pick a random color for CSS3 in the form: rgb(x,y,z)
export function colorPicker() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(Math.floor(Math.random() * (255 - 0) + 0))
    }
    return `rgb( ${arr[0]}, ${arr[1]}, ${arr[2]} )`
}

//  shuffle array
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

