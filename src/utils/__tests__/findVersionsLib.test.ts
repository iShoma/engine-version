import findVersions from 'find-versions';

describe('find-versions npm lib tests', () => {
  it('node parse version', () => {
    expect(findVersions('v14.15.0')[0]).toBe('14.15.0');
  });

  it('npm parse version', () => {
    expect(findVersions('7.0.7')[0]).toBe('7.0.7');
  });

  it('yarn parse version', () => {
    expect(findVersions('1.22.10')[0]).toBe('1.22.10');
  });

  it('browserify parse version', () => {
    expect(findVersions('17.0.0')[0]).toBe('17.0.0');
  });

  it('deno parse version', () => {
    expect(findVersions(`
deno 1.5.1
v8 8.7.220.3
typescript 4.0.3
    `)[0]).toBe('1.5.1');
  });

  it('pm2 parse version', () => {
    const pm2FirstVersionGetText = `

    -------------

    __/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
     _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
      _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
       _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
        _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
         _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
          _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
           _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
            _\///______________\///______________\///__\///////////////__
    
    
                              Runtime Edition
    
            PM2 is a Production Process Manager for Node.js applications
                         with a built-in Load Balancer.
    
                    Start and Daemonize any application:
                    $ pm2 start app.js
    
                    Load Balance 4 instances of api.js:
                    $ pm2 start api.js -i 4
    
                    Monitor in production:
                    $ pm2 monitor
    
                    Make pm2 auto-boot at server restart:
                    $ pm2 startup
    
                    To go further checkout:
                    http://pm2.io/
    
    
                            -------------
    
    [PM2] Spawning PM2 daemon with pm2_home=/Users/ulia/.pm2
    [PM2] PM2 Successfully daemonized
    4.5.0    
    `;
    expect(findVersions(pm2FirstVersionGetText)[0]).toBe('4.5.0');
  });
});
