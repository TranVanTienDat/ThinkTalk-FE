import { userApi } from "@/apiRequest/user.api";
import useModal from "@/hooks/use-modal";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Sheet,
  Stack,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LucideProps } from "lucide-react";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  useEffect,
} from "react";
export type AccountSettingsAndSecurityModalProps = {
  label: string;
  size: number;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  setKey: Dispatch<SetStateAction<string>>;
};
export default function AccountSettingsAndSecurityModal({
  label,
  icon,
  size,
  setKey,
}: AccountSettingsAndSecurityModalProps) {
  const { modal: ModalCommon, isOpen, toggle } = useModal();
  const theme = useTheme();
  const Icon = icon;

  useEffect(() => {
    if (!isOpen) setKey("");
  }, [isOpen, setKey]);

  return (
    <>
      <MenuItem
        sx={{
          fontSize: "14px",
        }}
        onClick={toggle}
      >
        <Icon size={size} color={theme.palette.primary[800]} />
        {label}
      </MenuItem>
      <ModalCommon title="Cài đặt và bảo mật">
        <DeviceInfo />
      </ModalCommon>
    </>
  );
}

const DeviceInfo = () => {
  const { mode } = useColorScheme();
  const { data } = useQuery({
    queryKey: ["get-device-information"],
    queryFn: userApi.getDeviceUser,
  });

  return (
    <Stack>
      <AccordionGroup size="md">
        <Accordion>
          <AccordionSummary>Thông tin thiết bị đăng nhập</AccordionSummary>
          <AccordionDetails>
            {data &&
              data.devices.map((item) => {
                return (
                  <Sheet
                    key={item.id}
                    sx={{
                      my: "6px",
                      p: "10px",
                      borderRadius: "6px",
                      boxShadow:
                        mode === "light"
                          ? "rgba(0, 0, 0, 0.16) 0px 1px 4px"
                          : "rgba(225, 225, 225, 0.16) 0px 1px 4px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb="4px"
                    >
                      <Typography level="body-sm" fontWeight={700}>
                        {dayjs(item.createdAt).format("DD/MM/YYYY")}
                      </Typography>

                      <Button
                        size="sm"
                        disabled
                        sx={{
                          fontSize: "12px",
                        }}
                        variant="plain"
                      >
                        Đăng xuất
                      </Button>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                      gap="16px"
                      mt="6px"
                    >
                      <Avatar src={data.avatar} />
                      <Box>
                        <Typography level="body-sm">
                          <strong>{data.fullName}</strong>
                          {` đã đăng nhập trên ${item.type}`}
                        </Typography>
                        <Typography level="body-sm" fontSize="12px">
                          Vào lúc{" "}
                          <strong>
                            {dayjs(item.createdAt).format("HH:mm")}
                          </strong>
                          . {Object.values(item.info).toString()}
                        </Typography>
                      </Box>
                    </Stack>
                  </Sheet>
                );
              })}
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Stack>
  );
};
