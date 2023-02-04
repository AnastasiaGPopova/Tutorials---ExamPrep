///CHANGE DS NAME !!!!

const config = {
    production: {
        PORT: 1245,
        DB_uri: "mongodb://127.0.0.1:27017/tutorial",
        SECRET: 'SOMEPRODUCTIONSECRET'
    },
    development: {
        PORT: 5000,
        DB_uri: "mongodb://127.0.0.1:27017/tutorial",
        SECRET: 'SOMEDEVSECRET'
    }
}

module.exports = config[process.env.node_ev || 'development']