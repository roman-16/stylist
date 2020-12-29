import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslations } from '@shared/hooks';
import StickyDialog from './StickyDialog';
import { Button } from './shared';
import Feedback from './Feedback';
import ThankYou from './ThankYou';

const zIndex = 1000000000;

const OpenButton = styled(Button)`
  transform: rotate(-90deg);
  transform-origin: bottom right;
  width: 100px;
  height: 30px;
  position: fixed;
  top: 30%;
  right: 0;
  z-index: ${zIndex};
`;

const StyledDialog = styled(StickyDialog)`
  padding: 20px;
  margin: 10px;
  /* max width and width to keep the length of the container */
  max-width: 355px;
  width: calc(100% - 20px);
  background-color: white;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 16%);
  z-index: ${zIndex + 1};

  opacity: 0;
  visibility: hidden;
  ${(props) =>
    props.show &&
    `
      opacity: 1;
      visibility: visible;
    `}
  transition: opacity 0.5s, visibility 0.5s;

  ${(props) => props.theme.mediaQueries.medium} {
    margin: 0;
  }
`;

export default ({ ...props }) => {
  const { translations } = useTranslations('pdpFeedbackForm');
  const [showOpenButton, setShowOpenButton] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  return (
    <>
      {showOpenButton && (
        <OpenButton
          onClick={() => {
            // Hide button after it has been clicked
            setShowOpenButton(false);
            setShowDialog(true);
          }}
          {...props}
        >
          {translations.openFeedbackButton}
        </OpenButton>
      )}

      <StyledDialog
        onClose={() => {
          setShowDialog(false);
          // Let the close animation complete, before showing the button
          showFeedback && setTimeout(() => setShowOpenButton(true), 500);
        }}
        show={showDialog}
      >
        {showFeedback ? (
          <Feedback
            onSend={() => {
              setShowFeedback(false);

              // Hide dialog after 3 seconds timeout
              setTimeout(() => {
                setShowDialog(false);
              }, 3000);
            }}
          />
        ) : (
          <ThankYou onClick={() => setShowDialog(false)} />
        )}
      </StyledDialog>
    </>
  );
};
