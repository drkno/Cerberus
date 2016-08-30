'use strict';

let debugAreas = [];

let WriteLine = (data) => {
    console.log(data);
};

let Fail = (data) => {
    console.error(data);
};

let Blank = () => {};

module.exports = (area) => {
    if (debugAreas.indexOf(area) >= 0) {
        return {
            WriteLine: WriteLine,
            Fail: Fail
        };
    }
    else {
        return {
            WriteLine: Blank,
            Fail: Fail
        };
    }
};
