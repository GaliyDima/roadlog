export const getProjectStyles = (color: string) => {
  switch (color) {
    case "#005bd6":
      return {
        background: "#F2F8FF",
        timelinePast: "#005BD6",
        timelineFuture: "#CBE1FF",
        timelinePresent: "#B7CEED",
      };
    case "#128744":
      return {
        background: "#F8FFFB",
        timelinePast: "#128744",
        timelineFuture: "#D9EEE2",
        timelinePresent: "#ACD8BE",
      };
    case "#ea4335":
      return {
        background: "#FFF9F9",
        timelinePast: "#EA4335",
        timelineFuture: "#FFE9EC",
        timelinePresent: "#F1C7CD",
      };
    case "#fbbc05":
      return {
        background: "#FFFDF6",
        timelinePast: "#FBBC05",
        timelineFuture: "#FCF0CD",
        timelinePresent: "##FFE390",
      };
    default:
      return {
        background: "#ffffff",
        timelinePast: "#000000",
        timelineFuture: "#000000",
        timelinePresent: "#000000",
      };
  }
};
