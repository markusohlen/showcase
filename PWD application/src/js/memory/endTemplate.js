const template = document.createElement('template')
template.innerHTML = /* html */ `
<div class="endscreen">
  <h1>Congratulations!</h1>
  <h3>You completed the memory in <br><span id="tries"></span> tries!</h3>

  <div class="button">
    <a class="playAgain" href="#">Play again</a>
  </div>
</div>
`

export default template
