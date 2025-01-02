// pub/sub ->

const redis = require ('redis')

const client = redis.createClient ({
    host :'localhost',
    port : 6379
})

// event listner
client.on('error', (error)=> 
    console.log('Redis client error')
);


async function testAdditionalFeatures() {
    try {
        await client.connect()

        // const subscriber = client.duplicate() //create a new client -> shares the same connection
        // await subscriber.connect() // connect to redis server for the subscriber

        // await subscriber.subscribe('dummy-channel',(message,channel) =>{
        //     console.log(`Recived message from ${channel} : ${message}`)
        // })
        // // publish message to dummy channel 
        // await client.publish('dummy-channel', 'Some dummy data from publisher')
        // await client.publish('dummy-channel', 'Some new message again from publisher')

        // await new Promise((resolve) => setTimeout(resolve, 1000))

        // await subscriber.unsubscribe('dummy-channel')
        // await subscriber.quit() // close the subscriber connection

        // pipelining and transaction

        const multi = client.multi();

        multi.set('key-transaction1', 'value1')
        multi.set('key-transaction2', 'value2')
        multi.get('key-transaction1')
        multi.get('key-transaction2')

        const results = await multi.exec()
        console.log(results)


        const pipeline = client.multi();
        
        multi.set('key-pipeline1', 'value1')
        multi.set('key-pipeline2', 'value2')
        multi.get('key-pipeline1')
        multi.get('key-pipeline2')

        const pipelineResults = await multi.exec()
        console.log( pipelineResults )

    } catch (error) {
        console.log(e);

    }finally{
        client.quit();
    }
}
testAdditionalFeatures()



