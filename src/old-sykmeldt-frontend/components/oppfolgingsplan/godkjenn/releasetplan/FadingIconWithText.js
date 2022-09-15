import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { HakeGronnImage } from '@/common/images/imageComponents';

const opacityStates = { entering: '0', entered: '1', exiting: '1', exited: '0' };
const fadeDuration = 1000;
const fadeOutDelay = 4000;

const IconAndText = styled.div`
  margin: 1em 0 0 0;
  display: flex;
`;

const Text = styled.p`
  margin: 0 0.5em;
`;

const Icon = styled.img`
  width: 1.5em;
`;

const FadeAnimation = styled.div`
  transition: opacity ${fadeDuration}ms ease-in-out;
  opacity: ${({ state }) => {
    return opacityStates[state];
  }};
`;

const FadingIconWithText = ({ text }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setShouldShow(true);
    setTimeout(() => {
      setShouldShow(false);
    }, fadeOutDelay);
  }, []);

  return (
    <Transition appear in={shouldShow} timeout={fadeDuration}>
      {(state) => {
        return (
          <FadeAnimation state={state}>
            <IconAndText>
              <Icon src={HakeGronnImage} alt="" />
              <Text>{text}</Text>
            </IconAndText>
          </FadeAnimation>
        );
      }}
    </Transition>
  );
};

FadingIconWithText.propTypes = {
  text: PropTypes.string,
};

export default FadingIconWithText;
