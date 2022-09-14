const mongoose = require('mongoose');

const getConnection = async () => {

    try{
        const url = 'mongodb://user_bd:xUJ2TxwvdAMd2ymy@ac-jgcsued-shard-00-00.vesb2uk.mongodb.net:27017,ac-jgcsued-shard-00-01.vesb2uk.mongodb.net:27017,ac-jgcsued-shard-00-02.vesb2uk.mongodb.net:27017/inventarios-g?ssl=true&replicaSet=atlas-awaaoy-shard-0&authSource=admin&retryWrites=true&w=majority'

        await mongoose.connect(url);
    
        console.log('conexión exitosa');

    }catch (error) {
        console.log(error);
    }

}

module.exports = {
    getConnection,
}