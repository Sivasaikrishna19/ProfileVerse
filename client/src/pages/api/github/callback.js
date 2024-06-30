// src/pages/api/github/callback.js
import axios from 'axios';

export default async function handler(req, res) {
  console.log('point 2')
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }
  const redirect_uri =
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_PROD_URL}/api/github/callback`
      : `${process.env.NEXT_PUBLIC_DEV_URL}/api/github/callback`;
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id:process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirect_uri ,
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
      res.status(400).json({ error: 'Failed to obtain access token!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
