# session

## session이란?

<aside>
💡 Session은 사용자가 웹 서버에 접속해 있는 동안 상태를 유지할 수 있도록 하는 기술이다.

</aside>

Session은 사용자가 웹 서버에 접속해 있는 동안 상태를 유지할 수 있도록 하는 기술이다.

session은 key-value로 이루어진 데이터로  데이터들을 서버에 남겨두고 브라우저에는 key값만을 남겨 둠으로써 필요할 때 마다 브라우저가 가져오는 방식으로 작동한다.

## session의 동작원리

![https://youhavetosleep.dev/static/165cc0dae6c870f113dcf191ea853211/0ede0/session-1.jpg](https://youhavetosleep.dev/static/165cc0dae6c870f113dcf191ea853211/0ede0/session-1.jpg)

1. 브라우저에서 input태그를 이용해 ID와 Password를 server에 보낸다.
2. ID, Password가 DB에 있는 값과 일치한다면, 세션을 생성하고 생성된 
세션을 서버 메모리에 저장한다.
3. sessionID를 쿠키에 담아 전달한다.
4. 요청 시 sessionID를 담아서 req를 보낸다
5. sessionID를 사용하여 세션을 식별한다
6. 필요하다면 res를 client에 보낸다.

## Node.js에서의 session 사용

- 세션 설정 (app.js)
    
    ```jsx
    app.use(
      expressSession({
    		// session 데이터 암호화시 사용할 키
        secret: "my key",
    		// 세션 값이 변경되지 않더라도 다시 저장할지 여부
        resave: true,
    		// 초기화되지 않은 세션데이터를 저장할지 여부
        saveUninitialized: true,
      })
    );
    ```
    
- 세션 생성
    
    ```jsx
    req.session.user = {
    	key: value
    };
    ```
    
- 세션 삭제
    
    ```jsx
    req.session.destroy((err) => {
    	if (err) {
    	  console.log("세션 삭제시에 에러가 발생했습니다.");
        throw new ERROR(err.message);
      }
    	  console.log("세션이 삭제됐습니다.");
    });
    ```
    

## session 과 cookie의 차이점

| session | cookie |
| --- | --- |
| 서버에 데이터 저장 | 브라우저에 데이터 저장 |
| 서버 자원(저장 공간) 사용 | 서버 자원을 사용하지 않음 |
| 비교적 서버 부화가 높음 | 상대적으로 낮 |
| 보안적으로 훌륭하다 | 전송 과정 중 스니핑 당할 
가능성이 있다. |
| 브라우저 종료 시 즉시 삭제된다 | 브라우저 종료와 관계없이  
만료 시간에 따라 삭제된다 |