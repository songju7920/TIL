//hello 컴포넌트 불러오기
import Hello from "./components/hello";
import React from "react";

function App() {
  return (
    <div>
      {/* 컴포넌트 사용 */}
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;
