import { Modal, ModalDialog, DialogTitle, DialogContent } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode, useState, useCallback, useMemo } from "react";

export interface ModalProps {
  children: ReactNode;
  title?: string;
  sx?: SxProps;
}

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const ModalComponent = ({ title, children, sx }: ModalProps) => {
    return (
      <Modal open={isOpen} onClose={toggle} keepMounted>
        <ModalDialog
          layout="center"
          size="md"
          sx={{ minWidth: "400px", ...sx }}
        >
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogContent sx={{ mt: 1.5 }}>{children}</DialogContent>
        </ModalDialog>
      </Modal>
    );
  };

  const ModalMemo = useMemo(() => ModalComponent, [isOpen]);

  return {
    isOpen,
    toggle,
    modal: ModalMemo,
  };
}
