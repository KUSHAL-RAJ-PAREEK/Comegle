import React from 'react';
import styled, { keyframes } from 'styled-components';

// Zoom expand animation on outer wrapper
const zoomExpand = keyframes`
    to {
        transform: scale(20); /* Zoom big */
    }
`;

const Loader = () => {
    return (
        <OuterWrapper>
            <StyledWrapper>
                <div className="container">
                    <div className="loader">
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                    </div>
                </div>
            </StyledWrapper>
        </OuterWrapper>
    );
};

const OuterWrapper = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    overflow: hidden;
    z-index: 9999;

    animation: ${zoomExpand} 2s ease forwards 2s; /* 2s delay, 2s duration */
    transform-origin: center center;
`;

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .loader {
    position: relative;
    width: 200px;
    height: 200px;
    perspective: 800px;
    z-index: 10;
  }

  .crystal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    opacity: 0;
    transform-origin: bottom center;
    transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
    animation:
      spin 4s linear infinite,
      emerge 2s ease-in-out infinite alternate,
      fadeIn 0.3s ease-out forwards;
    border-radius: 10px;
    visibility: hidden;
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotateX(45deg) rotateZ(360deg);
    }
  }

  @keyframes emerge {
    0%, 100% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    to {
      visibility: visible;
      opacity: 0.8;
    }
  }

  .crystal:nth-child(1) {
    background: linear-gradient(45deg, #7f3300, #cc6600);
    animation-delay: 0s;
  }

  .crystal:nth-child(2) {
    background: linear-gradient(45deg, #993d00, #e67300);
    animation-delay: 0.3s;
  }

  .crystal:nth-child(3) {
    background: linear-gradient(45deg, #b34700, #ff8000);
    animation-delay: 0.6s;
  }

  .crystal:nth-child(4) {
    background: linear-gradient(45deg, #cc5200, #ff9933);
    animation-delay: 0.9s;
  }

  .crystal:nth-child(5) {
    background: linear-gradient(45deg, #e65c00, #ffb366);
    animation-delay: 1.2s;
  }

  .crystal:nth-child(6) {
    background: linear-gradient(45deg, #ff6600, #ffd1a3);
    animation-delay: 1.5s;
  }
`;

export default Loader;
