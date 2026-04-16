'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 font-cairo" onClose={onClose} dir="rtl">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'relative transform overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white px-6 pb-8 pt-10 text-right shadow-2xl transition-all sm:w-full sm:max-w-lg sm:p-10 border border-slate-100',
                  className
                )}
              >
                <div className="absolute left-4 top-6 sm:block">
                  <button
                    type="button"
                    className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-600 focus:outline-none transition-all active:scale-90"
                    onClick={onClose}
                  >
                    <span className="sr-only">إغلاق</span>
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
                <div className="w-full">
                  <div className="text-right w-full">
                    <Dialog.Title as="h3" className="text-xl md:text-2xl font-black leading-none text-slate-900 tracking-tight mb-2">
                      {title}
                    </Dialog.Title>
                    <div className="h-1 w-10 md:w-12 bg-rose-600 rounded-full mb-6 md:mb-8" />
                    <div className="mt-4">{children}</div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
