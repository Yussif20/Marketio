const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="px-2 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &ndash;
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="w-12 text-center border border-gray-300 rounded text-gray-700"
      />
      <button
        onClick={onIncrease}
        className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
