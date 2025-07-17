console.log('Script start');
const start = performance.now();
while (performance.now() - start < 2000) {
  // simulate a 2-second blocking script
}
console.log('Script end');