import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter
} from 'lucide-react';

export default function GuestRSVP({ eventPlan, currency = '₹' }) {
  const [guests, setGuests] = useState([
    { id: 'g1', name: 'Alexander Wright', email: 'alex.wright@executive.io', rsvp: 'Attending', dietary: 'None', plusOne: true },
    { id: 'g2', name: 'Sophia Chen', email: 'sophia@luxurydesign.co', rsvp: 'Attending', dietary: 'Vegetarian', plusOne: false },
    { id: 'g3', name: 'Marcus Sterling', email: 'm.sterling@investments.com', rsvp: 'Pending', dietary: 'Gluten-Free', plusOne: true },
    { id: 'g4', name: 'Elena Rostova', email: 'elena@artgallery.eu', rsvp: 'Declined', dietary: 'None', plusOne: false }
  ]);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDietary, setNewDietary] = useState('None');
  const [newPlusOne, setNewPlusOne] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newGuest = {
      id: `g_${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim() || 'guest@example.com',
      rsvp: 'Pending',
      dietary: newDietary,
      plusOne: newPlusOne
    };

    setGuests([...guests, newGuest]);
    setNewName('');
    setNewEmail('');
    setNewDietary('None');
    setNewPlusOne(false);
  };

  const handleUpdateRSVP = (id, newRsvp) => {
    setGuests(guests.map(g => g.id === id ? { ...g, rsvp: newRsvp } : g));
  };

  const handleDeleteGuest = (id) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const attendingCount = guests.filter(g => g.rsvp === 'Attending').reduce((acc, g) => acc + (g.plusOne ? 2 : 1), 0);
  const pendingCount = guests.filter(g => g.rsvp === 'Pending').length;
  const targetGuests = Number(eventPlan?.guestEstimate) || 100;

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* RSVP Stats Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-r from-purple-950/30 to-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Users className="w-3.5 h-3.5 text-gold-light" />
            <span>Attendance & Hospitality</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">Guest Hospitality & RSVP Registry</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Track confirmations, dietary requirements, and headcounts against capacity.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-emerald-400">{attendingCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Confirmed Heads</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-amber-400">{pendingCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Awaiting Reply</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-purple-400">{targetGuests}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Target Cap</div>
          </div>
        </div>
      </div>

      {/* Add Guest Form */}
      <form onSubmit={handleAddGuest} className="glass-card rounded-2xl p-4 border border-white/5 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        <input
          type="text"
          placeholder="Guest Full Name *"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
        />
        <select
          value={newDietary}
          onChange={(e) => setNewDietary(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
        >
          <option value="None">Dietary: Standard</option>
          <option value="Vegetarian">Dietary: Vegetarian</option>
          <option value="Vegan">Dietary: Vegan</option>
          <option value="Halal">Dietary: Halal</option>
          <option value="Kosher">Dietary: Kosher</option>
          <option value="Gluten-Free">Dietary: Gluten-Free</option>
        </select>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
          <input
            type="checkbox"
            checked={newPlusOne}
            onChange={(e) => setNewPlusOne(e.target.checked)}
            className="rounded bg-black/40 border-white/10 text-purple-600 focus:ring-0"
          />
          <span>Include +1 Guest</span>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Guest</span>
        </button>
      </form>

      {/* Guest Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search attendee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Total {guests.length} Invitations Issued
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/60 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-white/5">
              <tr>
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">RSVP Status</th>
                <th className="py-3 px-4">Dietary Preference</th>
                <th className="py-3 px-4">Party Size</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">{guest.name}</td>
                  <td className="py-3 px-4 text-xs text-purple-300 font-mono">{guest.email}</td>
                  <td className="py-3 px-4">
                    <select
                      value={guest.rsvp}
                      onChange={(e) => handleUpdateRSVP(guest.id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded-md bg-black/50 border focus:outline-none cursor-pointer ${
                        guest.rsvp === 'Attending' ? 'text-emerald-400 border-emerald-500/30' :
                        guest.rsvp === 'Declined' ? 'text-rose-400 border-rose-500/30' :
                        'text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <option value="Attending" className="bg-slate-900 text-emerald-400">Attending</option>
                      <option value="Pending" className="bg-slate-900 text-amber-400">Pending</option>
                      <option value="Declined" className="bg-slate-900 text-rose-400">Declined</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {guest.dietary}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-300">
                    {guest.plusOne ? '2 (With +1)' : '1 (Solo)'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
