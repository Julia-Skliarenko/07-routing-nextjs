'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

interface ModalContentProps {
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {children}
    </Modal>
  );
}