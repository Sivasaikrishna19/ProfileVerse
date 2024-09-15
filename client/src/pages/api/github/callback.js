import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const redirect_uri =
    process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_PROD_URL}/api/github/callback`
      : `${process.env.NEXT_PUBLIC_DEV_URL}`;

  const client_id =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PROD
        : process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_DEV;
  const client_secret =
    process.env.NODE_ENV === 'production'
      ? process.env.GITHUB_CLIENT_SECRET_PROD
      : process.env.GITHUB_CLIENT_SECRET_DEV;

  try {
    console.log('Hit!')
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id,
        client_secret,
        code,
        redirect_uri,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;


    if (access_token) {
      res.setHeader('Set-Cookie', `access_token=${access_token}; Path=/`);
      res.redirect('/github');
    } else {
      res.status(400).json({ error: 'Failed to obtain access token!' ,data:{
        redirect_uri:redirect_uri,
        client_id:client_id
      }});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
