var insertion = function (input) {
    if (!Array.isArray(input)) {
        return;
    }
    var curVal, curIndex, prevIndex;
    for (curIndex = 1, len = input.length; curIndex < len; curIndex++) {
        curVal = input[curIndex];

        for (prevIndex = curIndex - 1; prevIndex > -1 && input[prevIndex] > curVal; prevIndex--) { // 当前值与上一个值比较
            input[prevIndex + 1] = input[prevIndex];
        }
        input[prevIndex + 1] = curVal;
    }

    return input;
};
