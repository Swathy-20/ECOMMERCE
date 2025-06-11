import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import {ProductDetailForm} from '../../components/admin/ProductDetailForm';

export const AddProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  return (
    <div className="p-6">
      <Card className="p-6 bg-white shadow-md rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Product Details</h2>
          <Button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Back
          </Button>
        </div>
        <ProductDetailForm productId={productId} />
      </Card>
    </div>
  );
};

export default AddProductDetail;
