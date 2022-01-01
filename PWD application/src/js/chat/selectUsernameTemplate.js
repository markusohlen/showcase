const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="createUsernameModal">
 
    <div class="errorMessage">
      <p id="createUsernameErrorMessage"></p>
    </div>
    <div>
    <form id="createUsername">
      <p class="input">Choose a username</p>
      <input type="text" class="input" id="username" value="">
      <input type="submit" class="input button" id="submitUsername" name="submit" value="Create username">
    </form>
  </div>
</div>
`

export default template
