
const tagColorMap: { [key: string]: string } = {};

const getRandomColor = () => {
  const colors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow', 'teal', 'cyan', 'pink', 'gray'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getTagColor = (tag: string) => {
  if (!tagColorMap[tag]) {
    tagColorMap[tag] = getRandomColor();
  }
  return tagColorMap[tag];
};

export { getTagColor };
