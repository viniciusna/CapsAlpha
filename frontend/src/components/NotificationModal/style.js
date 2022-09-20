import Styled from 'styled-components';
export const Notification = Styled.div`
  &{
    max-width: 430px;
    max-height: 200px;
    overflow: hidden;
    padding: 12px 48px 12px 12px;
    z-index: 99;
    font-weight: bold;
    position: relative;
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &.info {
    background-color: #2196f3;
  }

  &.success {
    background-color: #4caf50;
  }

  &.warning {
    background-color: #ff9800;
  }

  &.error {
    background-color: #f44336;
  }

  &,
  &.closeButton {
    color: #fff;
  }

`;
export const CloseButton = Styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
`;

export const Container = Styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
`;
