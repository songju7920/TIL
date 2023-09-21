//hello 컴포넌트 불러오기
import Example from "./components/example";
import Hello from "./components/hello";
import React from "react";

function App() {
  return (
    <div>
      {/* 컴포넌트 사용 */}
      <Hello />
      <Hello />
      <Hello title="World!"/>
      <Example/>     
    </div>
  );
}

export default App;
