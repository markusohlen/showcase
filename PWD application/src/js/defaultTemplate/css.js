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

.container {
  background-color: #f6f6f6;
  box-shadow: 2px 2px 20px 1px rgba(0,0,0,0.75);
  border-radius: 3px;
  position: absolute;
  overflow: hidden;
}

.tempHeader p {
  padding-left: 5%;
  float: left;
}
  
.tempHeader h3 {
  padding-left: 30px;
  padding-top: 5px;
  float: left;
}

.tempHeaderImg {
  float: left;
}

.tempHeaderImg img {
  padding-top: 5px;
  padding-left: 5px;
  width: 20px;
  height: 20px;
}

#exit {
  cursor: pointer;
  float: right;
  margin: auto;
}

.tempHeader {
  height: 30px;
}

.draggable {
  background-color: #dddddd;
}

.tempTitle {
  display: inline;
}

</style>
`

export default template
