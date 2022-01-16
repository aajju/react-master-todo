import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box1 = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  place-self: center;
`;

const BoxVariants = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.3,
      delayChildren: 0.25,
      staggerChildren: 0.2,
    },
  },
};

const CircleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    y: 0,
    opacity: 1,
  },
};

function App() {
  return (
    <Wrapper>
      <Box1
        drag="x"
        dragConstraints={{ left: 0, right: 500 }}
        dragSnapToOrigin={true}
        dragElastic={0.9}
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "30%",
        }}
        variants={BoxVariants}
        initial="start"
        animate="end"
      >
        {/* <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} /> */}
      </Box1>
    </Wrapper>
  );
}

export default App;
