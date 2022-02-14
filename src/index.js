import Bar from './packages/bar';
import Btn from './packages/btn';
import Checkbox from './packages/checkbox';
import Calendar from './packages/calendar';
import Input from './packages/input';
import Load from './packages/load';
import Loading from './packages/loading';
import M from './packages/m';
import Star from './packages/star';
import Switch from './packages/switch';
import Toast from './packages/toast';
import Textarea from './packages/textarea';
import Map from './packages/map';
import Region from './packages/region';
import Video from './packages/video';
import Time from './packages/time';
import VideoAly from './packages/video-aly';
import Switcher from './packages/switcher';
// import Mitem from './packages/mItem';
import onlineChat from './packages/onlineChat';
import nodata from './packages/nodata';
import confirm from './packages/confirm';
import main from './app.vue';

const version = '1.0.0';
const install = function (Vue) {
  if (install.installed) return;

  Vue.component(Bar.name, Bar);
  Vue.component(Btn.name, Btn);
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(Calendar.name, Calendar);
  Vue.component(Input.name, Input);
  Vue.component(Load.name, Load);
  Vue.component(Loading.name, Loading);
  Vue.component(M.name, M);
  Vue.component(Star.name, Star);
  Vue.component(Switch.name, Switch);
  Vue.component(Toast.name, Toast);
  Vue.component(Textarea.name, Textarea);
  Vue.component(Map.name, Map);
  Vue.component(Region.name, Region);
  Vue.component(Video.name, Video);
  Vue.component(Time.name, Time);
  Vue.component(VideoAly.name, VideoAly);
  Vue.component(Switcher.name, Switcher);
  // Vue.component(Mitem.name, Mitem);
  Vue.component(onlineChat.name, onlineChat);
  Vue.component(nodata.name, nodata);
  Vue.component(confirm.name, confirm);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
  version,
  Bar,
  Btn,
  Checkbox,
  Calendar,
  Input,
  Load,
  Loading,
  M,
  Star,
  Switch,
  Toast,
  Textarea,
  Map,
  Region,
  Video,
  Time,
  VideoAly,
  Switcher,
  // Mitem,
  onlineChat,
  nodata,
  confirm,
};
