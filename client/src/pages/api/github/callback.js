// src/pages/api/github/callback.js
import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }
console.log('point 2')
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: 'Ov23li3wlt1XywFULHLj',
        client_secret: 'b418f36eaa54c851bf54d2cfd70758feeb3f83c3',
        code,
        redirect_uri: 'http://localhost:3000/api/github/callback',
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;
    console.log("Access token", access_token)

    if (access_token) {
      res.setHeader('Set-Cookie', `access_token=${access_token}; Path=/`);
      res.redirect('/github');
    } else {
      res.status(400).json({ error: 'Failed to obtain access token' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
