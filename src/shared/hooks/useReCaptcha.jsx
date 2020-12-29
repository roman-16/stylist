import React, { useCallback, useEffect, useRef } from 'react';
import { randomId } from '@helpers';

export default ({ onChange, onExpired, onError } = {}) => {
  const recaptchaRef = useRef();
  const functionNames = useRef({
    scriptLoad: `recaptchaScriptLoad${randomId.number()}`,
    callback: `recaptchaCallback${randomId.number()}`,
    expiredCallback: `recaptchaExpiredCallback${randomId.number()}`,
    errorCallback: `recaptchaErrorCallback${randomId.number()}`,
  });
  const executeListener = useRef();
  const execute = () =>
    new Promise((resolve) => {
      executeListener.current = resolve;

      window.grecaptcha.execute();
    });

  useEffect(() => {
    window[functionNames.current.scriptLoad] = () =>
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: '6LemZNYZAAAAAGMjeyPNbQS8ul1GK5mB_HydjSJI',
        badge: 'inline',
        size: 'invisible',
        callback: functionNames.current.callback,
        'expired-callback': functionNames.current.expiredCallback,
        'error-callback': functionNames.current.errorCallback,
      });
    window[functionNames.current.callback] = (token) => {
      if (executeListener.current) {
        executeListener.current(token);
        executeListener.current = undefined;
      }

      onChange?.(token);
    };
    window[functionNames.current.expiredCallback] = onExpired;
    // eslint-disable-next-line no-console
    window[functionNames.current.errorCallback] = onError ?? console.error;
  }, [onChange, onExpired, onError]);

  useEffect(() => {
    const recaptchaScript = document.createElement('script');

    recaptchaScript.src = `
      https://www.google.com/recaptcha/api.js?onload=${functionNames.current.scriptLoad}&render=explicit
    `;
    recaptchaScript.async = true;
    recaptchaScript.defer = true;

    document.head.appendChild(recaptchaScript);
  }, []);

  return [useCallback(execute, []), useCallback(({ ...props }) => <div ref={recaptchaRef} {...props} />, [])];
};
