## Stack

정의

> **스택(stack)** 은 제한적으로 접근할 수 있는 나열 구조이다 (후입선출)
> 

스택은 한 쪽 끝에서만 자료를 넣거나 뺄 수 있는 선형 구조(LIFO - Last In First Out)으로 되어 있다. 자료를 넣는 것을 '밀어넣는다' 하여 푸쉬(push)라고 하고 반대로 넣어둔 자료를 꺼내는 것을 팝(pop)이라고 하는데, 이때 꺼내지는 자료는 가장 최근에 푸쉬한 자료부터 나오게 된다. 이처럼 나중에 넣은 값이 먼저 나오는 것을 LIFO 구조라고 한다. 스택에 저장되는 일반적인 데이터는 지역변수, 포인터, 함수 프레임이며, 스택은 프로그래밍에서 함수 호출 순서를 추적하거나, 재귀 함수 호출 중에 임시 데이터를 저장하거나, 실행 취소 및 다시 실행 기능을 구현하거나, 마지막으로 추가된 데이터를 가장 먼저 처리해야 하는 경우 등에 유용하게 사용된다.

> 스택의 구조는 위와 같이 더미처럼 구성되어 있고 **push & pop**을 통해 데이터를 입력 또는 출력 할 수 있다.
> 

스택에서는 아래와 같은 연산이 존재한다.

- S.top()
    
    스택의 가장 윗 데이터를 반환한다. 만약 스택이 비었다면 이 연산은 정의불가 상태이다.
    
- S.pop()
    
    스택의 가장 윗 데이터를 삭제한다. 스택이 비었다면 연산 정의불가 상태.
    
- S.push()
    
    스택의 가장 윗 데이터로 top이 가리키는 자리 위에(top = top + 1) 메모리를 생성, 새로운 데이터를 넣는다.
    
- S.empty()
    
    스택이 비었다면 1을 반환하고,그렇지 않다면 0을 반환한다.
    

C언어서의 stack 구현 :

```c
#include<stdio.h>
#define MAX_STACK_SIZE 100
 
int stack[MAX_STACK_SIZE];
int top=-1;
 
//S.empty()
int IsEmpty(){
    //top이 0보다 작다면 true return
    if(top<0)
        return true;
    //아니라면 false return
    else
        return false;
    }

int IsFull(){
    //top이 99보다 크다면 true return
    if(top>=MAX_STACK_SIZE-1)
        return true;
    //아니라면 false return
    else
        return false;
}
 
//S.push()
void push(int value){
    if(IsFull()==true)
        printf("스택이 가득 찼습니다.");
    else
        stack[++top]=value;
} 
 
//S.pop()
int pop(){
    if(IsEmpty()==true)
        printf("스택이 비었습니다.");
    else 
        return stack[top--];
}
 
int main(){
    
    push(3);
    push(5);
    push(12);
    printf("%d ",pop());//12 출력
    printf("%d ",pop());//5 출력
    printf("%d ",pop());//3 출력
    printf("%d ",pop());//"스택이 비었습니다" 출력
 
    return 0;
}
```

- **발생 가능한 오류**
    - **StackOverFlow(스택 오버플로우)** : Stack이 모두 차있는데, Push요청을 받을때
    - **StackUnderFlow(스택 언더플로우)** : Stack이 비어있는데, Pop요청을 받을때
- **장점과 단점**
    - 장점
        1. 구현이 쉽다.
        2. 데이터 저장 및 접근 시간이 상수 시간(O(1))으로 일정하다.
        3. 후입선출(Last-In-First-Out) 구조로 데이터가 저장되므로, 데이터의 우선순위가 있을 때 우선순위가 높은 데이터를 먼저 처리하는 것이 가능하다.
        4. 재귀 알고리즘에서 사용되어, 알고리즘의 구현과 디버깅을 쉽게 할 수 있다.
    - 단점
        1. 스택의 크기는 고정되어 있다. 따라서, 스택에 저장할 수 있는 데이터의 수가 제한적이다.
        2. 스택에 저장되는 데이터의 크기가 커질 경우, 메모리 사용량이 많아질 수 있다.
        3. 스택에서 데이터를 삭제하거나 추가할 때, 데이터를 이동해야 하는 경우가 있어서 시간이 더 걸릴 수 있다.
        4. 스택의 사용이 잘못될 경우, 스택 오버플로우(Stack Overflow)가 발생할 수 있다.
