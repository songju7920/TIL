- ERD란?
  Entity-Relationship Diagram의 약자로, 개체-관계 다이어그램이다. 즉 데이터베이스의 구조를 도식화하여 표현한것이다.
- IE(Information Engineering Notation)이란?
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/31bbfb61-f30c-4057-accc-b5b703215cbe/Untitled.png)
  Identifying : 같은 기본키 공유중
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/913ff146-cba2-43a6-b250-4f5ae839bc37/Untitled.png)
  Non-Identifying : 다른 기본키 사용중
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/593fab93-970c-4bf4-a483-6bf027cc7895/Untitled.png)
- 태이블의 구조
  ## orders
  | Key | Column Name | Domain |
  | --- | ----------- | ------ |
  | PK  | OrderID     | INT64  |
  | FK  | ProductID   | INT64  |
  |     | Quantity    | INT64  |
  | FK  | CustumerID  | INT64  |
  PK : Primer Key (고유키) : 테이블에서 레코드를 고유하게 식별하는 특정 키.
  FK : Foreign Key (외래키) : 다른 테이블의 고유키를 참조해 온것.
  Order : Table name (테이블 제목)
  Domain : Data Type (데이터 형식)
