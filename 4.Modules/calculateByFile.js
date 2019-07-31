const fs = require('fs');
const calc = require('./opr')
fs.readFile('./4.Modules/input.txt', (err, data) => {
    if (err)
        throw err;
    let input_txt = data.toString()
    let result;
    arr_cal = input_txt.split(',')
    switch (arr_cal[1]) {
        case '+':
            result = Number(arr_cal[0]) + Number(arr_cal[2])
            break;
        case '-':
            result = Number(arr_cal[0]) - Number(arr_cal[2])
            break;
        case '*':
            result = Number(arr_cal[0]) * Number(arr_cal[2])
            break;
        case '/':
            result = Number(arr_cal[0]) / Number(arr_cal[2])
            break;
    }
    fs.writeFile('./4.Modules/output.txt', result, (err) => {
        if (err)
            throw err;
    });

});
