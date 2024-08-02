// get parameters from command line
const args = process.argv.slice(2);
let command = args[0];
let subfunction = '';
if(command.charAt(':')>-1){
    command = command.split(':') ;
    subfunction = command[1];
    command = command[0];
}

console.log("Executing command: ", command, subfunction);
try {
    command = (await import('./' + command+ '.js')); 
    if(subfunction){
        subfunction = command[subfunction];
    }
    else {
        subfunction = command.default;
    }
    const paramSet= args.slice(1).map(p=> Number(p) || p);
    subfunction(...paramSet);
} catch (err) {
    console.error(err);
}

