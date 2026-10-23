import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  ExternalLink, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign,
  Building,
  FileText
} from 'lucide-react';

const STATUS_CONFIG = {
  'Booked': {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle
  },
  'In Discussion': {
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    icon: Clock
  },
  'Not Started': {
    badge: 'bg-slate-800 text-slate-400 border-slate-700',
    icon: AlertCircle
  }
};

export default function VendorHub({ eventPlan, onUpdateVendors, currency = '₹' }) {
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorCategory, setNewVendorCategory] = useState('Catering');
  const [newVendorEstimate, setNewVendorEstimate] = useState('');
  const [newVendorContact, setNewVendorContact] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const vendors = eventPlan?.vendors || [];

  const handleStatusChange = (id, newStatus) => {
    const updated = vendors.map(v => {
      if (v.id === id) {
        return { ...v, status: newStatus };
      }
      return v;
    });
    onUpdateVendors(updated);
  };

  const handleDeleteVendor = (id) => {
    const updated = vendors.filter(v => v.id !== id);
    onUpdateVendors(updated);
  };

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!newVendorName.trim()) return;

    const newVendor = {
      id: `v_${Date.now()}`,
      name: newVendorName.trim(),
      category: newVendorCategory,
      status: 'Not Started',
      budgetEstimate: Number(newVendorEstimate) || 0,
      contact: newVendorContact.trim() || 'contact@vendor.io',
      notes: 'Directly sourced for execution'
    };

    onUpdateVendors([...vendors, newVendor]);
    setNewVendorName('');
    setNewVendorEstimate('');
    setNewVendorContact('');
    setShowAddModal(false);
  };

  const bookedCount = vendors.filter(v => v.status === 'Booked').length;
  const inDiscussionCount = vendors.filter(v => v.status === 'In Discussion').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Overview */}
      <div className="glass-panel rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-r from-purple-950/30 to-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Users className="w-3.5 h-3.5 text-gold-light" />
            <span>Supplier & Talent Roster</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">Vendor Coordination Matrix</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Screening, proposal negotiation, and contractual milestone fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-emerald-400">{bookedCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Booked</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-amber-400">{inDiscussionCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">In Discussion</div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vendors.map((vendor) => {
          const cfg = STATUS_CONFIG[vendor.status] || STATUS_CONFIG['Not Started'];
          const StatusIcon = cfg.icon;

          return (
            <div 
              key={vendor.id} 
              className="glass-card glass-card-hover rounded-2xl p-5 border border-white/5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Category & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                    {vendor.category}
                  </span>
                  
                  {/* Status Dropdown */}
                  <select
                    value={vendor.status}
                    onChange={(e) => handleStatusChange(vendor.id, e.target.value)}
                    className={`text-[11px] font-bold px-2 py-1 rounded-full border bg-black/50 focus:outline-none cursor-pointer ${cfg.badge}`}
                  >
                    <option value="Not Started" className="bg-slate-900 text-slate-300">Not Started</option>
                    <option value="In Discussion" className="bg-slate-900 text-amber-300">In Discussion</option>
                    <option value="Booked" className="bg-slate-900 text-emerald-300">Booked</option>
                  </select>
                </div>

                {/* Vendor Name */}
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">{vendor.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{vendor.notes}</p>
                </div>
              </div>

              {/* Contact & Financial Meta */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Budget Quote:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {currency} {Number(vendor.budgetEstimate || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Direct Contact:</span>
                  <span className="text-purple-300 font-mono truncate max-w-[160px] text-[11px]">
                    {vendor.contact}
                  </span>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={() => handleDeleteVendor(vendor.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove supplier"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md border border-purple-500/30 space-y-5 bg-[#0F0D1F]">
            <h4 className="text-lg font-bold text-white">Add Professional Supplier / Vendor</h4>
            <form onSubmit={handleAddVendor} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Talent Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acoustic Symphony Quartets"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Service Category</label>
                <select
                  value={newVendorCategory}
                  onChange={(e) => setNewVendorCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="Venue">Venue & Banquets</option>
                  <option value="Catering">Catering & Mixology</option>
                  <option value="Decor">Decor & Floral</option>
                  <option value="Photography">Photography & Film</option>
                  <option value="Music">Live Music & DJ</option>
                  <option value="Stationery">Invites & Gifts</option>
                  <option value="Security">Logistics & Security</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Budget ({currency})</label>
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  value={newVendorEstimate}
                  onChange={(e) => setNewVendorEstimate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contact Email / Phone</label>
                <input
                  type="text"
                  placeholder="e.g. director@quartet.com"
                  value={newVendorContact}
                  onChange={(e) => setNewVendorContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
