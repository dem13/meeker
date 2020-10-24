const {spawn} = require('child_process');

const getCommand = (decrypt = false) => {
  const args = ['aes-256-cbc', '-a', '-salt', '-iter', '10000', '-pbkdf2'];

  if (decrypt) {
    args.push('-d');
  }

  return spawn('openssl', args);
}

export const encrypt = (message, secret) => {
  return new Promise((resolve, reject) => {
    const command = getCommand();

    command.stdin.write(secret + '\n');
    command.stdin.write(secret + '\n');
    command.stdin.write(message);

    let stderr = '';

    command.stdout.on('data', data => {
      const hash = data.toString()

      if (hash) {
        resolve(hash.trim());
      } else {
        reject(new Error("Invalid hash"));
      }
    });

    command.stderr.on('data', data => stderr += data.toString())

    command.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Openssl command finished with code ${code}. stderr: "${stderr}"`));
      }
    });

    command.stdin.end();
  })
};

export const decrypt = (hash, secret) => {
  return new Promise((resolve, reject) => {
    const command = getCommand(true);

    command.stdin.write(secret + '\n');
    command.stdin.write(hash + '\n');

    let stderr = '';

    let message = null;

    command.stdout.on('data', data => {
      message = data.toString()
    });

    command.stderr.on('data', data => stderr += data.toString())

    command.on('close', code => {
      if (code === 0) {
        if (message) {
          return resolve(message);
        }

        return reject(new Error("Invalid hash"));
      }

      if(stderr.includes('bad decrypt')) {
        return reject(new Error('bad decrypt'));
      }

      return reject(new Error(`Openssl command finished with code ${code}. stderr: "${stderr}"`));
    });

    command.stdin.end();
  })
}
