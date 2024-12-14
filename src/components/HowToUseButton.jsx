import { useState } from "react";
import HowToUseModal from "./HowToUseModal";

const HowToUseButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className=" h-6 w-6 rounded-full bg-purple-500 text-white absolute top-14 right-5"
      >
        ?
      </button>
      {isModalOpen && <HowToUseModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default HowToUseButton;
