import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  AlertTriangle,
  Flag,
  Sparkles
} from 'lucide-react';

export default function TimelineManager({ eventPlan, onUpdateTimeline }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPhase, setNewTaskPhase] = useState('1 Month Out');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const timeline = eventPlan?.timeline || [];

  const handleToggleTask = (id) => {
    const updated = timeline.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    onUpdateTimeline(updated);
  };

  const handleDeleteTask = (id) => {
    const updated = timeline.filter(task => task.id !== id);
    onUpdateTimeline(updated);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task_${Date.now()}`,
      phase: newTaskPhase,
      task: newTaskTitle.trim(),
      deadline: "Scheduled",
      priority: newTaskPriority,
      completed: false,
      category: "General"
    };

    onUpdateTimeline([...timeline, newTask]);
    setNewTaskTitle('');
  };

  const completedCount = timeline.filter(t => t.completed).length;
  const progressPct = timeline.length > 0 ? Math.round((completedCount / timeline.length) * 100) : 0;

  const filteredTasks = timeline.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Timeline Milestone Stats Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-r from-purple-950/30 to-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Clock className="w-3.5 h-3.5 text-gold-light" />
            <span>Reverse Countdown Execution</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">Event Milestone Roadmap</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Step-by-step master chronology from inception to final toast.
          </p>
        </div>

        {/* Circular Progress & Milestone Counter */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-extrabold text-white">
              {completedCount} <span className="text-slate-500 text-lg">/ {timeline.length}</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Milestones Achieved
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <span className="text-sm font-extrabold text-purple-400 font-mono">{progressPct}%</span>
          </div>
        </div>
      </div>

      {/* Quick Add Milestone Form */}
      <form onSubmit={handleAddTask} className="glass-card rounded-2xl p-4 border border-white/5 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add new milestone or checklist item (e.g. Schedule final cake tasting)..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={newTaskPhase}
            onChange={(e) => setNewTaskPhase(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="3 Months Out">3 Months Out</option>
            <option value="1 Month Out">1 Month Out</option>
            <option value="2 Weeks Out">2 Weeks Out</option>
            <option value="48 Hours Out">48 Hours Out</option>
            <option value="Day of Event">Day of Event</option>
          </select>

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
            <option value="Urgent">Urgent</option>
          </select>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['all', 'active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === tab 
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Interactive Milestones List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isUrgent = task.priority === 'Urgent' || task.priority === 'High';

          return (
            <div
              key={task.id}
              className={`glass-card glass-card-hover rounded-xl p-4 border transition-all flex items-start justify-between gap-4 ${
                task.completed 
                  ? 'border-emerald-500/20 bg-emerald-950/10 opacity-75' 
                  : 'border-white/5'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-1 rounded-lg mt-0.5 transition-colors ${
                    task.completed 
                      ? 'text-emerald-400 hover:text-emerald-300' 
                      : 'text-slate-500 hover:text-purple-400'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {task.phase}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Due: {task.deadline}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isUrgent 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className={`text-sm font-medium ${
                    task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                  }`}>
                    {task.task}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
