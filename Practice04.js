const chiPu = {
  hatTalkToMe: function () {
    console.log('--- [hatTalkToMe] ---', this); // chiPu
    let buoiSang = () => {
      console.log('[hatTalkToMe] - buoiSang', this); // chiPu
    };
    let buoiToi = function () {
      console.log('[hatTalkToMe] - buoiToi', this); // window
    };
    buoiSang();
    buoiToi();
  },
  hatTuHomNay: () => {
    console.log('--- [hatTuHomNay] ---', this); // window
    let buoiSang = () => {
      console.log('[hatTuHomNay] - buoiSang', this); // window
    };
    let buoiToi = function () {
      console.log('[hatTuHomNay] - buoiToi', this); // window
    };
    buoiSang();
    buoiToi();
  },
};
chiPu.hatTalkToMe();
chiPu.hatTuHomNay();
