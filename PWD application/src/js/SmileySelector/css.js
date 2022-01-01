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

:host {
  display: block;
  float: right;
}
.smiley {
  display: inline;
}

.smileyDiv {
  width: 30px;
  float: left;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.inactive, .inactive > * {
  display: none;
}

.active {
  display: block;
}

.smileyDiv:hover { 
  border-radius: 20%;
  background-color: #cacaca;
  cursor: pointer;
}

.smileySelector {
  width: 270px;
  height: 389px;
  background-color: #fafafa;
  top: -370px;
  position: relative;
  border: 0.5px solid #cfcfcf;
}

.selectorTemplate {
  height: 365px;
  top: -20px;
  box-shadow: 4px 4px 9px -2px rgba(0,0,0,0.75);
  border: 0.5px solid #cfcfcf;
  overflow: scroll;
}

.appendSmileySelector {
  cursor: pointer;
}

#closeSelector {
  cursor: pointer;
}

</style>
`

export default template
