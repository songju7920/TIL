# Redis

## Redis란?

> Redis는 고성능 Key-Value 저장소로서 String, Set, Sorted Set, List, Hash 등의 자료구조를 지원하는 NoSQL
> 

Redis는 Key-Value쌍으로 데이터를 관리하는 오픈소스 DB로, NoSql(비관계형 데이베이스)구조의 DBMS입니다.

Redis는 인메모리 구조를 가지고 있으며 데이터베이스, 캐시, 메세지 브로커로 주로 사용됩니다.

<aside>
💡 **Learn More : 인 메모리 데이터베이스란?**
인메모리 데이터베이스는 컴퓨터의 주기억장치(RAM)에 모든 조직 또는 개인의 데이터를 저장하는 데이터베이스로, 기본적으로 기존 데이터베이스보다 엄청나 속도가 빠릅니다. 보통 이러한 구조는 자주 접근하는 정보를 저장하거나, 고성능 처리가 필요한 프로젝트에 주로 사용됩니다.

</aside>

## 왜 Redis를 사용할까?

DB가 있는데도, Redis라는 인메모리 데이터 구조 저장소를 사용하는 이유는 결론적으로는 ‘속도를 높히고 DB의 부하를 줄이기 위하여 사용된다’ 입니다.

일반적으로 규모가 작은 서비스의 경우에는 WEB - WAS - DB구조를 사용하여도 문제가 없습니다. 하지만 사용자가 늘어난다면 서버와  DB에 과부하가 걸릴 수 있습니다.

이럴때 해결방안으로 등장한것이 캐시 서버입니다. 캐시서버는 같은 요청이 여러 번 들어올시 데이터베이스를 요청하지 않고 첫번째 요청에서 저장된 값을 바로 사용자에게 주기 때문에 속도가 느려지지 않습니다. (캐시서버에 대한 더 자세한 내용은 따로 작성 예정)

이러한 캐시 서버중 하나가 Redis입니다.

## Redis의 특징

- 영속성을 지원하는 인메모리 데이터 저장소다
- Key, Value구조기 때문에 쿼리가 사용되지 않는다.
- 데이터를 디스크에 쓰는 구조가 아니라 메모리에서 처리하기 때문에 속도가 빠르다
- String, Lists, Sets Sorted Sets, Hashes 자료구조를 지원한다
    - String: 가장 기본적인 Key-Value구조
    - Sets: String의 집합, 여러 개의 값을 하나의 value에 넣을 수 있다.
    - Sorted Sets: 중복된 데이터를 담지 않는 Set 구조에 정렬 Sort를 적용한 구조.
    - Lists: Array 형식의 데이터 구조.
    - Hashes: JS의 객체 형식의 데이 구조
- 싱글 스레드 구조이므로, 한번에 한 작업만 처리 가능하다.

## 사용시 주의점

- 인메모리 데이터 저장소 특성상, 서버 장애시 데이터 유실 가능성이 존재한다
- 싱글 스레드 특성상 한번에 한 작업만 처리 가능하기 때문에 처리하는데 오래걸리는 요청이나 명령은 피해야 한다.

## Redis의 영속성

Redis는 앞서 말했다시피 영속성을 지원한다. 영속성은 데이터를 생성한 프로그램의 실행이 종료되더라도 사라지지 않는 데이터의 특성을 의미합니다. Redis는 영속성을 지원하기 위해 서버가 내려가더라도 디스크에 저장된 데이터를 바탕으로 다시 메모리에 로딩하는 방식을 이용합니다. 데이터를 디스크에 저장하는 방식은 크게 2가지가 있습니다.

- RDB(Snapshotting)
    
    순간적으로 메모리에 있는 내용전체를 디스크에 옮겨 담는 방식
    
- AOF(Append Of File)
    
    Redis의 모든 write/update 연산 자체를 모두 log파일에 기록하는 형태
    

## Redis의 트랜젝션과 RollBack

redis는 RDBMS와 같이 트랜젝션을 지원합니다. Redis 트랜잭션 사용시 queue에 모아두고 한번에 처리합니다.

하지만 redis의 트랜잭션은 RDB와 다르게 명령 실패시 RollBack되지 않습니다. 즉, 원자성을 지원하지 않는다는 겁니다. redis는 실패한 명령을 제외하고 다른 명령들은 모두 실행합니다.

<aside>
⚠️ 주의
Redis는 원자성을 지원합니다. 그저 RDB와의 원자성과 개념이 다른 것 뿐입니다.

Redis의 원자성 —> 하나의 스레드로 동작하며 중간에 다른요청이 들어오지 않음
RDB의 원자성 —> 오류발생시 롤백

</aside>

## Redis사용 예제 (Nest.js)

```tsx
//app.module.ts
import { RedisModule } from '@liaoliaots/nestjs-redis'

RedisModule.forRoot({
	readyLog: true,
	config: {
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT)
		password: process.env.REDIS_PW
	}
})
```

```tsx
import { Redis } from 'ioredis'

constructor(private readonly redis: Redis) {}

//string
await this.redis.set("string", 123);
//list
await this.redis.lpush("list", 1);
//set
await this.redis.sadd("set", 1);
//sorted set
await this redis.zadd("sortedSet", 2, 1);
//hashes
await this.redis.hset("hashes", "key", "value");

//get
const data = await this.redis.get("string");
//delete
const data = await this.redis.del("string");
```