## 프로그래머스 120849번 모음 제거

풀이 언어 : JavaScript

- 문제 해결과정
    - 반환해야 하는 값 : 문자열 my_string이 매개변수로 주어질 때 모음을 제거한 문자열을 return하라
    1. 모음을 정규표현식으로 나타낸다
    2. asnwer에 my_string을 replaceAll을 사용해 모음을 제거해 저장한다.
    3. answer을 반환한다.

풀이 코드 :

```jsx
function solution(my_string) {
    let gather = /[aeiou]/gi;
    let answer = my_string.replaceAll(gather, "");
    return answer;
}
```

이번 문제에선 정규표현식이라는걸 써야했다. 보이는것과 다르게 생각보다 간단했는데, 이에 대한 자세한 설명은 아래에 서술하겠다.

- 새로 알게된점
    - 정규표현식
        
        정규표현식은 "특정 패턴의 문자열"을 찾기 위한 표현 방식이다.
        
        - 사용 예시
        
        ```tsx
        예시 문장 : 백앤드 프론트앤드 개발자 상시 모집 010-1234-5678
        
        /드/ : '드'를 하나만 찾는다.
        => 백앤[드] 프론트앤드 개발자 상시 모집 010-1234-5678
        
        /드/g : '드'를 모두 찾는다.
        => 백앤[드] 프론트앤[드] 개발자 상시 모집 010-1234-5678
        
        /백앤드/ : '백앤드'를 찾는다.
        => [백앤드] 프론트앤드 개발자 상시 모집 010-1234-5678
        
        /백프0/g : '백,프,0'을 모두 찾는다.
        => [백]앤드 [프]론트앤드 개발자 상시 모집 [0]1[0]-1234-5678
        
        /0-9/g : '숫자 1~9'를 모두 찾는다.
        => 백앤드 프론트앤드 개발자 상시 모집 [010]-[1234]-[5678]
        
        /^0-9/g : '숫자 1~9'가 아닌것을 모두 찾는다.
        => [백앤드 프론트앤드 개발자 상시 모집] 010-1234-5678
        ```
