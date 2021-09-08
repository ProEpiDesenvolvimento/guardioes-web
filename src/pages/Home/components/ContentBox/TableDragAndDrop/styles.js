import styled from 'styled-components';

export const TableRow = styled.tr`
  background-color: #E5E5E5;
  border: ${props => props.isDragging ? '2px #348eac dashed' : 'none'};
`;

export const Cell = styled.td`
  max-width: ${props => props.isDragging ? 'none' : '500px'};
`;
