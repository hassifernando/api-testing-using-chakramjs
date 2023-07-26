import { makeApiRequest } from '../../utils/common';

describe('Athlete Endpoint', () => {
          it('should return a 200 (OK) response code', () => {
                    makeApiRequest('athlete').then((response) => {
                              expect(response.status).to.equal(200);
                    });
          });

          xit('Should have the expected fields in the response', () => {
                    // Faz a requisição GET usando a função makeApiRequest
                    makeApiRequest('athlete', 'GET').then((response) => {
                              // Verifica se a requisição foi bem-sucedida
                              expect(response.status).to.equal(200);

                              // Define os campos esperados na resposta
                              const expectedFields = [
                                        'id',
                                        'username',
                                        'resource_state',
                                        'firstname',
                                        'lastname',
                                        'bio',
                                        'city',
                                        'state',
                                        'country',
                                        'sex',
                                        'premium',
                                        'summit',
                                        'created_at',
                                        'updated_at',
                                        'badge_type_id',
                                        'weight',
                                        'profile_medium',
                                        'profile',
                                        'friend',
                                        'follower',
                              ];

                              // Obtém os dados da resposta da API
                              const responseData = response.body;

                              // Verifica se cada campo esperado está presente na resposta
                              for (const field of expectedFields) {
                                        expect(responseData).to.have.property(
                                                  field
                                        );
                              }

                              // Verifica os tipos de dados dos campos
                              expect(typeof responseData.id).to.equal('number');
                              expect(typeof responseData.username).to.equal(
                                        'string'
                              );
                              expect(
                                        typeof responseData.resource_state
                              ).to.equal('number');
                              expect(typeof responseData.firstname).to.equal(
                                        'string'
                              );
                              expect(typeof responseData.lastname).to.equal(
                                        'string'
                              );
                              expect(
                                        responseData.bio === null ||
                                                  typeof responseData.bio ===
                                                            'string'
                              ).to.be.true;
                              expect(typeof responseData.city).to.equal(
                                        'string'
                              );
                              expect(typeof responseData.state).to.equal(
                                        'string'
                              );
                              expect(typeof responseData.country).to.equal(
                                        'string'
                              );
                              expect(typeof responseData.sex).to.equal(
                                        'string'
                              );
                              expect(typeof responseData.premium).to.equal(
                                        'boolean'
                              );
                              expect(typeof responseData.summit).to.equal(
                                        'boolean'
                              );
                              expect(typeof responseData.created_at).to.equal(
                                        'string'
                              );
                              expect(typeof responseData.updated_at).to.equal(
                                        'string'
                              );
                              expect(
                                        typeof responseData.badge_type_id
                              ).to.equal('number');
                              expect(typeof responseData.weight).to.equal(
                                        'number'
                              );
                              expect(
                                        typeof responseData.profile_medium
                              ).to.equal('string');
                              expect(typeof responseData.profile).to.equal(
                                        'string'
                              );
                              expect(
                                        responseData.friend === null ||
                                                  typeof responseData.friend ===
                                                            'string'
                              ).to.be.true;
                              expect(
                                        responseData.follower === null ||
                                                  typeof responseData.follower ===
                                                            'string'
                              ).to.be.true;
                    });
          });

          xit('Should have the expected values for specific fields', () => {
                    // Make a GET request using the function makeApiRequest
                    makeApiRequest('athlete', 'GET').then((response) => {
                              // Verify if the request was successful
                              expect(response.status).to.equal(200);

                              // Get the response data from the API
                              const responseData = response.body;

                              // Check specific field values
                              const expectedUsername =
                                        Cypress.env('STRAVA_USERNAME');
                              const expectedCity = Cypress.env('STRAVA_CITY');

                              expect(responseData.username).to.equal(
                                        expectedUsername,
                                        "The value of the 'username' field does not match the expected value"
                              );

                              expect(responseData.city).to.equal(
                                        expectedCity,
                                        "The value of the 'city' field does not match the expected value"
                              );
                    });
          });

          xit('Should return 401 Unauthorized', () => {
                    const url = 'https://www.strava.com/api/v3/athlete';

                    // Make a GET request without passing the 'Authorization' header
                    cy.request({
                              method: 'GET',
                              url: url,
                              failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
                    }).then((response) => {
                              // Verify if the response status is 401 Unauthorized
                              expect(response.status).to.equal(401);
                    });
          });

          xit('Should return 401 Unauthorized with invalid token', () => {
                    const url = 'https://www.strava.com/api/v3/athlete';
                    const headers = {
                              Authorization: 'Bearer invalid token',
                    };

                    // Make a GET request with the invalid token in the headers
                    cy.request({
                              method: 'GET',
                              url: url,
                              headers: {
                                        Authorization: `Bearer invalid`,
                                        'Content-Type': 'application/json',
                              },
                              failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
                    }).then((response) => {
                              // Verify if the response status is 401 Unauthorized
                              expect(response.status).to.equal(401);
                    });
          });

          xit('Should not include sensitive information in the response', () => {
                    // Make a GET request using the function makeApiRequest
                    makeApiRequest('athlete', 'GET').then((response) => {
                              // Verify if the request was successful
                              expect(response.status).to.equal(200);

                              // Get the response data from the API
                              const responseData = response.body;

                              // Check sensitive fields are not present in the response data
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'access_token'
                              );
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'refresh_token'
                              );
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'password'
                              );
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'email'
                              );
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'credit_card'
                              );
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'social_security_number'
                              );
                              cy.wrap(responseData).should(
                                        'not.have.property',
                                        'bank_account_number'
                              );
                    });
          });
});

describe('Athlete/stats Endpoint', () => {
          it('Should return a 200 (OK) response code - athlete stats', () => {
                    // Get the athleteId from Cypress.env()

                    // Make the GET request using the function makeApiRequest
                    makeApiRequest(
                              `athletes/${Cypress.env(
                                        'STRAVA_ATHLETE_ID'
                              )}/stats`,
                              'GET'
                    ).then((response) => {
                              // Verify if the request was successful
                              expect(response.status).to.equal(200);
                    });
          });

          xit('Should return a 404 Not Found response code - nonexistent athlete', () => {
                    // Make the GET request using the function makeApiRequest with a nonexistent athlete ID
                    makeApiRequest(
                              'athletes/01010101010101100101/stats',
                              'GET'
                    ).then((response) => {
                              // Verify if the request returns a 404 status code
                              expect(response.status).to.equal(404);
                    });
          });

          xit('Should have the expected field values in the response', () => {
                    // Make the GET request using the function makeApiRequest with the athlete ID
                    makeApiRequest(`athletes/${athleteId}/stats`, 'GET').then(
                              (response) => {
                                        // Verify if the request was successful
                                        expect(response.status).to.equal(200);

                                        // Get the response data from the API
                                        const data = response.body;

                                        // Check the values of specific fields
                                        cy.wrap(
                                                  data.biggest_ride_distance
                                        ).should('be.gte', 0);

                                        const fields = {
                                                  recent_ride_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                            'achievement_count',
                                                  ],
                                                  recent_run_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                            'achievement_count',
                                                  ],
                                                  recent_swim_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                                  ytd_ride_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                                  ytd_run_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                                  ytd_swim_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                                  all_ride_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                                  all_run_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                                  all_swim_totals: [
                                                            'count',
                                                            'distance',
                                                            'moving_time',
                                                            'elapsed_time',
                                                            'elevation_gain',
                                                  ],
                                        };

                                        for (const [
                                                  field,
                                                  subfields,
                                        ] of Object.entries(fields)) {
                                                  const fieldData = data[field];
                                                  expect(fieldData).to.exist;

                                                  for (const subfield of subfields) {
                                                            expect(
                                                                      fieldData[
                                                                                subfield
                                                                      ]
                                                            ).to.exist;
                                                            expect(
                                                                      typeof fieldData[
                                                                                subfield
                                                                      ]
                                                            ).to.match(
                                                                      /number/
                                                            );
                                                            cy.wrap(
                                                                      fieldData[
                                                                                subfield
                                                                      ]
                                                            ).should(
                                                                      'be.gte',
                                                                      0
                                                            );
                                                  }
                                        }
                              }
                    );
          });

          xit('should not include sensitive information in the response', () => {
                    // Make the GET request using the function makeApiRequest with the athlete ID
                    makeApiRequest(`athletes/${athleteId}/stats`, 'GET').then(
                              (response) => {
                                        // Get the response data from the API
                                        const data = response.body;

                                        // Check for sensitive fields that should not be included in the response
                                        expect(data).to.not.have.property(
                                                  'access_token'
                                        );
                                        expect(data).to.not.have.property(
                                                  'refresh_token'
                                        );
                                        expect(data).to.not.have.property(
                                                  'password'
                                        );
                                        expect(data).to.not.have.property(
                                                  'email'
                                        );
                                        expect(data).to.not.have.property(
                                                  'credit_card'
                                        );
                                        expect(data).to.not.have.property(
                                                  'social_security_number'
                                        );
                                        expect(data).to.not.have.property(
                                                  'bank_account_number'
                                        );
                              }
                    );
          });

          it('Athlete Stats Authorization should return a 401 Unauthorized response code', () => {
                    const url = `https://www.strava.com/api/v3/athletes/${Cypress.env(
                              'STRAVA_ATHLETE_ID'
                    )}/stats`;

                    cy.request({
                              method: 'GET',
                              url: url,
                              failOnStatusCode: false, // Para evitar que o teste falhe se a resposta for diferente de 401
                    }).then((response) => {
                              expect(response.status).to.equal(401);
                    });
          });

          it('Athlete Stats Authentication with Invalid Token', () => {
                    const url = `https://www.strava.com/api/v3/athletes/${Cypress.env(
                              'STRAVA_ATHLETE_ID'
                    )}/stats`;
                    const headers = {
                              Authorization: 'Bearer invalid token',
                    };

                    cy.request({
                              method: 'GET',
                              url: url,
                              headers: headers,
                              failOnStatusCode: false, // Para evitar que o teste falhe se a resposta for diferente de 401
                    }).then((response) => {
                              expect(response.status).to.equal(401);
                    });
          });
});
