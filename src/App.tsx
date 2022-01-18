import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Box1 = styled(motion.div)`
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box2 = styled(motion.div)`
  width: 300px;
  height: 100px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: absolute;
  top: 20px;
`;

const Svg = styled(motion.svg)`
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svgVariants = {
  initial: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  animate: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
  exit: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },

  initialBox: { opacity: 0 },
  animateBox: { opacity: 1 },
  exitBox: { opacity: 0 },
};

const boxSlideVar = {
  initial: (isBack: Boolean) => {
    return {
      opacity: 0,
      scale: 0,
      x: isBack ? -500 : 500,
    };
  },
  animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  exit: (isBack: Boolean) => {
    return {
      x: isBack ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 1 },
    };
  },
};

// const Circle = styled(motion.div)`
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   background-color: white;
//   place-self: center;
// `;

// const BoxVariants = {
//   start: {
//     scale: 0,
//   },
//   end: {
//     scale: 1,
//     transition: {
//       type: "spring",
//       duration: 0.3,
//       delayChildren: 0.25,
//       staggerChildren: 0.2,
//     },
//   },
// };

// const CircleVariants = {
//   start: {
//     opacity: 0,
//     y: 10,
//   },
//   end: {
//     y: 0,
//     opacity: 1,
//   },
// };

function App() {
  const x = useMotionValue(0);

  const scale = useTransform(x, [-400, 400], [2, 0.1]);
  const bgColor = useTransform(
    x,
    [-400, 0, 400],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  // const { scrollYProgress } = useViewportScroll();
  // return <motion.div style={{ scaleX: scrollYProgress }} />

  const [clicked, setClicked] = useState(false);
  const toggleShowing = () => {
    setClicked((prev) => !prev);
    console.log(clicked);
  };

  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);

  const nextClick = () => {
    setBack(false);
    setVisible((prev) => (prev !== 10 ? prev + 1 : prev));
  };
  const prevClick = () => {
    setBack(true);
    setVisible((prev) => (prev !== 1 ? prev - 1 : prev));
  };

  return (
    <Wrapper style={{ background: bgColor }}>
      <div>
        <button onClick={prevClick}>prev</button>
        <button onClick={nextClick}>next</button>
      </div>
      <AnimatePresence custom={back}>
        <Box2
          custom={back}
          key={visible}
          variants={boxSlideVar}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {visible}
        </Box2>
      </AnimatePresence>

      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>
        {clicked ? (
          <Box1
            // 값불러오기!  (모션밸류)
            // style={{ x, scaleY: scrollYProgress, scale: scale }}
            style={{ x, scale: scale }}
            // 드래그 관련!!! (제스처)
            drag
            dragSnapToOrigin={true}
            dragElastic={0.9}
            variants={svgVariants}
            initial="initialBox"
            animate="animateBox"
            exit="exitBox"
            transition={{ duration: 1 }}
            // dragConstraints={{ left: -700, right: 500 }}

            // // 이벤트 리스터!! while애들~~
            // whileHover={{ scale: 1.2, rotate: 90 }}
            // whileTap={{
            //   scale: 0.8,
            //   rotate: -90,
            //   borderRadius: "30%",
            // }}

            // // variants 관련!!
            // variants={BoxVariants}
            // initial="start"
            // animate="end"
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              viewBox="0 0 448 512"
            >
              <motion.path
                variants={svgVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                fill="currentColor"
                transition={{
                  default: { duration: 2 },
                  fill: { duration: 2, delay: 0.3 },
                }}
                d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
              />
            </Svg>
            ;
            {/* <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} /> */}
          </Box1>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
