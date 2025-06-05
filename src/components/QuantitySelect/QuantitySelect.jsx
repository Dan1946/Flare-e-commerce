import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function QuantitySelect() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      console.log(`Added ${quantity} items to cart`);
      
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 500);
  };

  const quantityOptions = [
    { value: 1, label: '1 - Single Item' },
    { value: 2, label: '2 - Perfect Pair' },
    { value: 3, label: '3 - Small Bundle' },
    { value: 4, label: '4 - Family Pack' },
    { value: 5, label: '5 - Group Special' },
    { value: 6, label: '6 - Half Dozen' },
    { value: 7, label: '7 - Lucky Seven' },
    { value: 8, label: '8 - Octet Deal' },
    { value: 9, label: '9 - Almost Ten' },
    { value: 10, label: '10 - Perfect Ten' },
    { value: 15, label: '15 - Bulk Order' },
    { value: 20, label: '20 - Volume Discount' },
    { value: 25, label: '25 - Quarter Century' },
    { value: 50, label: '50 - Half Hundred' },
    { value: 100, label: '100 - Wholesale' }
  ];

  return (
    <>
      <style>{`
        .container {
        //   min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border-radius: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.95);
          background-color: white;
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        //   max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .product-title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 12px;
        }

        .product-price {
          font-size: 32px;
          font-weight: 700;
          color: #3B82F6;
          margin-bottom: 32px;
        }

        .quantity-section {
          margin-bottom: 32px;
        }

        .quantity-label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 16px;
          text-align: left;
        }

        .select-container {
          position: relative;
          display: block;
        }

        .fancy-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 100%;
          padding: 16px 50px 16px 20px;
          font-size: 16px;
          font-weight: 500;
          color: #1f2937;
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .fancy-select:hover {
          border-color: #3B82F6;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .fancy-select:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
          animation: pulse 2s infinite;
        }

        .select-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: transform 0.3s ease;
          color: #3B82F6;
        }

        .fancy-select:focus + .select-arrow {
          transform: translateY(-50%) rotate(180deg);
        }

        .fancy-select option {
          padding: 12px;
          font-size: 16px;
          color: #1f2937;
          background-color: #ffffff;
        }

        .fancy-select option:hover {
          background-color: #f9fafb;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #3B82F6 0%, #2563eb 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .add-to-cart-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
        }

        .add-to-cart-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .add-to-cart-btn.adding {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          transform: scale(0.95);
        }

        .add-to-cart-btn.added {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .add-to-cart-btn:disabled {
          cursor: not-allowed;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }

        /* Custom scrollbar for select dropdown */
        .fancy-select::-webkit-scrollbar {
          width: 8px;
        }

        .fancy-select::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .fancy-select::-webkit-scrollbar-thumb {
          background: #3B82F6;
          border-radius: 4px;
        }

        .fancy-select::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .product-card {
            padding: 30px 20px;
            margin: 10px;
          }
          
          .product-title {
            font-size: 20px;
          }
          
          .product-price {
            font-size: 28px;
          }
          
          .fancy-select {
            padding: 14px 45px 14px 16px;
            font-size: 15px;
          }
          
          .select-arrow {
            right: 16px;
          }
        }
      `}</style>

      <div className="container">
        <div className="product-card">
          <h2 className="product-title">Premium Wireless Headphones</h2>
          <div className="product-price">$199.99</div>
          
          <div className="quantity-section">
            <label htmlFor="quantity" className="quantity-label">
              Select Quantity:
            </label>
            
            <div className="select-container">
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="fancy-select"
              >
                {quantityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="select-arrow">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${isAdded ? 'added' : ''}`}
          >
            {isAdded ? 'Added to Cart!' : isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </>
  );
}