export function getRandomInt() {
    const min = Math.ceil(100);
    const max = Math.floor(200);
    return Math.floor(Math.random() * (max - min)) + min;
  }
