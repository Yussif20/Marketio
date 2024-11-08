const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-center sm:space-x-2">
      <button
        onClick={onDecrease}
        className="px-1 sm:px-2 py-1 bg-gray-200 text-gray-600 rounded"
      >
        &ndash;
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="w-6 sm:w-12 text-center text-sm sm:text-base border border-gray-300 rounded text-gray-700"
      />
      <button
        onClick={onIncrease}
        className="px-1 sm:px-2 py-1 bg-gray-200 text-gray-600 rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
