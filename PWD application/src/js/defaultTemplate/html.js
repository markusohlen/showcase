const template = document.createElement('template')
template.innerHTML = /* html */ `

<div class="container">
  <div class="tempHeader draggable">
    <div class="tempHeaderImg" id="tempFavicon">

    </div>
    <h3 class="tempTitle"></h3>
    <div class="tempHeaderImg" id="exit">
      <img src="../../image/exit.png">
    </div>
  </div>
  
</div>
`

export default template
