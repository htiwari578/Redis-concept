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
        // console.log(name);

        await client.mSet(["user:email", "himanshu@gmail.com", "user-age" , "20" ,"user:country", "india"])
        const [email,age,country] = await client.mGet(["user:email","user-age", "user:country"  ])
        // console.log(email ,age,country);


    // Lists -> LPUSH ,RPUSH, LRANGE, LPOP, RPOP

    await client.lPush('notes',['note 1', 'note 2' , 'note 3']);
    const extractAllNotes = await client.lRange('notes', 0 , -1)
    console.log(extractAllNotes);

    const firstNote = await client.lPop('notes')
    console.log( firstNote);

    const remainingNotes = await client.lRange('notes',0,-1)
    console.log(remainingNotes);

    // Sets -> SADD , SMEMBERS , SISMEMBERS , SREM
    await client.sAdd('user:nickName' ,['john','himanshu','rohit'] )
    const extractUserNckNames = await client.sMembers('user:nickName')
    console.log(extractUserNckNames);

    const isRohitIsOneOfUserNickName= await client.sIsMember('user:nickName', 'rohit')
    console.log( isRohitIsOneOfUserNickName);

    await client.sRem('user:nickName', 'himanshu')
    const getUpdatedUserNickNames =  await client.sMembers('user:nickName')
    console.log(getUpdatedUserNickNames);


    // Sorted sets
    // ZADD ,ZRANGE,ZRANK, ZREM
    await client.zAdd('cart', [
        {
            score : 100 , value : 'Cart 1'
        },
        {
            score : 150 , value : 'Cart 2'
        },
        {
            score : 10 , value : 'Cart 3'
        }
    ])

    const getTopCarItems = await client.zRange('cart', 0, -1);
    console.log(getTopCarItems);

    const extractAllCartItemsWithScore = await client.zRangeWithScores('cart' , 0,-1);
    console.log(extractAllCartItemsWithScore)

    const cartTwoRank = await client.zRank('cart', 'Cart 2')
    console.log(cartTwoRank)
            

    // Hashes -> HSET, HGET, HGETALL , HDEL

    await client.hSet('product:1', {
        name : 'Product 1',
        description : 'product one description',
        rating : '5'
    })

    const getProductRating = await client.hGet('product:1','rating')
    console.log(getProductRating );

    const getProductDetail = await client.hGetAll('product:1')
    console.log(getProductDetail);

    await client.hDel('product:1','rating')
    const updatedProductDetails = await client.hGetAll('product:1')
    console.log(updatedProductDetails);


        
    } catch (error) {
        console.error(error);
    }finally{
        client.quit()
    }
}
redisDataStructures() 