/***********************
 *
 * Winston Logger JS
 *
 ***********************/

// npm install winston

const winston = require('winston');
const path = require('path');

// Save to the current package
const filename = path.join(__dirname, 'Winston-LogFile.log');


/***********************
 *
 * Custom Levels & Colors
 *
 ***********************/

// Logging levels & colors
const customLevels = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow'
    }
};

// Adding your custom colors with 'addColors'
winston.addColors(customLevels.colors);


/***********************
 *
 * File & Console Format
 *
 ***********************/

// File format
let fileFormat = winston.format.combine(
    // The headline
    winston.format.label({
        label: '[LOGGER]'
    }),
    // Example of a timestap format
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // Order in which the log will be print
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

// Console format
let consoleFormat = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.label({
        label: '[LOGGER]'
    }),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

/***********************
 *
 * Options
 *
 ***********************/

// Options for console & file
let options = {
    console: {
        format: winston.format.combine(consoleFormat)
    },
    file: {
        filename: filename,
        format: winston.format.combine(fileFormat)

    }
};


/***********************
 *
 * Create Logger
 *
 ***********************/

const winstonLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ]
});



/***********************
 *
 * Examples
 *
 ***********************/

// Prints to the console and save to the 'filepath'
winstonLogger.log('info', 'Winston is a library');
winstonLogger.log('error', 'Some kind of error');
winstonLogger.log('warn', 'About to over flow');
winstonLogger.log('debug', 'Aww bugs');


