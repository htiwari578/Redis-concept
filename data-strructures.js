const redis = require('redis');

const client = redis.createClient({
    host :'localhost',
    port : 6379

})

// event listner
client.on('error', (error)=> 
    console.log('Redis client error')
);

async function redisDataStructures() {
    try {
        await client.connect();
        // Strings ->SET,GET,MSET,MGET

        await client.set("user:name", "himanshu tiwari");
        const name = await client.get("user:name");
        console.log(name);

        await client.mSet(["user:email", "himanshu@gmail.com", "user-age" , "20" ,"user:country", "india"])
        const [email,age,country] = await client.mGet(["user:email","user-age", "user:country"  ])
        console.log(email ,age,country);


    // Lists -> LPUSH ,RPUSH, LRANGE, LPOP, RPOP

    await client.lPush('notes',['note 1', 'note 2' , 'note 3' , 'note 4']);
    const extractAllNotes = await client.lRange('notes', 0 , -1)
    console.log(extractAllNotes);
        
        
    } catch (error) {
        console.error(error);
    }finally{
        client.quit()
    }
}
redisDataStructures() 