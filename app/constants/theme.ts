import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const COLORS = {
  primary: "#2979F8",
  primaryLight: "#7BAEFF",
  secondary: "#002C72",
  success: "#0ecb81",
  danger: "#ff4a5c",
  info: "#627EEA",
  warning: "#ffb02c",
  yellow: "#fff346",
  white: "#fff",
  dark: "#2f2f2f",
  light: "#E6E6E6",

  // light
  title: "#000",
  text: "#475A77",
  background: "#EFF3FA",
  card: "#fff",
  border: "rgba(0, 0, 0, 0.10)",
  input: "#EFF3FA",
  placeholder: "rgba(71,90,119,.5)",

  // dark
  darkTitle: "#fff",
  darkText: "rgba(255,255,255,.6)",
  darkBackground: "#070C1F",
  darkCard: "#0D163D",
  darkBorder: "rgba(255,255,255,.15)",
  darkInput: "rgba(255,255,255,.1)",
  darkPlaceholder: "rgba(255,255,255,.5)",
};

export const SIZES = {
  font: 14,
  fontSm: 13,
  fontXs: 12,
  radius: 10,
  radius_lg: 20,
  radius_sm: 8,

  //space
  padding: 15,
  margin: 15,

  //Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  //App dimensions
  width,
  height,

  container: 800,
  contentArea: {
    paddingTop: 70,
    paddingBottom: 150,
  },
};
export const FONTS = {
  font: { fontSize: SIZES.font, lineHeight: 20, fontFamily: "Poppins-Regular" },
  fontSm: {
    fontSize: SIZES.fontSm,
    lineHeight: 18,
    fontFamily: "Poppins-Regular",
  },
  fontXs: {
    fontSize: SIZES.fontXs,
    lineHeight: 16,
    fontFamily: "Poppins-Regular",
  },
  h1: {
    fontSize: SIZES.h1,
    lineHeight: 48,
    color: COLORS.title,
    fontFamily: "Poppins-SemiBold",
  },
  h2: {
    fontSize: SIZES.h2,
    lineHeight: 34,
    color: COLORS.title,
    fontFamily: "Poppins-SemiBold",
  },
  h3: {
    fontSize: SIZES.h3,
    lineHeight: 28,
    color: COLORS.title,
    fontFamily: "Poppins-SemiBold",
  },
  h4: {
    fontSize: SIZES.h4,
    lineHeight: 26,
    color: COLORS.title,
    fontFamily: "Poppins-SemiBold",
  },
  h5: {
    fontSize: SIZES.h5,
    lineHeight: 24,
    color: COLORS.title,
    fontFamily: "Poppins-SemiBold",
  },
  h6: {
    fontSize: SIZES.h6,
    lineHeight: 20,
    color: COLORS.title,
    fontFamily: "Poppins-SemiBold",
  },

  fontRegular: { fontFamily: "Poppins-Regular" },
  fontMedium: { fontFamily: "Poppins-Medium" },
  fontSemiBold: { fontFamily: "Poppins-SemiBold" },
  fontBold: { fontFamily: "Poppins-Bold" },
};

export const IMAGES = {
  logo: require("../assets/images/logo.png"),
  logo2: require("../assets/images/logo2.png"),
  logo3: require("../assets/images/logo3.png"),
  email: require("../assets/images/icons/email.png"),
  lock: require("../assets/images/icons/lock.png"),
  eyeopen: require("../assets/images/icons/img-5.png"),
  eyeclose: require("../assets/images/icons/eye-close.png"),
  google: require("../assets/images/icons/google.png"),
  usename: require("../assets/images/icons/usename.png"),
  home: require("../assets/images/icons/home.png"),
  search: require("../assets/images/icons/search.png"),
  reels: require("../assets/images/icons/reels.png"),
  chat: require("../assets/images/icons/chat.png"),
  chat2: require("../assets/images/icons/chat-2.png"),
  comment: require("../assets/images/icons/comment.png"),
  like: require("../assets/images/icons/like.png"),
  like2: require("../assets/images/icons/like2.png"),
  bell: require("../assets/images/icons/bell.png"),
  more: require("../assets/images/icons/more.png"),
  plus: require("../assets/images/icons/plus.png"),
  save: require("../assets/images/icons/save.png"),
  save2: require("../assets/images/icons/save-2.png"),
  share: require("../assets/images/icons/share.png"),
  share2: require("../assets/images/icons/share2.png"),
  camera: require("../assets/images/icons/camera.png"),
  components: require("../assets/images/icons/components.png"),

  arrowleft: require("../assets/images/icons/arrow-left.png"),
  happy: require("../assets/images/icons/happy.png"),
  send: require("../assets/images/icons/send.png"),
  downarrow: require("../assets/images/icons/downarrow.png"),
  rigtharrow: require("../assets/images/icons/rightarrow.png"),
  verified: require("../assets/images/icons/verified.png"),
  about: require("../assets/images/icons/about.png"),
  theme: require("../assets/images/icons/theme.png"),
  logout: require("../assets/images/icons/logout.png"),
  login: require("../assets/images/icons/login.png"),
  user: require("../assets/images/icons/user.png"),
  pin: require("../assets/images/icons/pin.png"),
  info: require("../assets/images/icons/info.png"),
  close: require("../assets/images/icons/close.png"),
  downaeeowsmall: require("../assets/images/icons/downaeeowsmall.png"),
  close2: require("../assets/images/icons/close2.png"),
  copylink: require("../assets/images/icons/copy.png"),
  write: require("../assets/images/icons/write.png"),
  write2: require("../assets/images/icons/write2.png"),
  call: require("../assets/images/icons/call.png"),
  video: require("../assets/images/icons/video.png"),
  phone: require("../assets/images/icons/phone.png"),
  audio: require("../assets/images/icons/audio.png"),
  audiomute: require("../assets/images/icons/audiomute.png"),
  volume: require("../assets/images/icons/volume.png"),
  zoom: require("../assets/images/icons/zoom.png"),
  block: require("../assets/images/icons/block.png"),
  delete: require("../assets/images/icons/delete.png"),
  cricle: require("../assets/images/icons/cricle.png"),
  music: require("../assets/images/icons/music.png"),
  setting: require("../assets/images/icons/setting.png"),
  profilepic: require("../assets/images/icons/profilepic.png"),
  play: require("../assets/images/icons/play.png"),
  pause: require("../assets/images/icons/pause.png"),
  volumemute: require("../assets/images/icons/volumemute.png"),
  check: require("../assets/images/icons/check.png"),
  text: require("../assets/images/icons/text.png"),
  sticker: require("../assets/images/icons/sticker.png"),
  effect: require("../assets/images/icons/effect.png"),
};

const appTheme = { COLORS, SIZES, FONTS, IMAGES };

export default appTheme;
