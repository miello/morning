const ExamChecker = function(Current, Solution) {
  let Selected = []
  const len = Solution.length
  for (let i = 0; i < len; i++) {
    Selected.push(Solution[i].solution)
  }
  let Score = new Array(len)
  for (let i = 0; i < len; i++) {
    Score[i] = 0
    const lenarr = Solution[i].length
    for (let j = 0; j < lenarr; j++) {
      if (Current[i][j] == Solution[i].solnum) {
        Score[i]++
      }
    }
  }
  let ResultMessage = 'คะแนนที่ได้' + '\n'
  for (let i = 0; i < len; i++) {
    ResultMessage = ResultMessage + `${this.title[i]} : ` + `\n`
  }
  return ResultMessage
}

export { ExamChecker }
