import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axioInstance';

export const ProductDetailForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        productId,
        sizes: JSON.stringify(data.sizes.split(',').map(s => s.trim())),
        colors: JSON.stringify(data.colors.split(',').map(c => c.trim())),
        specifications: JSON.stringify({
          material: data.material,
          weight: data.weight,
          
        })
      };

      const response = await axiosInstance.post(
        '/product-detail/create-product-detail',
        formData
      );

      if (images.length > 0) {
        const imgForm = new FormData();
        images.forEach(file => imgForm.append('images', file));

        await axiosInstance.post(
          `/product-detail/images/${productId}`,
          imgForm,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
      }

      toast.success('Product details added successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to add product details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Product Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
  <label className="block font-medium">Product ID</label>
  <input
    type="text"
    value={productId}
    onChange={(e) => setProductId(e.target.value)}
    className="w-full p-2 border rounded"
    required
  />
</div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea {...register('description', { required: true })} className="w-full p-2 border rounded" />
          {errors.description && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Stock</label>
            <input type="number" {...register('stock', { required: true })} className="w-full p-2 border rounded" />
            {errors.stock && <p className="text-red-500 text-sm">Required</p>}
          </div>
          <div>
            <label className="block font-medium">Brand</label>
            <input type="text" {...register('brand', { required: true })} className="w-full p-2 border rounded" />
            {errors.brand && <p className="text-red-500 text-sm">Required</p>}
          </div>
        </div>

        <div>
          <label className="block font-medium">Category ID</label>
          <input type="text" {...register('category', { required: true })} className="w-full p-2 border rounded" />
          {errors.category && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Ratings</label>
            <input type="number" {...register('ratings')}  className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Return Policy (days)</label>
            <input type="number" {...register('returnPolicy')} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Sizes</label>
            <input type="text" {...register('sizes')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Colors </label>
            <input type="text" {...register('colors')} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Material</label>
            <input type="text" {...register('material')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Weight (kg)</label>
            <input type="text" {...register('weight')} className="w-full p-2 border rounded" />
          </div>
          
        </div>

        <div>
          <label className="block font-medium">Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} className="w-full" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
