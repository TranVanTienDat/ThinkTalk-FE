"use client";
import Loading from "@/components/base/Loading";
import { useMessageHandler } from "@/context/message-handler-context";
import { useSearchUsers } from "@/hooks/use-search-users";
import { Avatar, Box, Sheet, Stack, Typography, useTheme } from "@mui/joy";
import { Select, SelectProps, Tag } from "antd";
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";

export type Option = {
  value: string;
  label: string;
  avatar?: string;
  nickname?: string;
  chatId?: string;
};

export default function NewConversation() {
  const { getUserNewGroup } = useMessageHandler();
  const [value, setValue] = useState<string>("");
  const [search] = useDebounce(value, 500);

  const { data, isLoading } = useSearchUsers({ search });
  const onSearch = useCallback((value: string) => {
    setValue(value);
  }, []);

  const users: Option[] = (data?.data || []).map((u: any) => ({
    value: u.id,
    label: u.fullName,
    avatar: u?.avatar,
    nickname: u?.nickname,
    chatId: u?.chatId,
  }));

  const handleChange = useCallback(
    (value: string[], option: Option[]) => {
      getUserNewGroup(option);
    },
    [getUserNewGroup]
  );

  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <Box>Gửi đến:</Box>
      <Select
        autoFocus
        mode="multiple"
        size="large"
        variant="borderless"
        filterOption={false}
        notFoundContent={isLoading ? <Loading /> : "Không tìm thấy"}
        onSearch={onSearch}
        onChange={handleChange as any}
        placeholder="Nhập bạn bè"
        options={users}
        optionRender={(option) => <FormatRender option={option} />}
        className="flex-1 max-w-[300px]"
        tagRender={tagRender}
        suffixIcon={null}
        maxTagCount="responsive"
      />
    </Sheet>
  );
}

const FormatRender = ({ option }: { option: any }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" gap="6px">
      <Avatar size="md" src={option.data?.avatar} alt={option.data.fullName} />
      <Stack direction="column" justifyContent="space-between">
        <Typography
          level="body-xs"
          textColor={theme.palette.secondary[200]}
          sx={{
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          {option.data.label}
        </Typography>
        <Typography
          level="body-xs"
          textColor={theme.palette.primary[700]}
          sx={{
            fontWeight: "600",
          }}
        >
          {option.data?.nickname}
        </Typography>
      </Stack>
    </Stack>
  );
};

type TagRender = SelectProps["tagRender"];

const tagRender: TagRender = (props) => {
  const { label, closable, onClose } = props;

  function getRandomColor(): string {
    const colors = ["gold", "lime", "green", "cyan"];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={getRandomColor()}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4, fontWeight: 600, fontSize: "14px" }}
    >
      {label}
    </Tag>
  );
};
