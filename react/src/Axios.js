
const config = {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE",
        'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, Remember-Me'
    },
    timeout: 15000,
    auth: {
        username: 'konmeo',
        password: 'konmeo'
    },
    proxy: {
        host: 'localhost',
        port: 3000,
        auth: {
            username: 'konmeo',
            password: 'konmeo'
        }
    }
}
export default config;