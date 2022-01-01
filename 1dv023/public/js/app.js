import './socket.js'

const submits = document.querySelectorAll('.submitComment')

submits.forEach(submit => {
  submit.addEventListener('click', event => submitComment(event), false)
})

const submitComment = async (e) => {
  e.preventDefault()

  const issueNumber = e.target.getAttribute('data-issue-index')
  let comment = document.querySelector(`#createCommentIndex${issueNumber}`)

  const data = {
    comment: comment.value,
    issueNumber
  }

  fetch('https://6a3345b9c631.ngrok.io/payload/addComment', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (res.status === 201) {
      comment.value = ''
    }
  })
  .catch((err) => console.log(err))
}
