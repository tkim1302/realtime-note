import PropTypes from "prop-types";

const HowToUseModal = ({ setIsModalOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-black opacity-70"
      ></div>
      <div className="relative h-[32rem] w-[30rem] rounded-xl bg-white flex flex-col items-center p-6 gap-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-4 text-gray-700 text-2xl font-bold"
        >
          X
        </button>
        <h2 className="text-gray-800 text-2xl font-bold">
          How To Collaborate?
        </h2>
        <div className="text-gray-800 flex flex-col gap-5">
          <div>
            <p className="text-xl font-bold">1. Get your unique URL:</p>
            <p className="text-lg">
              After saving a new note, <span>a unique URL</span> will be
              generated and displayed in the browser&apos;s address bar. This
              URL represents your note.
            </p>
          </div>
          <div>
            <p className="text-xl font-bold">2. Share with a Colleague:</p>
            <p className="text-lg">
              <span>Copy</span> the URL and <span>share</span> it with your
              colleague. They can open the link in their browser to access the
              same note.
            </p>
          </div>
          <div>
            <p className="text-xl font-bold">3. Collaborate in Real-Time!</p>
            <p className="text-lg">
              You&apos;re all set! See <span>who&apos;s collaborating</span> and
              track their <span>cursor positions</span> with ease!
            </p>
          </div>
          <p className="font-semibold">
            Note: Only two people can collaborate on a note.
          </p>
        </div>
      </div>
    </div>
  );
};

HowToUseModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default HowToUseModal;
