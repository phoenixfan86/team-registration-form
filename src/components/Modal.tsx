import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" w-105 max-w-lg relative bg-white ring-1 ring-zinc-400 shadow-zinc-400 rounded-lg p-4 ">
        <h3 className="text-lg text-center text-zinc-700 font-bold tracking-widest">Combat team</h3>
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &#x2715;
        </button>
        {children}
        <div className="w-full flex items-center justify-end gap-2">
          <button type="reset" onClick={onClose} className="btn-reset">
            Reset
          </button>
          <button type="submit" className="btn-submit">
            Save
          </button>
        </div>
      </div>

    </div>
  );
};

export default Modal;
