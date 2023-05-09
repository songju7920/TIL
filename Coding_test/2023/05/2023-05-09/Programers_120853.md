## 프로그래머스 120853번 **컨트롤 제트**

풀이 언어 : JavaScript

- 문제 해결과정
    - 반환해야 하는 값 : 문자열에 있는 숫자를 차례대로 더한다. 이 때 "Z"가 나오면 바로 전에 더했던 숫자를 뺀다. 숫자와 "Z"로 이루어진 문자열 s가 주어질 때, 값을 return 하라.
    1. 입력받은 배열을 공백 기준으로 나누어 저장한다.
    2. 만약 해당 배열 요소가 Z가 아닐경우엔 Sum변수에 더한다.
    3. 만약 해당 배열 요소가 Z면 Sum변수에 마지막으로 더한수를 뺀다.
    4. sum을 출력한다.

풀이 코드 :

```jsx
function solution(s) {
    let sum = 0, savedNum = 0;
    const numbers = s.split(" ");
    numbers.forEach(num =>{
        if(num == 'Z'){
            sum -= savedNum;
            console.log(sum);
        }
        else if(num != ' '){
            sum += Number(num);
            savedNum = Number(num);
            console.log(sum);
        }
    })
    return sum;
}
```

이번문제는 Z가 입력되면 제일 마지막으로 더해진 수를 빼주는것으로 설계해야 했다. 나는 일단 공백 기준으로 분리해 다른 배열에 저장하고, savedNum에 제일 마지막으로 더한수를 저장해 Z가 입력되면 그 수를 빼주는것으로 설계했다.

- 새로 알게된점
    - split()함수
        
        이 함수는 배열, 문자열, 변수등에서 특정 문자를 기준으로 나누어 저장을 해주는 역할을 한다.
        
        - 사용 예시
        
        ```jsx
        var 전화번호 = "02-123-4567";
        var 가공된_전화번호 = beforeStr.split('-');
        
        가공된_전화번호[0] => "02"
        가공된_전화번호[1] => "123"
        가공된_전화번호[2] => "4765"
        ```
        

.
