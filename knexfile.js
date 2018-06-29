// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/killbase-app'
  },

  production: {
    client: 'pg',
    connection: {
      database: 'postgres://bgwlyxpoqxwwju:8537fb65e6cdabbab8c971873ca054a911dc0b8d2a40b77f9ae4ecd98e41bdd6@ec2-54-83-59-144.compute-1.amazonaws.com:5432/d3ftj1ioqmkoab',
      user:     'edpantzar',
      password: 'password'
    }
  }

};
