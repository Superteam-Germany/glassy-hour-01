export const intToU16Buffer = (i: number) => {
  return Buffer.from([i & 0xff, (i >> 8) & 0xff]);
};
