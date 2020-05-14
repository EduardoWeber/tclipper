const axios = require('axios')

export const getToken = async (clientId, clientSecret, grantType = 'client_credentials', scope = '') => {
    try {
      const url = 'https://id.twitch.tv/oauth2/token'
      const config = {
        method: 'post',
        url: url,
        params: {
          'client_id': clientId,
          'client_secret': clientSecret,
          'grant_type': grantType,
          'scope': scope
        }
      }
      let response = await axios(config)
      return response.data
    } catch (err) {
      throw err
    }
  }
  