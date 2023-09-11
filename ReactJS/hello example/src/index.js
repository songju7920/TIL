import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//root로 public/index를 선택중
const root = ReactDOM.createRoot(document.getElementById("root"));

//브라우저에 있는 실제 Dom에 리엑트 컴포넌트를 랜더링 하겠다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); //위 내용들을 종합해 봤을때, public폴더의 index.html이 실제로 브라우저에 띄어지는 문서임.

// console.log를 함수로 넣어주게 된다면 퍼포먼스 시간 (성능)을 객체 형태로 개발자 창에 띄워 준다.
reportWebVitals(/*console.log*/);

/* 
  성능 측정 객체의 형식:
  name: '';       측정 도구
  value: number;  성능(작을수록 빠름)
  delta: number;  최신 측정값과 현재 측정값과의 차이,
  id: string;     특정 측정도구를 나타대는 유니크한 ID 값으로, 중복되는 값들을 관리할때 사용
  entries: ()[];  계산된 측정값들의 내용들이 배열로 나열됨
*/
