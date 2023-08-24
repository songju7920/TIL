# cookie

## Cookie란?

cookie는 사용자가 브라우저에 보내는 데이터 조각으로, 브라우저는 사용자가 보낸 쿠키 값들을 보관하다 동일한 서버에서 재요청 시 쿠키를 같이 포함하여 보낸다. 

쿠키는 보통 다음 3가지 상황에 사용된다.

- 세션관리(로그인, 장바구니 등 서버에 저장하거나 인증할 때 필요한 정보)
- 개인설정(태마, 즐겨찾기등 사용자가 개인적으로 저장한 정보)
- 트래킹(사용자 행동을 기록하고 분석하는 용도)

## Express에서의 Cookie 사용

- cookie parser 설정(app.js)
    
    ```jsx
    app.use(cookieParser());
    ```
    
- cookie 받기
    
    ```jsx
    const cookie = req.cookies.cookieName
    ```
    
- cookie 생성
    
    ```jsx
    res.cookie("cookieName", cookieValue)
    ```
    
- cookie 삭제
    
    ```jsx
    res.clearCookie("cookieName")
    ```
    

## Cookie vs Web Storage

쿠키와 웹 스토리지의 차이점은 다음과 같다.

- 쿠키는 시간제한, 갯수제한이 있는 반면 web storage는 제한이 없다
- 쿠키는 시간 제한 설정이 가능한 반면 web storage는 불가능하다
- 쿠키는 저장되어있는 쿠키 모두를 의무적으로 서버에 전달해야하므로 http통신에 큰 부화를 주는 반면, web storage는 선택하여 전송이 가능하기 때문에 비교적 적은 부화를 준다.
- 쿠키는 자신의 변화를 감지할 수 없지만, web storage는 이밴트로 감지할 수 있다.
- 웹 스토리지는 5MB, 쿠키는 4MB저장할 수 있다
- 쿠키는 문자열만 저장 가능하지만, web storage는 javaScript 객체 저장이 가능하다
- 쿠키는 같은 브라우저면 모두 같은 세션이라고 간주하지만, web storage는 같은 브라우저일지라도 다른 탭이면 다른 세션이라고 간주한다.
- web storage는 쿠키에 비해 유지 보수가 힘들다.