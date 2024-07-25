import axios from 'axios';
import { message } from 'antd';

const fetchLinkedInProfileData = async (accessToken: string) => {
  try {
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.data) {
      message.error('Oops! User Profile Data Not Found :(');
      return null;
    }
    return profileResponse.data;
  } catch (error) {
    console.error('Error fetching LinkedIn profile data:', error);
    message.error('Error fetching LinkedIn profile data.');
    return null;
  }
};

export default fetchLinkedInProfileData;
