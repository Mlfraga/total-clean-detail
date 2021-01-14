import { Box, DefaultTheme } from '@chakra-ui/core';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

interface IContainerProps {
  theme: DefaultTheme;
  isErrored: boolean;
}

export const Container = styled(Box)<IContainerProps>`
  --errored-box-shadow: 0 0 0 3px
    ${props => transparentize(0.4, props.theme.colors.red[500])};
  ${props =>
    props.isErrored &&
    css`
      box-shadow: var(--errored-box-shadow);
    `}
`;
