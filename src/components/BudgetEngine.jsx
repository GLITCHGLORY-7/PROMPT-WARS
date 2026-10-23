import React, { useState } from 'react';
import { 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  Plus, 
  Trash2, 
  AlertCircle, 
  ShieldCheck, 
  Building2, 
  Utensils, 
  Sparkles, 
  Camera, 
  Music,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  Building2: Building2,
  Utensils: Utensils,
  Sparkles: Sparkles,
  Camera: Camera,
  Music: Music,
  ShieldCheck: ShieldCheck
};

export default function BudgetEngine({ 
  eventPlan, 
  onUpdateBudgetBreakdown, 
  currency = '₹' 
}) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const breakdown = eventPlan?.budgetBreakdown || [];
  const totalBudget = Number(eventPlan?.totalBudget) || 50000;

  // Calculate totals
  const totalAllocated = breakdown.reduce((sum, item) => sum + (Number(item.allocated) || 0), 0);
  const totalSpent = breakdown.reduce((sum, item) => sum + (Number(item.spent) || 0), 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;

  const handleUpdateSpent = (id, newSpent) => {
    const updated = breakdown.map(item => {
      if (item.id === id) {
        return { ...item, spent: Math.max(0, Number(newSpent) || 0) };
      }
      return item;
    });
    onUpdateBudgetBreakdown(updated);
  };

  const handleUpdateAllocated = (id, newAllocated) => {
    const updated = breakdown.map(item => {
      if (item.id === id) {
        const val = Math.max(0, Number(newAllocated) || 0);
        const newPct = totalBudget > 0 ? Math.round((val / totalBudget) * 100) : 0;
        return { ...item, allocated: val, percentage: newPct };
      }
      return item;
    });
    onUpdateBudgetBreakdown(updated);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const amt = Number(newCategoryAmount) || 0;
    const newPct = totalBudget > 0 ? Math.round((amt / totalBudget) * 100) : 5;
    const newItem = {
      id: `custom_${Date.now()}`,
      category: newCategoryName.trim(),
      percentage: newPct,
      allocated: amt,
      spent: 0,
      icon: "Sparkles",
      notes: "Custom user allocation"
    };

    onUpdateBudgetBreakdown([...breakdown, newItem]);
    setNewCategoryName('');
    setNewCategoryAmount('');
    setShowAddModal(false);
  };

  const handleDeleteCategory = (id) => {
    const updated = breakdown.filter(item => item.id !== id);
    onUpdateBudgetBreakdown(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Level Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget Card */}
        <div className="glass-card rounded-2xl p-5 border border-purple-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total Target Budget</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-sm font-bold text-purple-400">{currency}</span>
            <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {totalBudget.toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Target allocation cap</p>
        </div>

        {/* Total Allocated */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Allocated Capital</span>
            <PieChart className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-sm font-bold text-amber-400">{currency}</span>
            <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {totalAllocated.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px]">
            <span className={totalAllocated > totalBudget ? "text-rose-400 font-bold" : "text-slate-400"}>
              {Math.round((totalAllocated / (totalBudget || 1)) * 100)}% of target
            </span>
          </div>
        </div>

        {/* Total Spent Ledger */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Committed / Spent</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-sm font-bold text-emerald-400">{currency}</span>
            <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {totalSpent.toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">{spentPercentage}% realized</p>
        </div>

        {/* Remaining Runway */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Remaining Runway</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-sm font-bold ${remainingBudget < 0 ? 'text-rose-400' : 'text-cyan-400'}`}>{currency}</span>
            <span className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${remainingBudget < 0 ? 'text-rose-400' : 'text-white'}`}>
              {remainingBudget.toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            {remainingBudget < 0 ? 'Budget overrun caution' : 'Available safety margin'}
          </p>
        </div>
      </div>

      {/* Progress Bar of Spent vs Budget */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Execution Pacing</span>
            <span className="text-xs text-slate-400 font-mono">({spentPercentage}% of total limit)</span>
          </div>
          <span className="text-xs font-semibold text-slate-300">
            {currency} {totalSpent.toLocaleString()} / {currency} {totalBudget.toLocaleString()}
          </span>
        </div>
        
        {/* Progress Bar Track */}
        <div className="w-full h-3.5 rounded-full bg-slate-900 border border-white/5 overflow-hidden flex">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              spentPercentage > 95 ? 'bg-rose-500' : 'bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-400'
            }`}
            style={{ width: `${spentPercentage}%` }}
          />
        </div>
      </div>

      {/* Categories Ledger Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">Category Allocation & Expense Ledger</h3>
            <p className="text-xs text-slate-400">Adjust planned budgets or record paid amounts in real time.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Share</th>
                  <th className="py-3.5 px-4">Planned Allocation</th>
                  <th className="py-3.5 px-4">Actual Paid</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {breakdown.map((item) => {
                  const IconComp = ICON_MAP[item.icon] || Sparkles;
                  const itemAllocated = Number(item.allocated) || 0;
                  const itemSpent = Number(item.spent) || 0;
                  const isOverspent = itemSpent > itemAllocated && itemAllocated > 0;

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Name & Icon */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-100">{item.category}</div>
                            <div className="text-[11px] text-slate-400 max-w-xs truncate">{item.notes}</div>
                          </div>
                        </div>
                      </td>

                      {/* Percentage */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {item.percentage}%
                        </span>
                      </td>

                      {/* Planned Allocation Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400 font-mono">{currency}</span>
                          <input
                            type="number"
                            value={itemAllocated}
                            onChange={(e) => handleUpdateAllocated(item.id, e.target.value)}
                            className="w-28 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-100 text-xs font-mono focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </td>

                      {/* Actual Spent Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400 font-mono">{currency}</span>
                          <input
                            type="number"
                            value={itemSpent}
                            onChange={(e) => handleUpdateSpent(item.id, e.target.value)}
                            className={`w-28 px-2.5 py-1.5 rounded-lg bg-black/40 border text-xs font-mono focus:outline-none ${
                              isOverspent ? 'border-rose-500 text-rose-300' : 'border-white/10 text-slate-100 focus:border-emerald-500'
                            }`}
                          />
                        </div>
                      </td>

                      {/* Status indicator */}
                      <td className="py-3.5 px-4">
                        {isOverspent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                            <AlertCircle className="w-3 h-3" />
                            Over by {currency}{(itemSpent - itemAllocated).toLocaleString()}
                          </span>
                        ) : itemSpent > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            On Track
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">Unspent</span>
                        )}
                      </td>

                      {/* Delete */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteCategory(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md border border-purple-500/30 space-y-5 bg-[#0F0D1F]">
            <h4 className="text-lg font-bold text-white">Add Custom Budget Category</h4>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Guest Favors & Goodies"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Amount ({currency})</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={newCategoryAmount}
                  onChange={(e) => setNewCategoryAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                  required
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
                  Confirm Addition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
