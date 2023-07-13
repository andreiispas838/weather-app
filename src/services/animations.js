export const getAnimationKeyframes = (percentage) => {
  if (percentage >= 75) {
    // Define animation for high percentage
    return `
      @keyframes shakeAnimation {
        0% {
          transform: translateX(0);
        }
        20% {
          transform: translateX(-5px);
        }
        40% {
          transform: translateX(5px);
        }
        60% {
          transform: translateX(-5px);
        }
        80% {
          transform: translateX(5px);
        }
        100% {
          transform: translateX(0);
        }
      }
    `;
  } else if (percentage >= 50) {
    // Define animation for medium percentage
    return `
      @keyframes trembleAnimation {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(-3px);
        }
        50% {
          transform: translateY(3px);
        }
        75% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    `;
  } else {
    // Define animation for low percentage
    return `
      @keyframes jumpAnimation {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    `;
  }
};

