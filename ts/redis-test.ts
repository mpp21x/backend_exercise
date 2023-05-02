import { log } from '@lib/log';
import redisClient from '@connect/redis';

(async () => {
	log('test');
	// set a key with an expiration time of 5 seconds
	await redisClient.set('key', '1', {
		EX: 10,
	});
	const keys = await redisClient.keys('ke*');
	console.log(keys);
	for (const key of keys) {
		console.log(await redisClient.get(key));
	}

	const result = await redisClient.set('new_key', 'new_value', {
		NX: true,
		EX: 10,
	});
	log(`result : ${result}`);
	console.log(result === 'OK');
	const result2 = await redisClient.set('new_key', 'new_value', {
		NX: true,
		EX: 10,
	});
	log(result2);
	const result3 = await redisClient.set('new_key', 'new_value', {
		EX: 10,
	});
	log(result3);
})();
