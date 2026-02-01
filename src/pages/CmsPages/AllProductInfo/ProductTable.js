import React from "react";

const ProductTable = ({ products }) => {
  const handleDownload = async (imageUrl, id) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${id}.jpg`; // Save as id.jpg
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>نام</th>
          <th>قیمت</th>
          <th>دانلود عکس</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price.toLocaleString()}</td>
            <td>
              <button onClick={() => handleDownload(product.smallImage, product.id)}>دانلود عکس</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
