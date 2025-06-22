import { Agent } from "device-uuid";

export const getDevice = (du: Agent) => {
  const deviceUuid = [
    du.platform,
    du.os,
    du.cpuCores,
    du.isAuthoritative,
    du.silkAccelerated,
    du.isKindleFire,
    du.isDesktop,
    du.isTablet,
    du.isMobile,
    du.isWindows,
    du.isLinux,
    du.isLinux64,
    du.isMac,
    du.isiPad,
    du.isiPhone,
    du.isiPod,
    du.isSmartTV,
    du.pixelDepth,
    du.isTouchScreen,
  ].join(":");
  return du.hashMD5(deviceUuid);
};
