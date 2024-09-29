
export const formatPrice = (price) => {
    
    const inrPrice = price * 75; 
    return `₹${inrPrice.toFixed(2)}`;
  };