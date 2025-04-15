import { useNavigate } from 'react-router-dom';
import { ItemForm } from '../components/ItemForm';

export function CreateItem() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Auction Item</h1>
      <ItemForm
        onSubmit={() => navigate('/items')}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}