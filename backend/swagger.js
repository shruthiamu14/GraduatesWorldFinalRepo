
        const options = {
            definition: {
              openapi: '3.0.0',
              info: {
                title: 'Express API Documentation',
                version: '1.0.0',
                description: 'API documentation for the Express application',
              },
              servers: [
                {
                  url: 'http://localhost:5000',
                },
              ],
              tags: [
                {
                  name: 'Articles',
                  description: 'Operations related to articles',
                },
              ],
              paths: {
                '/api/applicants': {
                  get: {
                    summary: 'Get all applicants',
                    responses: {
                      '200': {
                        description: 'A list of all applicants',
                        content: {
                          'application/json': {
                            schema: {
                              type: 'array',
                              items: {
                                $ref: '#/components/schemas/User',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                '/api/register': {
                  post: {
                    summary: 'Register a new user',
                    requestBody: {
                      required: true,
                      content: {
                        'application/json': {
                          schema: {
                            type: 'object',
                            properties: {
                              username: {
                                type: 'string',
                              },
                              email: {
                                type: 'string',
                              },
                              password: {
                                type: 'string',
                              },
                              phonenumber: {
                                type: 'string',
                              },
                              educationlevel: {
                                type: 'string',
                              },
                              experience: {
                                type: 'number',
                              },
                              specialization: {
                                type: 'string',
                              },
                            },
                          },
                        },
                      },
                  
                    },
                    responses: {
                      '201': {
                        description: 'User registered successfully',
                        content: {
                          'application/json': {
                            schema: {
                              $ref: '#/components/schemas/User',
                            },
                          },
                        },
                      },
                    },
                  },
                },
                '/api/verify_otp': {
                    post: {
                        summary: 'Verify OTP',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            otp: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        responses: {
                            '200': {
                                description: 'Verification successful',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                message: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            '400': {
                                description: 'Invalid OTP',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                error: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '/api/send_otp': {
                    post: {
                        summary: 'Send OTP to Email',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            email: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        responses: {
                            '200': {
                                description: 'Email sent successfully',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                message: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            '400': {
                                description: 'Invalid Credentials',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                error: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            '500': {
                                description: 'Internal Server Error',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                error: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                
                '/api/verify_otp1': {
                    post: {
                        summary: 'Verify OTP (Version 1)',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            otp: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        responses: {
                            '200': {
                                description: 'Verification successful',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                message: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            '400': {
                                description: 'Invalid OTP',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                error: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                
                  '/api/pass_update': {
                    put: {
                      summary: 'Update user password',
                      requestBody: {
                        required: true,
                        content: {
                          'application/json': {
                            schema: {
                              type: 'object',
                              properties: {
                                password: {
                                  type: 'string',
                                },
                              },
                            },
                          },
                        },
                      },
                      responses: {
                        '200': {
                          description: 'Password updated successfully',
                        },
                        '404': {
                          description: 'User not found',
                        },
                        '500': {
                          description: 'Internal Server Error',
                        },
                      },
                    },
                  },
                
                
                '/api/expertRegister': {
                    post: {
                      summary: 'Register a new expert',
                      requestBody: {
                        required: true,
                        content: {
                          'application/json': {
                            schema: {
                              type: 'object',
                              properties: {
                                email: {
                                  type: 'string',
                                },
                                username: {
                                  type: 'string',
                                },
                                phonenumber: {
                                  type: 'string',
                                },
                                experience: {
                                  type: 'number',
                                },
                              },
                            },
                          },
                        },
                      },
                      responses: {
                        '201': {
                          description: 'Expert registered successfully',
                          content: {
                            'application/json': {
                              schema: {
                                $ref: '#/components/schemas/Expert',
                              },
                            },
                          },
                        },
                        '400': {
                          description: 'Email already registered',
                        },
                        '500': {
                          description: 'Internal Server Error',
                        },
                      },
                    },
                  },
                '/api/remove_user': {
                    delete: {
                      summary: 'Remove a user by email',
                      requestBody: {
                        required: true,
                        content: {
                          'application/json': {
                            schema: {
                              type: 'object',
                              properties: {
                                email: {
                                  type: 'string',
                                },
                              },
                            },
                          },
                        },
                      },
                      responses: {
                        '200': {
                          description: 'User removed successfully',
                        },
                        '404': {
                          description: 'No user found with the provided email',
                        },
                        '500': {
                          description: 'Internal Server Error',
                        },
                      },
                    },
                  },
                
              },

              components: {
                schemas: {
                  User: {
                    type: 'object',
                    properties: {
                      username: { type: 'string' },
                      email: { type: 'string' },
                      password: { type: 'string' },
                      phonenumber: { type: 'string' },
                      educationlevel: { type: 'string' },
                      experience: { type: 'number' },
                      specialization: { type: 'string' },
                    },
                  },
                  Expert: {
                    type: 'object',
                    properties: {
                      email: { type: 'string' },
                      username: { type: 'string' },
                      phonenumber: { type: 'string' },
                      experience: { type: 'number' },
                    },
                  },
                },
              },
            },
            apis: ['./server.js'], // Path to the API routes folder or individual route files
          };
          
          module.exports = options;
          

        //   const specs = swaggerJsdoc(options);

        //   module.exports = (app) => {
        //       app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        //   };