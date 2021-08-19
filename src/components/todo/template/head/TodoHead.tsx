import React from "react";
import styled from "styled-components";
import Clock from "components/common/Clock";

const TodoHeadBlock = styled.div`
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
  padding-top: 34px;
`

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  return (
    <>
    <TodoHeadBlock>
      <Clock />
    </TodoHeadBlock>
    </>
  );
};

export default React.memo(TodoHead);
