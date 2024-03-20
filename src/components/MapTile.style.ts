import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  width: 400px !important;

  /* .ant-modal-content {
    height: 120px !important;
  } */

  .ant-modal-body {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 16px;
  }

  .ant-modal-footer {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
  }

  .ant-btn {
    width: 76px;
  }
`;
