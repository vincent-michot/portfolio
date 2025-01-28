import Typewriter from "typewriter-effect";

interface TypingEffectProps {
  text: string;
}
export default function TypingEffect({ text }: TypingEffectProps) {
  return (
    <div
      style={{ fontFamily: "monospace" }}
      className=" px-1 flex items-center rounded-lg bg-black-300 ml-2"
    >
      <Typewriter
        options={{ delay: 35 }}
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .callFunction(() => {
              console.log("String typed out!");
            })
            .pauseFor(3000)
            //.deleteAll()
            .callFunction(() => {
              console.log("All strings were deleted");
            })
            .start();
        }}
      />
    </div>
  );
}
