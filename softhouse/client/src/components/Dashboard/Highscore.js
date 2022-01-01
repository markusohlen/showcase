/**
 * The highscore component.
 *
 * @version 1.0.0
 */

import '../../styles/highscore.css'
import { useEffect, useState } from 'react'

const data = {
  "statusCode": 200,
  "body": {
      "Items": [
          {
              "score": 62,
              "date": "2021-11-19T09:26:22.554Z",
              "username": "john",
              "id": "b04ef96e-e2aa-4d9d-bcd3-6511c45f4fdd"
          },
          {
              "score": 148,
              "date": "2021-12-03T12:38:26.993Z",
              "username": "john",
              "id": "96793663-6ebc-4178-a737-0c8fca68ef37"
          },
          {
              "score": 11,
              "date": "2021-10-20T07:14:50.962Z",
              "username": "john",
              "id": "4d110f0e-54ff-489e-bc59-5026f23e8170"
          },
          {
              "score": 45,
              "date": "2021-11-19T10:33:54.984Z",
              "username": "john",
              "id": "d07c2e04-b9fe-463b-889d-50c175b31da7"
          },
          {
              "score": 48,
              "username": "test",
              "id": "cd66abb0-e355-45c0-ad54-8d19ab40c0c7"
          },
          {
              "score": 53,
              "date": "2021-11-02T09:05:25.964Z",
              "username": "rohit",
              "id": "912335b6-86d6-4f8c-aaaf-bf16fbbb6319"
          },
          {
              "score": 365,
              "date": "2021-10-29T10:57:19.229Z",
              "username": "rohit",
              "id": "e08c1c6e-4407-4e73-9a56-e4cba69b0459"
          },
          {
              "score": 87,
              "date": "2021-11-03T08:46:20.016Z",
              "username": "rohit",
              "id": "75f14cad-357f-484f-ab67-2e002456bcbb"
          },
          {
              "score": 39,
              "date": "2021-12-03T12:43:58.570Z",
              "username": "john",
              "id": "6ca9e8fa-513a-4a15-a863-53842b34c401"
          },
          {
              "score": 40,
              "date": "2021-11-01T09:35:32.590Z",
              "username": "john",
              "id": "13ecd112-4d2e-4103-a69d-0acc90caabc0"
          },
          {
              "score": 12,
              "date": "2021-10-19T11:35:06.643Z",
              "username": "john",
              "id": "79b13cc4-465a-462d-bcb3-7eascd16a7eca"
          },
          {
              "score": 28,
              "date": "2021-12-03T12:45:48.946Z",
              "username": "john",
              "id": "4ef82d17-db3b-4efb-b58d-7fbb563777d7"
          },
          {
              "score": 35,
              "date": "2021-10-19T09:35:06.643Z",
              "username": "john",
              "id": "79b13cc4-465a-462d-bcb3-7ed6e16a7eca"
          },
          {
              "score": 101,
              "date": "2021-11-01T12:52:02.327Z",
              "username": "rohit",
              "id": "a385caf4-9ca0-4f4f-afb6-61cc73b87dcf"
          },
          {
              "score": 41,
              "date": "2021-11-01T12:55:12.997Z",
              "username": "rohit",
              "id": "1215a797-2821-4f40-a711-99964ba08335"
          },
          {
              "score": 197,
              "date": "2021-11-02T09:56:01.012Z",
              "username": "rohit",
              "id": "55ef113f-0854-476a-8492-0a067c4fe82f"
          },
          {
              "score": 50,
              "date": "2021-10-20T07:35:06.643Z",
              "username": "john",
              "id": "79b13cc4-465a-462d-bcb3-7ed6e16a7123"
          },
          {
              "score": 47,
              "date": "2021-12-03T14:39:28.927Z",
              "username": "john",
              "id": "f7fbdb5f-b671-49f5-aeb7-1d98212c8b2e"
          },
          {
              "score": 53,
              "date": "2021-11-01T12:42:30.112Z",
              "username": "rohit",
              "id": "3efe5f2b-9ce0-4b1c-ba8e-28314638d1e9"
          },
          {
              "score": 22,
              "date": "2021-12-08T12:44:27.801Z",
              "username": "john",
              "id": "ac29ceb9-a608-44ef-82db-188899cfbd7a"
          },
          {
              "score": 184,
              "date": "2021-11-02T09:11:57.043Z",
              "username": "rohit",
              "id": "7ba59e7c-5093-41c5-aa8d-f1c2a8564f34"
          },
          {
              "score": 200,
              "date": "2021-10-20T07:31:06.643Z",
              "username": "john",
              "id": "79b13cc4-465a-462d-bcb3-7ed7e16a7123"
          },
          {
              "score": 90,
              "date": "2021-10-29T10:46:41.639Z",
              "username": "rohit",
              "id": "718b2ffa-c1c2-4a7c-ad0b-c3c62d740aa8"
          },
          {
              "score": 250,
              "date": "2021-11-02T09:10:49.971Z",
              "username": "jack",
              "id": "fa2e8f0c-905f-4bbc-8967-5b7c51ddb43e"
          }
      ],
      "Count": 24,
      "ScannedCount": 24
  },
  "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
  }
}

function Highscore() {
  const [highscores, setHighscores] = useState([])

  /**
   * Fetches the best 10 highscores from the database the first time components renders.
   */
  useEffect(() => {
    const sortedHighscores = data.body.Items.sort(
      (a, b) => b.score - a.score
    ).slice(0, 10)

    setHighscores(sortedHighscores)
  }, [])

  return (
    <div className="highscore-container">
      <h1 className="highscore-header">Highscore</h1>
      <ol className="highscore-list">
        {highscores.map((highscore, index) => {
          return (
            <li key={index}>
              {highscore.username} <span>{highscore.score}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Highscore
