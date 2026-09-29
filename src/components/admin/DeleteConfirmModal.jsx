import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item?',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm shadow-rose-500/20 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
