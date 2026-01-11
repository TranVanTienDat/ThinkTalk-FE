import { cn } from "@/lib/utils";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { Loader2 } from "lucide-react";
import React from "react";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  primaryActionLabel?: string;
  cancelActionLabel?: string;
  onPrimaryAction: () => void;
  onCancel?: () => void;
  primaryActionVariant?: "solid" | "outlined" | "plain" | "soft";
  primaryActionColor?: "primary" | "neutral" | "danger" | "success" | "warning";
  isLoading?: boolean;
  contentClassName?: string;
  descriptionClassName?: string;
  hiddenActions?: boolean;
  primaryActionClassName?: string;
  scrollAreaClassName?: string;
  wrapperFooterClassName?: string;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  primaryActionLabel = "Lưu",
  cancelActionLabel = "Hủy",
  onPrimaryAction,
  onCancel,
  primaryActionVariant = "solid",
  primaryActionColor = "primary",
  isLoading = false,
  hiddenActions = false,
  contentClassName,
  descriptionClassName,
  primaryActionClassName,
  wrapperFooterClassName,
}: FormDialogProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handlePrimary = () => {
    onPrimaryAction();
  };

  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      <ModalDialog
        layout="center"
        sx={{
          maxWidth: "90vw",
          minWidth: "423px",
          width: "auto",
        }}
        className={cn("p-6", contentClassName)}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={handleCancel} />
        <DialogTitle>
          {typeof title === "string" ? (
            <Typography level="h4" component="h2" fontWeight="lg">
              {title}
            </Typography>
          ) : (
            title
          )}
        </DialogTitle>
        {description && (
          <Typography
            level="body-md"
            textColor="text.tertiary"
            className={descriptionClassName}
          >
            {description}
          </Typography>
        )}
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
            maxHeight: "65vh",
            mt: 2, // Add margin bottom if actions are present
          }}
        >
          {children}
        </DialogContent>
        {!hiddenActions && (
          <DialogActions
            sx={{
              gap: 1.5,
              pt: 0,
            }}
            className={wrapperFooterClassName}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleCancel}
              sx={{ minWidth: "100px" }}
            >
              {cancelActionLabel}
            </Button>
            <Button
              variant={primaryActionVariant}
              color={primaryActionColor} // Using Joy UI color prop
              onClick={handlePrimary}
              loading={isLoading}
              disabled={isLoading}
              sx={{ minWidth: "100px" }}
              className={primaryActionClassName}
              startDecorator={
                isLoading && <Loader2 className="animate-spin w-4 h-4" />
              }
            >
              {primaryActionLabel}
            </Button>
          </DialogActions>
        )}
      </ModalDialog>
    </Modal>
  );
}

export default FormDialog;
