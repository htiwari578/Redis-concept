
const redis = require('redis');

const client = redis.createClient({
    host :'localhost',
    port : 6379

})

// event listner
client.on('error', (error)=> 
    console.log('Redis client error')
);

async function testRedisConnection () {
    try {
        await client.connect()
        console.log("Connected to redis")
    } catch (error) {
        console.log(error);
    }finally {
        await client.quit()
    }
}
testRedisConnection()
