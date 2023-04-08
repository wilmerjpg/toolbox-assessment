import React from 'react';

export default function Header({ title }) {
  return (
    <header className="px-1 py-2 fw-bold text-light bg-danger">{title}</header>
  );
}
