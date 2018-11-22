module.exports = {
    globalSetup: '<rootDir>/build/tests/setup/onAppStart.js',
    globalTeardown: '<rootDir>/build/tests/setup/onAppStop.js',
    setupFiles: ['<rootDir>/build/tests/setup/onTestStart.js']
};