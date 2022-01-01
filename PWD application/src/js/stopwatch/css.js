const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
html, body, div, header, nav, main, footer, ul, h1, h2, h3, h4, h5, h6, p, form {
  margin: 0px;
  padding: 0px;
}
  
header, nav, main, footer {
  display: block;
}

.header p, .menu p {
  padding-left: 5%;
  float: left;
}

.menu h3 {
  padding-left: 30px;
  padding-top: 5px;
  float: left;
}

.stopwatch {
  width: 95%;
  height: 95%;
  margin-top: 2.5%;
  margin-left: 2.5%;
}

.timer {
  display: flex;
  margin-left: 5%;
  font-size: 300%;
  margin-top: 3%;
}

#resetTimer img {
  width: 27%;
}

.stopwatchWindow {
  margin-top: 5%;
  width: 90%;
  margin-left: 5%;
}

.stopwatchMenu {
  display: flex;
  margin: 0 auto;
  text-align: center;
}

.stopwatchMenu > * {
  margin: 0 auto;
}

.button {
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
  background-color: #599bb3;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 9px 23px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
  border: 0px;
  margin: auto;
  margin-left: 5%;
}

.button:hover {
  background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
  background-color: #408c99;
}

.button:active {
  position: relative;
  top: 1px;
}

.button a {
  all: unset;
}

#resetTimer {
  float: left;
  margin: 1pt;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
}

</style>
`

export default template
