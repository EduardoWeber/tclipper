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


export const getClip = async (token, clientId, id) => {
  try {
    const url = 'https://api.twitch.tv/helix/clips'
    const config = {
      method: 'get',
      url: url,
      headers: {
        'Client-ID': clientId,
        'Authorization': 'Bearer ' + token
      },
      params: {
        'id': id
      }
    }
    let response = await axios(config)
    console.log(response)
    return response.data
  } catch (err) {
    throw err
  }
}
