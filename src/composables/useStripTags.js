export default function useStripTags() {
  const expression = /(<([^>]+)>)/ig;

  return {
    stripTags: (content) => content.replace(expression, ''),
  }
}
