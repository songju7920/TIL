- ERD란?

      Entity-Relationship Diagram의 약자로, 개체-관계 다이어그램이다. 즉 데이터베이스의 구조를 도식화하여 표현한것이다.

- 태이블의 구조

  ## orders

  | Key | Column Name | Domain |
  | --- | ----------- | ------ |
  | PK  | OrderID     | INT64  |
  | FK  | ProductID   | INT64  |
  |     | Quantity    | INT64  |
  | FK  | CustumerID  | INT64  |

  - PK : Primer Key (고유키) : 테이블에서 레코드를 고유하게 식별하는 특정 키.
  - FK : Foreign Key (외래키) : 다른 테이블의 고유키를 참조해 온것.
  - Order : Table name (테이블 제목)
  - Domain : Data Type (데이터 형식)
