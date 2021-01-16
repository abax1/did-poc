import React from "react";
import { Transition } from "react-transition-group";

const duration = 800;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { defaultStyle },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

function FadeIn({ children, disabled }) {
  return disabled === true? (
    <div>{children}</div>
  ) : (
    <Transition in={true} appear={true} timeout={duration}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}

FadeIn.defaultProps = {
  disabled: false
};

export default FadeIn;
