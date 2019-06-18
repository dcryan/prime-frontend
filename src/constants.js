function generateSongs(prefix) {
  const foo = new Array(25);
  for (let i = 0; i < foo.length; i += 1) {
    foo[i] = `${prefix}-${i}`;
  }
  return foo;
}

export const songs = {
  oldies: generateSongs('oldies'),
  "60's": generateSongs("60's"),
  "70's": generateSongs("70's"),
  "80's": generateSongs("80's"),
  "90's": generateSongs("90's"),
};
