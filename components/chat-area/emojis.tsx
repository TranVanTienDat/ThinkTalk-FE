import { EMOJI } from "@/constants";
import { EmojiIcon } from "@/types";
import { Grid, Tab, TabList, TabPanel, Tabs, useTheme } from "@mui/joy";
import { Popover } from "antd";
import {
  Dog,
  HandMetal,
  Heart,
  Laugh,
  PlaneTakeoff,
  Smile,
} from "lucide-react";
import { memo } from "react";
import { IconButtonCustomize } from "../base/button-loading";

const iconTab = [
  { icon: Smile, index: 0 },
  { icon: Heart, index: 1 },
  { icon: Dog, index: 2 },
  { icon: PlaneTakeoff, index: 3 },
  { icon: HandMetal, index: 4 },
];

type TabPanelCustomizeProps = {
  data: EmojiIcon[];
  value: number;
  func: (icon: any, encode: string) => void;
};

const TabPanelCustomize = ({ data, value, func }: TabPanelCustomizeProps) => {
  return (
    <TabPanel
      value={value}
      sx={{
        padding: "10px 0",
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        {data.map((e) => {
          return (
            <button key={e.code} onClick={() => func(e.emoji, e.code)}>
              {e.emoji}
            </button>
          );
        })}
      </Grid>
    </TabPanel>
  );
};

const TabPanelCustomizeMemo = memo(TabPanelCustomize);

const EmojiTab = () => {
  const theme = useTheme();

  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ maxWidth: 200, height: 180, backgroundColor: "white" }}
      defaultValue={0}
    >
      <TabList
        sx={{
          mr: "8px",
          pr: "8px",
          borderRightWidth: "1px",
          borderRightStyle: "solid",
          borderRightColor: theme.palette.secondary[300],
        }}
        disableUnderline
      >
        {iconTab.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Tab
              disableIndicator
              key={tab.index}
              variant="plain"
              sx={{
                borderRadius: "6px",
                paddingX: "0",
                "&:not(.Mui-selected):hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <IconComponent size={18} />
            </Tab>
          );
        })}
      </TabList>

      {Object.values(EMOJI).map((e, i) => (
        <TabPanelCustomizeMemo key={i} value={i} data={e} func={() => {}} />
      ))}
    </Tabs>
  );
};

export const EmojiPopover = () => {
  return (
    <Popover content={<EmojiTab />} trigger="click">
      <IconButtonCustomize
        icon={Laugh}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      />
    </Popover>
  );
};

export default memo(EmojiPopover);
