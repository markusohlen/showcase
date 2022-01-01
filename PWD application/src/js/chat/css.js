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

.menu {
  height: 25px;
}

.chat {
  width: 90%;
  margin-left: 5%;
  height: 80%;
}

.chat-window {
  width: 100%;
  height: 80%;
  background-color: white;
  overflow: auto;
  padding-top: 5px;
  box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.75);
  overflow-wrap: break-word;
}

.chat-window p {
  margin-bottom: 10px;

}

.chat-window > * {
  margin-left: 5px;
  user-select: text;
}

#chat-message {
  margin-top: 1px;
  width: 100%;
}

#createUsernameModal {
  display: block;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  margin-top: 30px;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #efefef;
}

#createUsername {
  width: 100%;
  position: absolute;
  top: 150px;
}

.errorMessage {
  text-align: center;
  margin-top: 20%;
}

#newNickname {
  display: inline;
  cursor: pointer;
}

input[type=submit] {
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
  background-color: #599bb3;
  border-radius: 8px;
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
}

input[type=submit]:hover {
  background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
  background-color:#408c99;
}

input[type=submit]:active {
  position:relative;
  top:1px;
}

#username {
  font-size: 130%;
  margin-bottom: 20px;
  border-radius: 8%;
  border: none;
  border-radius: 41px 41px 41px 41px;
  -moz-border-radius: 41px 41px 41px 41px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border: 0px solid #000000;
}

.modal {
  display: none;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  margin: auto;
  border: 1px solid #888;
  width: 80%;
  margin-top: 50%;
}

#close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

#close:hover,
#close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

#smileySelector {
  display: inline;
}

.input {
  display: block;
  width: 80%;
  margin-left: 10%;
  font-size: 120%;
  text-align: center;
}

#newNickname {
  margin-left: 5%;
}

#changeNickname {
  margin-top: 5%;
}

</style>
`

export default template
