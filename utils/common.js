/**
 * Function to generate the access token.
 * @returns {Promise<string|null>} A promise that resolves with the access token or null in case of an error.
 */
export async function generateAccessToken() {
          const clientId = Cypress.env('STRAVA_CLIENT_ID');
          const clientSecret = Cypress.env('STRAVA_CLIENT_SECRET');
          const refreshToken = Cypress.env('STRAVA_REFRESH_TOKEN');

          const tokenUrl = 'https://www.strava.com/api/v3/oauth/token';
          const payload = {
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
          };

          try {
                    const response = await cy.request(
                              'POST',
                              tokenUrl,
                              payload
                    );

                    if (response.status === 200) {
                              const tokenData = response.body;
                              const accessToken = tokenData.access_token;
                              // console.log('Novo token de acesso:', accessToken);
                              return accessToken;
                    } else {
                              console.error(
                                        'Failed to generate access token:',
                                        response
                              );
                              return null;
                    }
          } catch (error) {
                    console.error('Failed to generate access token:', error);
                    return null;
          }
}

/**
 * Function to make an API request.
 * @param {string} endpoint - The API endpoint.
 * @param {string} [method='GET'] - The HTTP method of the request.
 * @param {object} [data=null] - The request data for POST or PUT method.
 * @returns {Promise<Response>} A promise that resolves with the response of the request.
 */
export function makeApiRequest(endpoint, method = 'GET', data = null) {
          // Use cy.wrap para envolver a promise retornada pela função generateAccessToken
          return cy.wrap(generateAccessToken()).then((accessToken) => {
                    const url = `https://www.strava.com/api/v3/${endpoint}`;

                    let request;
                    switch (method) {
                              case 'GET':
                                        request = cy.request({
                                                  method: 'GET',
                                                  url: url,
                                                  headers: {
                                                            Authorization: `Bearer ${accessToken}`,
                                                            'Content-Type':
                                                                      'application/json',
                                                  },
                                                  failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
                                        });
                                        break;
                              case 'POST':
                                        request = cy.request({
                                                  method: 'POST',
                                                  url: url,
                                                  headers: {
                                                            Authorization: `Bearer ${accessToken}`,
                                                            'Content-Type':
                                                                      'application/json',
                                                  },
                                                  body: JSON.stringify(data),
                                        });
                                        break;
                              case 'PUT':
                                        request = cy.request({
                                                  method: 'PUT',
                                                  url: url,
                                                  headers: {
                                                            Authorization: `Bearer ${accessToken}`,
                                                            'Content-Type':
                                                                      'application/json',
                                                  },
                                                  body: JSON.stringify(data),
                                        });
                                        break;

                              default:
                                        throw new Error(
                                                  `Unsupported HTTP method: ${method}`
                                        );
                    }

                    return request;
          });
}
