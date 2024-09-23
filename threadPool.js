const crypto = require('crypto');

process.env.UV_THREADPOOL_SIZE = 6;

console.time('Execution Time');

const start = Date.now()

// Simulating multiple tasks using the thread pool

for (let i = 0; i < 10; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log(`Task ${i + 1}  completed` ,Date.now() - start);
  });
}

console.timeEnd('Execution Time');
