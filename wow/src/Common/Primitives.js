import "./Primitives.d.ts";
// eslint-disable-next-line no-extend-native
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

Number.random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

Number.beautiful = () => {
    let options = ['palindrome', 'sequence'];
    let chosenOption = options[Math.floor(Math.random() * options.length)];

    let oddDigits = [1, 3, 5, 7, 9];
    let number = "";

    if (chosenOption === 'palindrome') {
        for (let i = 0; i < 7; i++) {
            number += oddDigits[Math.floor(Math.random() * oddDigits.length)];
        }
        number = number + "" + number.split("").reverse().join("");
    } else if (chosenOption === 'sequence') {
        let startingIndex = Math.floor(Math.random() * (oddDigits.length - 4));
        for (let i = 0; i < 15; i++) {
            number += oddDigits[(startingIndex + i) % oddDigits.length];
        }
    }
    return number;
}

Array.range = (start, finish = 0) => {
    return [...Array(finish - start + 1).keys()].map(i => i + start);
};

