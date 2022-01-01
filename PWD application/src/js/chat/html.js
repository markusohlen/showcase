const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="changeNickModal" class="modal">
  <div class="modal-content">
    <span id="close">&times;</span>
    <form id="newNickForm">
    <div class="errorMessage">
      <p id="newUsernameErrorMessage"></p>
    </div>
    <p>Choose a new username</p>
      <input type="text" id="newNick" value="">
      <input type="submit" id="changeNickname" name="submit" value="Change username">
    </form>
  </div>
</div>

  <div class="menu">
    <p id="newNickname">Change username</p>
  </div>

  

  <div class="chat">
    <div class="chat-window">

    </div>
<br>
    <form id="chatForm">
    <textarea id="chat-message"></textarea>
        
        <br>
        <input type="submit" value="Send message" id="sendMsg">
        <div id="smileySelector"></div>
    </form>
  </div>
`

export default template
