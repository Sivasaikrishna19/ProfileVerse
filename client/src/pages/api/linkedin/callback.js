import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;


  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const client_id =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID_PROD
      : process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;

  const redirect_uri =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI_PROD
      : process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

  const client_secret =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET_PROD
      : process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET;

    

  try {
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri,
          client_id,
          client_secret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = response.data;


    if (access_token) {
      res.setHeader('Set-Cookie', `linkedin_access_token=${access_token}; Path=/`);
      res.redirect('/linkedin');
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
