module.exports = {
  apps: [
    {
      name: 'staging:admin-api',
      script: './dist/apps/admin-api/main.js',
      env: {
        PORT: 4100,
        ACCESS_TOKEN_SECRET: '1234',
        REFRESH_TOKEN_SECRET: 'abcd',
      },
    },
    {
      name: 'staging:app-api',
      script: './dist/apps/app-api/main.js',
      env: {
        PORT: 4200,
        ACCESS_TOKEN_SECRET: '3456',
        REFRESH_TOKEN_SECRET: 'dfgh',
      },
    },
  ],
};
