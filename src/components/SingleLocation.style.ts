import { Card, Col, Divider, Row, Typography } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  margin: 80px 60px;
  border-color: ${({ theme }) => theme.colors.bright[100]};
  box-shadow: 8px 7px 25px 1px ${({ theme }) => theme.colors.bright[100]};

  .ant-card-actions > li > span:hover {
    color: unset;
  }
`;

export const StyledActionWrapper = styled(Col)`
  gap: 14px;
  display: flex;
  flex-direction: column;
  cursor: default;
  padding: 10px 0px 30px;
`;

export const StyledNoMarginTitle = styled(Typography.Title)`
  margin: 0 !important;
`;

export const StyledDivider = styled(Divider)`
  height: unset;
`;

export const StyledConditionsWrapper = styled(Col)`
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

export const StyledConditionsHeader = styled(Row)`
  color: ${({ theme }) => theme.colors.bright[100]};
`;
