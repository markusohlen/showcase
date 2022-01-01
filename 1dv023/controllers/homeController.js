'use strict'

import fetch from 'node-fetch'
import btoa from 'btoa'

import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default class HomeController {
  constructor() {
    this.headers = { Authorization: 'Basic ' + btoa(process.env.GITHUB_TOKEN) }
  }

  /**
   * Renders the home site with snippets
   */
  index = async (req, res, next) => {
    const ghFetch = await fetch(process.env.GITHUB_URL, {
      method: 'GET',
      headers: this.headers
    })

    const re = await ghFetch.json()

    const issues = await Promise.all(re.map(async issue => {
      console.log(issue.number)
      return {
        state: issue.state,
        title: issue.title,
        body: issue.body,
        commentsAmmount: issue.comments,
        comments: await this.fetchComments(issue.comments_url),
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        avatar: issue.user.avatar_url,
        issueNumber: issue.number
      }
    }))

    res.render('home/index', { issues })
  }

  fetchComments = async (url) => {
    const ghfetch = await fetch(url, {
      method: 'GET',
      headers: this.headers
    })

    const json = await ghfetch.json()

    const comments = json.map(comment => {
      return {
        author: comment.user.login,
        avatarURL: comment.user.avatar_url,
        body: comment.body,
        updatedAt: comment.updated_at
      }
    })

    return comments
  }
}
