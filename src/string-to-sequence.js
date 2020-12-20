// @flow

const stringToSequence = (
  doc: string,
  sepRe: RegExp | string = /(<b>.*<\/b>)|([a-zA-ZÀ-ÿ\n.,;-])+/g
) => {
  if (typeof sepRe === "string") {
    sepRe = new RegExp(sepRe, "g")
  }
  let m
  let indices = [0]
  doc = doc.replace(/\n/g, ' \n ')
  do {
    m = sepRe.exec(doc)
    if (m) {
      indices.push(m.index)
      indices.push(m.index + m[0].length)
    }
  } while (m)
  indices = indices.concat([doc.length])
  return indices
    .map((_, i) => ({
      text: doc.slice(indices[i], indices[i + 1]),
      textId: Math.random()
        .toString(36)
        .slice(-6)
    }))
    .filter((s,i, array) => {
      if (i>0 && s.text==' ' && array[i-1]=='\n') return false
      return s.text.length > 0
    })
}

export default stringToSequence
