'use client';

export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return <button onClick={onDelete}>Delete</button>;
}
