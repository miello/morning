import unified from 'unified'
import markdown from 'remark-parse'
import math from 'remark-math'
import remark2rehype from 'remark-rehype'
import katex from 'rehype-katex'
import stringify from 'rehype-stringify'

const RenderQuestion = function(text) {
  let res = ''
  unified()
    .use(markdown)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(stringify)
    .process(text, function(err, file) {
      if (err) throw err
      res = String(file)
    })
  return res
}

const ExamChecker = function(Current, Solution) {
  let Sol = []
  const len = Solution.length
  for (let i = 0; i < len; i++) {
    Sol.push(Solution[i].solution)
  }
  let Score = new Array(len)
  for (let i = 0; i < len; i++) {
    Score[i] = 0
    const lenarr = Sol[i].length
    for (let j = 0; j < lenarr; j++) {
      if (Current[i][j] == Sol[i][j].solnum) {
        Score[i]++
      }
    }
  }
  let ResultMessage = 'คะแนนที่ได้' + '\n'
  for (let i = 0; i < len; i++) {
    ResultMessage = ResultMessage + `${Solution[i].name} : ` + `\n`
  }
  return ResultMessage
}

export { ExamChecker, RenderQuestion }
