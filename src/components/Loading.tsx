import { Spin } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 79vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading: React.FC = () => {
  return (
    <StyledWrapper>
      <Spin size="large" />
    </StyledWrapper>
  );
};

export default Loading;
