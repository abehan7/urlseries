const methods = {
  multi: (className) => {
    const scrolls = document.querySelectorAll(`.${className}`);
    scrolls.forEach((val) => {
      val.scrollTop !== 0 && val.scrollTo(0, 0);
    });
  },

  one: (className) => {
    const scroll = document.querySelector(`.${className}`);
    scroll.scrollTop !== 0 && scroll.scrollTo(0, 0);
  },
};

export const scrollUp = (className) => {
  methods.one(className);
};
export const TopMoreScrollUp = () => {
  methods.one("more-content");
  // console.log(scroll.scrollTop);
};

export const TopTwoRectsEditModeScrollUp = () => {
  methods.multi("text-container");
};

export const HashtagModalScrollUp = () => {
  methods.multi("flexWrapBox");
};
