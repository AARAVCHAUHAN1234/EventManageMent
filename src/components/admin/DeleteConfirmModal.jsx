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
      <div className="space-y-5">
        <div className="flex items-start gap-3.5 p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-rose-200 text-xs sm:text-sm font-mono leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#A69E8C] hover:bg-[#1f1f1f] hover:text-[#F6F3EC] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
