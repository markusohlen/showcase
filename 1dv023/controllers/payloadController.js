'use strict'
// Enviroment variables
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import crypto from 'crypto'

import { Octokit } from '@octokit/core'
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export default class PayloadController {

  validatePayload = (req, res, next) => {
    // https://humanwhocodes.com/snippets/2020/08/validate-github-webhook-signature-nodejs/
    const expectedSignature = 'sha1=' +
    crypto.createHmac('sha1', process.env.WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

    // compare the signature against the one in the request
    const signature = req.headers['x-hub-signature'];
    if (signature !== expectedSignature) {
      res.status(403).end()
    }
    next()
  }

  index = async (req, res, next) => {
    try {
      if (req.body.comment) {

        const comment = {
          body: req.body.comment.body,
          author: req.body.comment.user.login,
          avatarURL: req.body.comment.user.avatar_url,
          updatedAt: req.body.comment.updated_at,
          issueNumber: req.body.issue.number
        }

        res.io.emit('newGithubComment', comment)
        res.status(201).end()
      }

      const issue = {
        state: req.body.issue.state,
        title: req.body.issue.title,
        body: req.body.issue.body,
        comments: req.body.issue.comments,
        createdAt: req.body.issue.created_at,
        updatedAt: req.body.issue.updated_at,
        avatar: req.body.issue.user.avatar_url
      }

      res.io.emit('githubIssue', issue)

      res.status(200).end()
    } catch (error) {
      console.log(error.message)
      res.status(404).end()
    }
  }

  addComment = async (req, res, next) => {
    const octoURL = `/repos/1dv023/mo223dg-examination-3/issues/${req.body.issueNumber}/comments`

    try {
      const octoRes = await octokit.request(`POST ${octoURL}`, {
        owner: '1dv023',
        repo: 'mo223dg-examination-3',
        issue_number: parseInt(req.body.issueNumber),
        body: req.body.comment
      })

      if (octoRes.status !== 201) {
        throw new Error({status: octoRes.status})
      }

      res.status(201).end()
    } catch (error) {
      console.log(error)
      res.status(404).end()
    }
  }

  closeIssue = async (req, res, next) => {
    const octoURL = `/repos/1dv023/mo223dg-examination-3/issues/${req.body.issueNumber}`
    
    try {
      const octoRes = await octokit.request(`PATCH ${octoURL}`, {
        owner: '1dv023',
        repo: 'mo223dg-examination-3',
        issue_number: parseInt(req.body.issueNumber),
        body: req.body.comment,
        state: 'closed',
        title: 'test2'
      })
  
      console.log(octoRes)
      if (octoRes.status !== 200) {
        throw new Error({status: octoRes.status})
      }
      
      res.status(200).end()
    } catch (error) {
      console.log(error)
      res.status(404).end()
    }
    

  }
}
