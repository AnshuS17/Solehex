import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useApp } from '../context/AppContext';
import './Admin.css';

const Admin = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '', slug: '', tagline: '', description: '', story: '',
    price: '', volume: '100 ml', concentration: 'Eau de Parfum',
    edition: 'Limitée', countInStock: '', isFeatured: false,
    images: [''],
  });
  const [formOpen, setFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) { navigate('/'); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, o] = await Promise.all([
        api.get('/products'),
        api.get('/orders/all'),
      ]);
      setProducts(p.data);
      setOrders(o.data);
    } catch { /* silent */ }
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
        images: form.images.filter((url) => url.trim()),
      });
      setFormOpen(false);
      setForm({
        name: '', slug: '', tagline: '', description: '', story: '',
        price: '', volume: '100 ml', concentration: 'Eau de Parfum',
        edition: 'Limitée', countInStock: '', isFeatured: false,
        images: [''],
      });
      fetchAll();
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploading(true);
    try {
      const { data } = await api.post('/products/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const images = form.images.filter((url) => url.trim());
      setForm({ ...form, images: [...images, data.url] });
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const addImageField = () => setForm({ ...form, images: [...form.images, ''] });
  const removeImageField = (index) => {
    const images = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: images.length ? images : [''] });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    fetchAll();
  };

  const handleStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    fetchAll();
  };

  if (loading) return <div className="admin-loading">Loading…</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-logo">SOLEHEX <span>Admin</span></div>
        <div className="admin-tabs">
          <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button>
          <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders</button>
        </div>
      </div>

      <div className="admin-body">
        {tab === 'products' && (
          <>
            <div className="admin-section-head">
              <h2>Products <span>({products.length})</span></h2>
              <button className="btn-primary" onClick={() => setFormOpen(!formOpen)}>
                <span>{formOpen ? '✕ Close' : '+ New Product'}</span>
              </button>
            </div>

            {formOpen && (
              <form className="admin-form" onSubmit={handleCreate}>
                <h3>Create Product</h3>
                <div className="form-grid">
                  {[
                    ['name','Name'], ['slug','Slug (e.g. solehex-noir)'],
                    ['tagline','Tagline'], ['price','Price (₹)'],
                    ['volume','Volume'], ['concentration','Concentration'],
                    ['edition','Edition'], ['countInStock','Stock Qty'],
                  ].map(([k, l]) => (
                    <div className="form-field" key={k}>
                      <label>{l}</label>
                      <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                        required={['name','slug','price','countInStock'].includes(k)} />
                    </div>
                  ))}
                </div>
                <div className="form-field full">
                  <label>Image URLs</label>
                  {form.images.map((image, index) => (
                    <div className="image-field" key={index}>
                      <input
                        value={image}
                        placeholder="https://example.com/image.jpg"
                        onChange={e => {
                          const images = [...form.images];
                          images[index] = e.target.value;
                          setForm({ ...form, images });
                        }}
                      />
                      <button type="button" className="image-remove" onClick={() => removeImageField(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn-secondary" onClick={addImageField}>
                    + Add another image
                  </button>
                </div>
                <div className="form-field full">
                  <label>Upload image file</label>
                  <input type="file" accept="image/*" onChange={handleUploadImage} />
                  {uploading && <div className="uploading">Uploading image…</div>}
                  <div className="upload-hint">Upload a local image and it will be stored on the server.</div>
                </div>
                <div className="form-field full">
                  <label>Description</label>
                  <textarea value={form.description} rows={3}
                    onChange={e => setForm({ ...form, description: e.target.value })} required />
                </div>
                <div className="form-field full">
                  <label>Story</label>
                  <textarea value={form.story} rows={3}
                    onChange={e => setForm({ ...form, story: e.target.value })} />
                </div>
                <label className="form-check">
                  <input type="checkbox" checked={form.isFeatured}
                    onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                  Featured product (shown on homepage)
                </label>
                <button className="btn-primary" type="submit"><span>Create Product</span></button>
              </form>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Price</th><th>Stock</th><th>Images</th><th>Featured</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id}>
                      <td>
                        <div className="td-name">{p.name}</div>
                        <div className="td-sub">{p.slug}</div>
                      </td>
                      <td>{p.currency}{p.price?.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`stock-badge ${p.countInStock === 0 ? 'out' : ''}`}>
                          {p.countInStock === 0 ? 'Out' : p.countInStock}
                        </span>
                      </td>
                      <td>{p.images?.length ? `${p.images.length} image${p.images.length > 1 ? 's' : ''}` : 'No image'}</td>
                      <td>{p.isFeatured ? '★' : '—'}</td>
                      <td>
                        <button className="admin-action del" onClick={() => handleDelete(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'orders' && (
          <>
            <div className="admin-section-head">
              <h2>Orders <span>({orders.length})</span></h2>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th><th>Update</th></tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id}>
                      <td><span className="td-id">{o._id.slice(-8)}</span></td>
                      <td>
                        <div className="td-name">{o.user?.name}</div>
                        <div className="td-sub">{o.user?.email}</div>
                      </td>
                      <td>₹{o.totalPrice?.toLocaleString('en-IN')}</td>
                      <td><span className={`status-badge s-${o.status}`}>{o.status}</span></td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select className="status-select" value={o.status}
                          onChange={e => handleStatus(o._id, e.target.value)}>
                          {['pending','processing','shipped','delivered','cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
