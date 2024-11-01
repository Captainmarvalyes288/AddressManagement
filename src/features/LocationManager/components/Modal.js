// import React from 'react';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div
//         className="fixed inset-0 bg-black opacity-50"
//         onClick={onClose}
//       />
//       <div className="bg-white rounded-lg z-10 max-w-md w-full">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from 'react';

const Modal = ({ isOpen, onClose, onEnableLocation, onSearchManually }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div className="bg-white rounded-lg z-10 max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4">Location Permission</h2>
        <p className="mb-4">We need your location to provide the best experience. Please enable location or search manually.</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onEnableLocation} className="btn-primary">Enable Location</button>
          <button onClick={onSearchManually} className="btn-secondary">Search Manually</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
