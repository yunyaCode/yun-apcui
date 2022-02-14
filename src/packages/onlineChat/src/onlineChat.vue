<template>
  <div class="C apc-chat iC secondary" :class="cls" :style="sty">
    <div class="H cH">
      <a class="back" @click="toOpinion">
        <u class="icon" v-html-xss="svg.esc"></u>
      </a>
      <i class="txt"></i>
      <a class="online" @click="toUser(true)" v-if="onlineUser>0">{{onlineUser}}</a>
    </div>

    <div class="N cN">
      <a class="apc-btn chat" @click="sendMessgCall">
        <i class="txt"></i>
      </a>
      <a class="apc-btn user none" @click="toUserHome">
        <u class="icon" v-html-xss="svg.user"></u>
        <i class="txt"></i>
      </a>
    </div>

    <div class="U" ref="chatList">
      <div class="L">
        <div class="mlist card">
          <div
            class="mChat item"
            v-for="item in msgList"
            :key="item.time"
            :class="isMine(item.source)"
          >
            <div class="author">
              <u
                class="icon"
                v-if="item.sourceIcon&&item.sourceIcon.length>3"
                :style="[{'background-image':`url(${item.sourceIcon}?x-oss-process=image/resize,m_mfit,w_640)`}]"
              ></u>

              <u class="icon" v-html-xss="svg.user" v-if="!item.sourceIcon||item.sourceIcon.length<3"></u>

              <i class="txt">{{item.sourceNick}}</i>
            </div>
            <div
              class="time"
              :class="secondTime(item.time.toString()).type"
              v-if="item.time&&secondTime(item.time.toString()).num>0"
            >
              <b class="n">{{secondTime(item.time.toString()).num}}</b>
            </div>
            <div class="content" v-html-xss="item.message"></div>
            <a
              class="del"
              v-if="isAdmin || item.source==userData.id&&$store.getters.isLogin"
              @click="del(item.id,item.source)"
            >
              <u v-html-xss="svg.del"></u>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="F cF">
      <a class="apc-btn chat" @click="sendMessgCall">
        <i class="txt"></i>
      </a>
      <a class="apc-btn user" @click="toUserHome">
        <u class="icon" v-html-xss="svg.user"></u>
        <i class="txt"></i>
      </a>
    </div>
  </div>
</template>
<script>
import loading from "../../../assets/svg/loading";
import { arrow, reply, user, del, esc } from "../../../assets/svg/index";
import { text2emoji, emoji } from "../../../assets/svg/emoji";
import {
  addChat,
  chatContent,
  delChat,
  openOnline
} from "../../../../../lib/server/chat";
import { mapGetters } from "vuex";

export default {
  name: "apc-onlineChat",
  data() {
    return {
      loading,
      arrow,
      reply,
      svg: {
        user,
        del,
        esc
      },
      webSocket: null,
      isAdmin: false,
      userData: { id: null },
      onlineUser: 0,
      heartBeat: null,
      initOnlineUserMax: false
    };
  },
  props: {
    cls: {
      type: String,
      default: ""
    },
    sty: {
      type: String,
      default: ""
    },
    roomId: String,
    sectionId: String,
    timeData: String,
    user: {
      type: Object,
      default: null
    },
    loginSwitch: {
      type: Boolean,
      default: false
    },
    showChats: {
      type: Boolean,
      default: true
    },
    orgId: {
      type: String,
      default: ""
    }
  },
  created() {
    // this.roomId = Date.parse(new Date("2020-02-29 14:28:00.0"));
    // if (this.timeData) {
    //   this.roomId = Date.parse(new Date(this.timeData));
    // }
    this.initOnlineSize();
  },

  watch: {
    user: {
      immediate: true,
      handler() {
        // 是否课程管理员
        this.isAdmin = this.isAdmin_Super();

        // 获取聊天数据

        if (this.showChats) {
          this.getDataList();
        }

        if (!(this.user && this.user.id)) return; // 如果没有用户信息，则不初始化WebSocket

        this.userData = this.user;

        this.user.getSessionId.then(res => this.init(res));
      }
    },
    "onlineChatUser.time": function() {
      this.initOnlineSize();
    }
  },
  methods: {
    initOnlineSize() {
      let users = this.$store.getters.onlineChatUser.users[this.roomId] || {
        number: 1,
        list: []
      };

      this.onlineUser = users.number || 1;
    },
    strToHexCharCode(str) {
      if (str === "") return "";
      var hexCharCode = [];
      for (var i = 0; i < str.length; i++) {
        hexCharCode.push(str.charCodeAt(i).toString(2));
      }
      return hexCharCode.join("");
    },
    isMine(id) {
      if (id == this.userData.id) {
        return "me";
      }
    },

    init(sessionId, call = null) {
      if (window.WebSocket) {
        const webSocketMap = this.$store.getters.webSocket;

        let websocket = webSocketMap[this.roomId]; // 获得WebSocket对象

        if (!websocket) {
          // websocket = new WebSocket("wss://localhost:8088/edu/chat"); // 获得WebSocket对象
          websocket = new WebSocket("wss://wss-edu.dingtax.cn/edu/chat"); // 获得WebSocket对象
          this.$store.dispatch("webSocket", {
            id: this.roomId,
            webSocket: websocket,
            user: this.userData
          });
        }

        this.webSocket = websocket;

        // 当有消息过来的时候触发
        websocket.onmessage = ev => this.hasMessage(ev);

        let _this = this;
        // 连接关闭的时候触发
        websocket.onclose = event => {
          console.log("onclose");
          _this.$store.getters.webSocket[_this.roomId] = null;
          _this.webSocket = null;

          _this.user.getSessionId.then(res => _this.init());
        };

        // 连接打开的时候触发
        websocket.onopen = event => {
          websocket.send(
            `5|${this.userData.id}|null|null|null|null|null|null|${sessionId}`
          );
          this.joinChat(call);
        };
      } else {
        alert("浏览器不支持WebSocket");
      }
    },

    getDataList(call = null) {
      chatContent({ roomId: this.sectionId }).then(res => {
        if (typeof res === "object") {
          const list = [];
          for (const key in res) {
            const mapData = res[key];
            // console.log('chatContent>>>>>>>>>>keu=', key);

            mapData.id = key;
            list.push(mapData);
          }

          if (list.length === 0) return;
          // console.log('chatContent>>>>>>>>>>list=', list);

          // 先清除聊天记录
          this.$store.dispatch("edit0nlineChatData", "clear");
          // 再加载数据
          this.$store.dispatch("edit0nlineChatData", list);

          if (typeof call === "function") call();

          const that = this;
          setTimeout(() => {
            that.$refs.chatList.scrollTop = that.$refs.chatList.scrollHeight;
          }, 100);
        }
      });
    },
    // 有消息触发
    hasMessage(e) {
      const msg = e.data;
      const msgArr = msg.split("|");

      const type = msgArr[0];
      //用户广播发言
      if (type === "1" && msgArr[6] !== "null" && msgArr.length > 6) {
        const form = {
          id: msgArr[5].split("_")[1],
          type,
          source: msgArr[1],
          target: this.roomId,
          sourceNick: msgArr[3],
          sourceIcon: msgArr[4],
          time: msgArr[5].split("_")[0],
          message: text2emoji(msgArr[6], emoji)
        };

        const removeInfo = this.isRemoveInfo(msgArr[6]);

        if (removeInfo) {
          this.$store.dispatch("del0nlineChatData", {
            id: removeInfo[1],
            time: removeInfo[2]
          });
          return;
          // 删除数据
        }
        // 添加数据
        this.$store.dispatch("edit0nlineChatData", [form]);

        const that = this;

        setTimeout(() => {
          that.$refs.chatList.scrollTop = that.$refs.chatList.scrollHeight;
        }, 100);
      } else if (type === "2") {
        //获取在线用户列表

        this.$store.dispatch("onlineChatUser", {
          users: msgArr[6],
          roomId: this.roomId
        });
      } else if (type === "8") {
        //用户上线
        this.$store.dispatch("onlineChatUser", {
          number: msgArr[6] || 1,
          roomId: this.roomId
        });

        if (this.initOnlineUserMax) {
          openOnline({
            sectionId: this.sectionId,
            maxOnLine: msgArr[6] || 1
          });
        }
        //防止接口因为他人上线而触发
        this.initOnlineUserMax = false;

        this.$emit("loadChat", this.webSocket);
      } else if (type === "9") {
        //用户下线
        this.onlineUser--;
        this.$store.dispatch("onlineChatUser", {
          number: this.onlineUser || 0,
          roomId: this.roomId
        });

        // this.$store.dispatch("onlineChatUser", {
        //   userId: msgArr[1],
        //   roomId: this.roomId,
        //   type: "del"
        // });
      }
    },
    // 发送信息
    sendMessage(msg = null, del = false) {
      // 判断消息是否为空或者是否必须登录

      if (msg === null || (this.loginSwitch && !this.$store.getters.isLogin))
        return;

      //初始化webSocket

      const send = () => {
        // 发送信息的占位符【发送类型{0:单播，1：广播，2：管理员通知【在线用户列表】，3：加入房间，4：退出房间，5：认证,8:上线，9：下线}，来源{用户id|广播情况下需要房间id}，目标，昵称，头像，当前时间，发送的信息,登录者的sessionId】7个参数，位置不能错
        const ws = this.webSocket;
        if (window.WebSocket && ws) {
          const time = new Date().getTime();
          if (ws.readyState === ws.OPEN) {
            // 如果WebSocket是打开状态
            const form = {
              type: 1,
              source: this.userData.id,
              target: this.sectionId,
              sourceNick: `${this.getCname(this.userData.nick)}`,
              sourceIcon: this.userData.logo || "",
              time,
              message: text2emoji(msg, emoji)
            };

            // console.log("addChat=====form", form);
            if (!del) {
              // 添加消息
              addChat(form).then(res => {
                ws.send(
                  `1|${this.userData.id}|${this.roomId}|${`${this.getCname(
                    this.userData.nick
                  )}`}|${this.userData.logo}|${time}_112|${msg}|null|null`
                );
              });
            } else {
              // 删除消息
              ws.send(
                `1|${this.userData.id}|${this.roomId}|${this.userData.nick}|${this.userData.logo}|${time}|${msg}|null|null`
              );
            }
          }
          console.log(
            "ws.readyState=",
            ws.readyState,
            "[发送信息：",
            `1|${this.userData.id}|${this.roomId}|${this.userData.nick}|${this.userData.logo}|${time}|${msg}`
          );
        } else {
          return null;
        }
      };

      if (!this.webSocket) {
        this.user.getSessionId.then(res =>
          this.init(res, cll => {
            send();
          })
        );

        return;
      }

      send();
    },
    getCname(nick) {
      let cname = window.returnCitySN.cname;

      cname = cname.split("省")[1] || cname;

      nick += ` (${cname})`;
      // 判断是否是游客[判断用户id长度不会超过10]
      if (this.userData.id.length > 10) {
        // cname += '观众';
        nick = `游客_${nick}`;
      }

      return nick;
    },
    // 加入房间
    joinChat(call) {
      const time = new Date().getTime();
      const ws = this.webSocket;

      if (window.WebSocket) {
        if (ws.readyState === ws.OPEN) {
          // 如果WebSocket是打开状态
          // 加入房间需要显示具体位置
          const nick = `${this.getCname(this.userData.nick)}`;

          ws.send(
            `3|${this.userData.id}|${this.roomId}|${nick}|${this.userData.logo +
              `?orgId=${this.orgId}`}|${time}|null|null|null`
          );

          this.initOnlineUserMax = true;

          //添加心跳功能
          this.initHeartBeat();
          //为了防止掉线【每秒钟主动请求一次】

          if (typeof call === "function") {
            call();
            // setTimeout(() => {
            //   call();
            // }, 500);
          }
        }
      } else {
        return null;
      }
    },
    secondTime(t) {
      const time = new Date().getTime();

      let tn = parseInt((time - t) / 1000);

      let type = "second";

      if (tn > 60) {
        type = "minute";
        tn = parseInt(tn / 60);
      }

      return { type, num: tn };
    },

    // 发送消息回调
    sendMessgCall() {
      const _this = this;

      this.$emit("sendMessage", data => {
        // 防止用户调用socket功能恶意删除数据
        if (!this.isRemoveInfo(data)) {
          _this.sendMessage(data);
        }
      });
    },

    // 校验删除操作
    isRemoveInfo(data = "") {
      const removeKey = data.split("_");

      // 如果数据格式为：【删除_{number}_{number}】
      if (
        removeKey.length === 3 &&
        (removeKey[0] === "删除" ||
          Number(removeKey[1]) ||
          Number(removeKey[2]))
      ) {
        return removeKey;
      }

      return false;
    },

    // 删除发言
    async del(id, sourceId) {
      // 检查是否需要登录
      if (this.loginSwitch) {
        // 检测是如登录并且拉起登录窗口
        const doLogin = await this.$store.dispatch("doLogin");

        if (!doLogin) return false;
      }

      // 需要校验删除权限【1：删除他人需要课程管理员校验，2：删除自己需要登录对象校验】

      const userInfo = this.user;

      if (
        (this.loginSwitch &&
          this.$store.getters.isLogin &&
          userInfo &&
          userInfo.id) ||
        !this.loginSwitch
      ) {
        // 是否自己的发言
        const isMyInfo = userInfo.id == sourceId && this.$store.getters.isLogin; // 游客不能删除

        // 是否课程管理员
        this.isAdmin = this.isAdmin_Super();

        if (isMyInfo || this.isAdmin) {
          // 1：走后端删除接口

          delChat({ data: { target: this.sectionId, key: id } });

          // 2：走广播删除客户端数据

          const time = new Date().getTime(); // 这个time是用来防止用户发送删除信息来模拟删除广播【该time】

          this.sendMessage(`删除_${id}_${time}`, true);
        }
      }
    },

    // 判断是否管理员【包含超管】

    isAdmin_Super() {
      const getters = this.$store.getters;

      let ism = false;

      if (
        getters.userInfo &&
        getters.userInfo.roleList &&
        getters.userInfo.roleList.length > 0
      ) {
        getters.userInfo.roleList.map(item => {
          if (item.role >= 39 && item.orgId === getters.contentDetail.orgId) {
            ism = true;
          }
        });
      }

      if (getters.userInfo && getters.userInfo.role === 50) {
        ism = true;
      }

      return ism;
    },
    toOpinion() {
      this.$parent.$parent.choose(0);
    },
    toUser(choose = false) {
      let ws = this.webSocket;
      if (ws && ws.readyState === ws.OPEN) {
        try {
          ws.send(
            `2|${this.userData.id}|${this.roomId}|null|null}|null|null|null|null`
          );
        } catch (e) {}
        if (choose) {
          this.$parent.$parent.choose(2);
        }
      }
    },
    async toUserHome() {
      const doLogin = await this.$store.dispatch("doLogin", () => {});
      if (!doLogin) return;
      this.$router.push("/home");
    },
    initHeartBeat() {
      //心跳功能【处理用户长时间不操作掉线处理】
      clearInterval(this.heartBeat);
      // this.heartBeat
      if (window.WebSocket) {
        let ws = this.webSocket;
        if (ws) {
          //判断当前ws是否正常在线中
          if (ws.readyState === ws.OPEN) {
            this.heartBeat = setInterval(() => {
              ws.send(
                `0|${this.userData.id}|${this.roomId}|null|null}|null|null|null|null`
              );
            }, 50000);
          }
        }
      }
    }
  },

  computed: {
    msgList() {
      let arr = this.$store.getters.onlineChatData;

      // 先模拟id【后续必须删除】
      // arr.map((item, i) => item.id = `${item.time}-${++i}`);

      const obj = {};
      arr = arr.reduce((item, next) => {
        obj[next.time] ? "" : (obj[next.time] = true && item.push(next));
        return item;
      }, []);

      return arr;
    },
    ...mapGetters(["onlineChatUser"])
  },

  // 销毁时关闭通信
  destroyed() {
    // Object.defineProperty();
    // if (this.webSocket && this.webSocket.readyState === this.webSocket.OPEN) { // 如果WebSocket是打开状态
    //   this.webSocket.send(`4|${this.userData.id}|${this.roomId}|null|null|null|null|null|null`);
    // }
  }
};
</script>

<style>
.mChat .del {
  top: 1.25rem !important;
  right: 2.2rem !important;
}

.mChat.me .del {
  left: 2.2rem !important;
}
</style>
