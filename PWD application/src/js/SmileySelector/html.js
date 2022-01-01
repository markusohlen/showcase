const template = document.createElement('template')
template.innerHTML = /* html */ `

<p class="appendSmileySelector">😀</p>

<div class="smileySelector inactive">
  <img id="closeSelector" src="../../image/exit.png">
  <div class="selectorTemplate">
  </div>
</div>

`

export default template
