import { Col, Table, Typography } from 'antd';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  padding: 10px 30px;

  .ant-table-pagination {
    display: none;
  }
`;

export const StyledText = styled(Typography.Text)`
  font-size: 0.6rem;
`;

export const StyledColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
