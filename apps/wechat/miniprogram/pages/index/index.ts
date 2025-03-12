// const app = getApp<IAppOption>()
const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Component({
  data: {
    data: {
      focus: false,
      inputValue: "acc",
    },
  },
  methods: {
    bindKeyInput: function (e) {
      this.setData({
        inputValue: e.detail.value,
      });
    },
  },
});
