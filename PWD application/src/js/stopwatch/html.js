const template = document.createElement('template')
template.innerHTML = /* html */ `
  <div class="stopwatchWindow">
    <div class="stopwatchMenu">
      <div id="startTimer" class="button">
        <a href="#">Start</a>
      </div>
      
      <div id="pauseTimer" class="button">
        <a href="#">Pause</a>
      </div>

      <a href="#" id="resetTimer"><img src="../../image/reset.jpg"></a>
    </div>
    <div class="timer">
      <p id="h">00</p>
      
      <p>:</p>
      <p id="m">00</p>
      <p>:</p>
      <p id="s">00</p>
      <p>:</p>
      <p id="ms">00</p>
    </div>
  </div>
`

export default template
