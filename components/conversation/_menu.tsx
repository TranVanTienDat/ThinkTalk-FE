import { menuConversation } from "@/constants";
import { useAppContext } from "@/context/app-context";
import useModal, { ModalProps } from "@/hooks/use-modal";
import { useConversationInfoStore } from "@/stores/conversation-info-store";
import {
  Button,
  Dropdown,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  styled,
  useTheme,
} from "@mui/joy";
import { Copy, EllipsisVertical, LucideProps } from "lucide-react";
import {
  Dispatch,
  ForwardRefExoticComponent,
  memo,
  RefAttributes,
  SetStateAction,
  useEffect,
} from "react";
import { useStore } from "zustand";
import { AccountSettingsAndSecurityModalProps } from "../account/setting-security-modal";
import { IconButtonCustomize } from "../base/button-loading";
import { useCreateInviteLink } from "@/hooks/use-create-invite-link";
import { useNotification } from "@/hooks/use-notification";

type PropsType = {
  id: string;
  type: "private" | "group";
  open: boolean;
  onOpenChange: (event: React.SyntheticEvent | null, isOpen: boolean) => void;
  key: string;
  setKey: Dispatch<SetStateAction<string>>;
};

const InputStyled = styled(Input)(({ theme }) => ({
  width: "100%",
  // backgroundColor: theme.palette.background.backdrop,
  color: theme.palette.secondary[100],
  "--Input-focusedThickness": "0",
  "& .MuiInputBase-input": {
    width: "100%",
  },
  "&::before": {
    transition: "box-shadow .15s ease-in-out",
  },
}));

const ConversationMenu = ({ props }: { props: PropsType }) => {
  const { user } = useAppContext();
  const { data } = useStore(useConversationInfoStore, (state) => state);

  const { open, onOpenChange, id, type, setKey } = props;

  const getKey = (key: string) => {
    setKey(key);

    console.log(key);
  };

  const isAdmin =
    data[id]?.chatMembers?.find((item) => item.user.id === user.id)?.role ===
    "admin";
  const isPrivate = type === "private";

  return (
    <Dropdown open={open} onOpenChange={onOpenChange}>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        sx={{
          borderRadius: "50%",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "white",
            color: "primary.700",
          },
        }}
      >
        <EllipsisVertical size={16} />
      </MenuButton>
      <Menu
        placement="right-start"
        sx={{ minWidth: 270, "--ListItemDecorator-size": "24px" }}
      >
        {menuConversation.map((item) => {
          if (item.key === "invitation") {
            if (!(isAdmin && !isPrivate)) return null;
            return (
              <div key={item.key} onClick={() => setKey(item.key)}>
                <ModalLink
                  icon={item.icon}
                  label={item.label}
                  size={18}
                  setKey={setKey}
                  chatId={id}
                />
              </div>
            );
          }

          return (
            <MenuItemCustomize
              icon={item.icon}
              key={item.key}
              label={item.label}
              handleFunc={getKey}
              size={18}
            />
          );
        })}
      </Menu>
    </Dropdown>
  );
};

export default memo(ConversationMenu);

type MenuItemCustomizeProps = {
  label: string;
  size: number;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  handleFunc: (key: string) => void;
  key: string;
  loading?: boolean;
};

export const MenuItemCustomize = ({
  label,
  icon,
  key,
  size,
  loading,
  handleFunc,
}: MenuItemCustomizeProps) => {
  const theme = useTheme();
  const Icon = icon;
  return (
    <MenuItem
      key={label}
      sx={{
        fontSize: "14px",
      }}
      onClick={() => handleFunc(key)}
      disabled={loading}
    >
      <Icon size={size} color={theme.palette.primary[800]} />
      {label}
    </MenuItem>
  );
};

export const ModalLink = ({
  chatId,
  label,
  icon,
  size,
  setKey,
}: AccountSettingsAndSecurityModalProps & { chatId: string }) => {
  const { modal, isOpen, toggle } = useModal();

  useEffect(() => {
    if (!isOpen) setKey("");
  }, [isOpen, setKey]);

  return (
    <>
      <MenuItemCustomize
        icon={icon}
        label={label}
        handleFunc={() => toggle()}
        size={size}
        key={""}
      />

      <GeneralLinkModal modal={modal} chatId={chatId} />
    </>
  );
};

const GeneralLinkModal = ({
  chatId,
  modal: ModalCommon,
}: {
  chatId: string;
  modal: ({ title, children, sx }: ModalProps) => JSX.Element;
}) => {
  const { mutateAsync, data, isPending } = useCreateInviteLink();
  const { contextHolder, openNotification } = useNotification();
  console.log("data", data);
  const handleGeneralLink = async () => {
    try {
      await mutateAsync(chatId);
    } catch (error: any) {
      console.log("error", error);
      openNotification({
        title: "Tạo link tham gia",
        description: error?.message ?? "Tạo link bị lỗi",
      });
    }
  };

  return (
    <ModalCommon title="Lấy link tham gia nhóm">
      {contextHolder}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        overflow="hidden"
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={1}
          width="100%"
        >
          {data && <InputStyled disabled value={data} />}
          <IconButtonCustomize icon={Copy} sizeIcon={16} />
        </Stack>

        <Button
          size="md"
          variant="soft"
          onClick={handleGeneralLink}
          loading={isPending}
        >
          Tạo link
        </Button>
      </Stack>
    </ModalCommon>
  );
};
