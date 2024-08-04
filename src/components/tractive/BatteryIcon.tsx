import {
  Battery0BarRounded,
  Battery1BarRounded,
  Battery20Rounded,
  Battery30Rounded,
  Battery50Rounded,
  Battery60Rounded,
  Battery80Rounded,
  Battery90Rounded,
  BatteryCharging20Rounded,
  BatteryCharging30Rounded,
  BatteryCharging50Rounded,
  BatteryCharging60Rounded,
  BatteryCharging80Rounded,
  BatteryCharging90Rounded,
  BatteryChargingFullRounded,
  BatteryFullRounded,
} from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, useMemo } from "react";

interface IProps {
  level: number;
  charging: boolean;
}

type BatteryLevel = 0 | 10 | 20 | 30 | 50 | 60 | 80 | 90 | 100;
const levels: BatteryLevel[] = [0, 10, 20, 30, 50, 60, 80, 90, 100];

const levelIconMap: Record<
  BatteryLevel,
  OverridableComponent<SvgIconTypeMap<object, "svg">>
> = {
  0: Battery0BarRounded,
  10: Battery1BarRounded,
  20: Battery20Rounded,
  30: Battery30Rounded,
  50: Battery50Rounded,
  60: Battery60Rounded,
  80: Battery80Rounded,
  90: Battery90Rounded,
  100: BatteryFullRounded,
};

const levelChargingIconMap: Record<
  BatteryLevel,
  OverridableComponent<SvgIconTypeMap<object, "svg">> | undefined
> = {
  0: undefined,
  10: undefined,
  20: BatteryCharging20Rounded,
  30: BatteryCharging30Rounded,
  50: BatteryCharging50Rounded,
  60: BatteryCharging60Rounded,
  80: BatteryCharging80Rounded,
  90: BatteryCharging90Rounded,
  100: BatteryChargingFullRounded,
};

export const BatteryIcon: FC<IProps> = ({ level, charging }) => {
  const mapToSearch = charging ? levelChargingIconMap : levelIconMap;

  const filteredMapToSearch = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(mapToSearch).filter(([, value]) => value !== undefined),
      ) as Record<
        BatteryLevel,
        OverridableComponent<SvgIconTypeMap<object, "svg">>
      >,
    [mapToSearch],
  );

  const closestLevel = useMemo(
    () =>
      levels.reduce((prev, curr) =>
        Math.abs(Number(curr) - level) < Math.abs(Number(prev) - level)
          ? curr
          : prev,
      ),
    [level],
  );

  if (closestLevel === undefined) return null;

  const Icon = filteredMapToSearch[closestLevel];

  return <Icon sx={{ transform: "rotate(90deg)", mr: 0.5 }} />;
};
