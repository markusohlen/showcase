import '../socket.io/socket.io.js'

const socket = window.io()

socket.on('newGithubComment', comment => {
  console.log(comment)
  const template = document.createElement('div')
  template.classList.add('container')
  template.classList.add('comment')

  const { body, author, updatedAt, avatarURL, issueNumber } = comment

  template.innerHTML = `
    <div class="row">
      <div class="col-12">
        <p>${body}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p class="commentFooter">${author}</p>
      </div>

      <div class="col-5">
        <p class="commentFooter">${updatedAt}</p>
      </div>

      <div class="col-1">
        <img src="${avatarURL}" alt="" class="commentAvatarImage">
      </div>
    </div>
  `
  
  document.querySelector(`.issueNumber${issueNumber} .commentsContainer`).appendChild(template)
})

socket.on('githubIssue', issue => {
  console.log(issue)

  const template = document.createElement('div')
  template.classList.add('issue')
  template.classList.add(`issueNumber${issue.issueNumber}`)

  template.innerHTML = `

      <div class="row">
        <div class="col-3">
          <h3>${issue.title}</h3>
        </div>
        <div class="col-1">
          <img src="${issue.avatar}" alt="" class="avatarImage">
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <p>${issue.body}</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-6">
          <p>State: ${issue.state}</p>
        </div>
        <div class="col-6">
          <p>Comments: ${issue.comments}</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <p>Last updated at: ${issue.updatedAt} </p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p>Created at: ${issue.createdAt}</p>
        </div>
      </div>

  `

  document.querySelector('#issues').appendChild(template)
})
