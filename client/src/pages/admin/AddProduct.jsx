// src/pages/admin/AddProduct.jsx

import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AddProductForm } from '../../components/admin/AddProductForm'; // adjust path if needed

export const AddProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <Card className="p-6 bg-white shadow-md rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <Button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Back
          </Button>
        </div>
        <AddProductForm />
      </Card>
    </div>
  );
};
