import { Col, FloatButton, Row, Table, Typography } from 'antd';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  margin: 40px 60px;
  border-style: solid;
  box-shadow: 8px 7px 25px 1px ${({ theme }) => theme.colors.bright[100]};
  border-width: ${({ theme }) => theme.border.width.sm};
  border-color: ${({ theme }) => theme.colors.bright[100]};
  border-radius: ${({ theme }) => theme.border.radius.md};
  overflow: hidden;

  .ant-table-pagination {
    display: none;
  }

  thead > tr > .ant-table-cell {
    padding-left: 40px;
    border-bottom-style: solid;
    border-bottom-width: ${({ theme }) => theme.colors.bright[100]};
    border-bottom-color: ${({ theme }) => theme.colors.bright[100]};
  }

  tbody > tr > td {
    cursor: pointer;
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

export const StyledConditionRow = styled(Row)`
  height: 100%;
`;

export const StyledFloatBtn = styled(FloatButton)`
  z-index: 400;
  border: 1px solid;
`;
