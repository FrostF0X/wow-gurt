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

Array.range = (start, finish = 0) => {
    return [...Array(finish - start + 1).keys()].map(i => i + start);
};

