const CONCURRENT = 'concurrent';
const SERIES = 'series';
const NORMAL = 'normal';

module.exports.runType = cmd => {
    if (cmd.includes('&&')) return SERIES;
    if (cmd.includes('&')) return CONCURRENT;
    return NORMAL;
}

module.exports.isEnvVar = bit => bit.includes('=') && !bit.split('=')[0].match(/[a-z]/g);
module.exports.removeEnvVars = cmd => cmd.split(' ').filter(bit => !module.exports.isEnvVar(bit)).join(' ');
module.exports.getEnvVars = cmd => cmd.split(' ').filter(module.exports.isEnvVar).reduce((obj, env) => ({ [env.split('=')[0]]: env.split('=')[1] }), {})

module.exports.splitCmds = cmd => {
    // first try and split && cmds
    // or & cmds
    const cmds = cmd.split(/\s?&&?\s+/g);

    return cmds;

    //cmd.split(' ').concat(args.length ? ['--', ...args].join(' ') : []).filter(e => !removeEnvVars(e));
}

module.exports.constants = {
    CONCURRENT,
    SERIES,
    NORMAL
}
