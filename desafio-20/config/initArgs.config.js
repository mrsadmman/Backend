import initArgs from 'minimist';
const options = { default: { port: 8080 } };
const initOptions = initArgs(process.argv.slice(2), options);

export default initOptions;
