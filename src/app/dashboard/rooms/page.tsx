'use client';

import { useState } from 'react';
import { Room } from '@/components/rooms/types';
import RoomList from '@/components/rooms/RoomList';
import RoomForm from '@/components/rooms/RoomForm';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function RoomsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]); // In real app, fetch from Supabase

  const handleSubmit = async (roomData: Partial<Room>) => {
    // TODO: Implement room creation/update logic with Supabase
    setShowForm(false);
    setSelectedRoom(null);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setShowForm(true);
  };

  const handleDelete = async (room: Room) => {
    // TODO: Implement room deletion logic with Supabase
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Rooms</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Room
        </button>
      </div>

      {showForm ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {selectedRoom ? 'Edit Room' : 'New Room'}
          </h2>
          <RoomForm
            room={selectedRoom || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedRoom(null);
            }}
          />
        </div>
      ) : (
        <RoomList
          rooms={rooms}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
