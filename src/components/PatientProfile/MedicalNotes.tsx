import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';

const initialNotes = [
  {
    id: 1,
    date: '2024-03-20',
    doctor: 'Dr. Sarah Johnson',
    content: 'Patient presents with symptoms of acute respiratory infection. Prescribed antibiotics and rest.',
    type: 'Progress Note'
  },
  {
    id: 2,
    date: '2024-03-19',
    doctor: 'Dr. Michael Chen',
    content: 'Follow-up examination shows improvement in respiratory function. Continue current treatment plan.',
    type: 'Follow-up Note'
  }
];

const MedicalNotes = () => {
  const [notes] = useState(initialNotes);
  const [showNewNote, setShowNewNote] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Medical Notes</h2>
        <button
          onClick={() => setShowNewNote(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          <Plus className="h-4 w-4" />
          <span>Add Note</span>
        </button>
      </div>

      {showNewNote && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Type
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                <option>Progress Note</option>
                <option>Follow-up Note</option>
                <option>Consultation Note</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Content
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your medical note here..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewNote(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {note.doctor}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(note.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                  {note.type}
                </span>
                <p className="text-sm text-gray-600">{note.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalNotes;