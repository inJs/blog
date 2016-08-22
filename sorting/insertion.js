var insertionSort = function (input) {
    if (!Array.isArray(input)) {
        return;
    }
    var curVal, i, ii;
    for (i = 1, len = input.length; i < len; i++) {
        curVal = input[i];

        for (ii = i - 1; ii > -1 && input[ii] > curVal; ii--) { // 当前值与上一个值比较
            input[ii + 1] = input[ii]; // ii + 1 === i;
        }
        input[ii + 1] = curVal;
    }

    return input;
};
