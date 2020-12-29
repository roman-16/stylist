import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useMountedState } from 'react-use';
import { useContext } from '@shared/hooks';
import mutation from './mutation.graphql';

export default () => {
  const isMounted = useMountedState();
  const { device, api } = useContext();
  const timeout = useRef();
  const lastFeedback = useRef();
  // Is needed so that a new request starts when the old mutation completes
  const [mutationRef, setMutationRef] = useState();
  const [addFeedback, { data, loading }] = useMutation(mutation, {
    onCompleted: () => {
      // Update the mutationRef to trigger a new request
      isMounted() && setMutationRef(Symbol(''));
    },
  });
  const sendFeedback = useCallback(
    (feedback) => {
      addFeedback({
        variables: {
          input: {
            cursor: data ? data.addPDPFeedback.feedback.cursor : undefined,
            happiness: feedback.happiness ? feedback.happiness : undefined,
            feedback: feedback.feedback ? feedback.feedback : undefined,
            device: device.toUpperCase(),
            productId: `${api.dataLayer.detail['product-id']}___${api.dataLayer.detail['brand-color-code']}`,
          },
        },
      });
    },
    [addFeedback, api.dataLayer.detail, data, device],
  );

  // Send last feedback if defined
  // mutationRef is needed to check if the mutation has been completed
  useEffect(() => {
    if (!lastFeedback.current) return;

    sendFeedback(lastFeedback.current);

    lastFeedback.current = undefined;
  }, [mutationRef, sendFeedback]);

  return (feedback) => {
    if (loading) {
      // Save last feedback for a later request
      lastFeedback.current = feedback;

      return;
    }

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      sendFeedback(feedback);
    }, 500);
  };
};
