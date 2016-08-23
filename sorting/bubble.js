var bubble = function (input) {
    if (!Array.isArray(input)) {
        return;
    }
    var temp, i, ii;
    for (i = 0, len = input.length; i < len; i++) {
        for (ii = 0; ii < len - i; ii++) {
            if (input[ii] > input[ii + 1]) {
                temp = input[ii];
                input[ii] = input[ii + 1];
                input[ii + 1] = temp;
            }
        }
    }

    return input;
};