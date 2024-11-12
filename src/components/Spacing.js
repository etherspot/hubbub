import styled from "styled-components";

const Spacing = styled.div`
  ${({ w }) => w && `width: ${w}px`};
  ${({ h }) => h && `height: ${h}px`};
`;

export default Spacing;
