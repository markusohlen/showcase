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
  margin-left: 5%;
  float: left;
}

.menu h3 {
  padding-left: 30px;
  padding-top: 5px;
  float: left;
}

.memory-window {
  width: 95%;
  height: 88%;
  margin-top: 2.5%;
  margin-left: 2.5%;
}

.memory-row {
  height: 100px;
  width: 100%;
}

.card {
  width: 70px;
  height: 80px;
  float: left;
  margin-left: 5px;
  margin-top: 10px;
  box-shadow: 1px 1px 9px 0px rgba(0,0,0,0.75);
  border-radius: 10%;
}
.cardImage {
  background-color: white;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.hidden {
  visibility: hidden;
}

#dropdownMenu {
  display: none;
  z-index: 1;
  position: absolute;
  background-color: #efefef;
}

#dropdownMenu a {
  display: block;
  margin: 5px;
  color: black;
  text-decoration: none;
}

#dropdownMenu a:hover {
  display: block;
  margin: 5px;
  color: black;
  text-decoration: underline;
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
  margin-top: 10%;
}

.button:hover {
  background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
  background-color:#408c99;
}

.button:active {
  position:relative;
  top:1px;
}

.button a {
  all: unset;
}

.endscreen {
  height: 100%;
  text-align: center;
}

.endscreen h3 {
  margin-top: 5%;
}

#settings:hover {
  cursor: pointer;
}

</style>
`

export default template
