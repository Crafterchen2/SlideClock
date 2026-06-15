const pO = 1;
const sO = 0.6;

let settings = {
  player: {
    enabled: true,
    force: false,
    pColorScale: {
      r: 0.7,
      g: 0.7,
      b: 0.7,
    },
    sColorScale: {
      r: 0.7,
      g: 0.7,
      b: 0.7,
    },
    pOpacity: pO,
    sOpacity: sO,
    width: "550px",
    height: "200px",
    bottom: "65px",
    right: "20px",
    fallbackBackground: {
      pColor: {
        r: 0,
        g: 0,
        b: 0,
        a: pO,
      },
      sColor: {
        r: 0,
        g: 0,
        b: 0,
        a: sO,
      },
    },
  },
  clock: {
    background: {
      pColor: {
        r: 97,
        g: 9,
        b: 179,
      },
      sColor: {
        r: 0,
        g: 0,
        b: 153,
      },
    },
    hoverBackground: {
      pColor: {
        r: 0,
        g: 123,
        b: 255,
      },
      sColor: {
        r: 255,
        g: 0,
        b: 150,
      },
    },
  },
  menu: {
    enabled: true,
  },
  general: {
    pTextCol: {
      r: 255,
      g: 255,
      b: 255,
    },
    sTextCol: {
      r: 128,
      g: 128,
      b: 128,
    },
    shadow: [
      {
        xOffset: "-10px",
        yOffset: "-10px",
        blurFactor: "20px",
        scaleFactor: "-5px",
        color: {
          r: 128,
          g: 128,
          b: 128,
          a: 1,
        },
      },
      {
        xOffset: "10px",
        yOffset: "10px",
        blurFactor: "20px",
        scaleFactor: "20px",
        color: {
          r: 10,
          g: 10,
          b: 10,
          a: 0.7,
        },
      },
    ],
    background: {
      r: 0,
      g: 0,
      b: 0,
      a: 0.4,
    },
    borderRadius: "8px",
    padding: "10px",
  },
};

window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    console.log(properties);
    if (properties.playerenabled) {
      settings.player.enabled = properties.playerenabled.value;
      setPlayerVisibility(settings.player.enabled);
    }
    if (properties.menuenabled) {
      settings.menu.enabled = properties.menuenabled.value;
      setMenuVisibility(settings.menu.enabled);
    }
  },
};

function applySettings() {
  let shadow = ``;
  for (i = 0; i < settings.general.shadow.length; i++) {
    element = settings.general.shadow[i];
    shadow += element.xOffset + " ";
    shadow += element.yOffset + " ";
    shadow += element.blurFactor + " ";
    shadow += element.scaleFactor + " ";
    shadow += buildRGBA(element.color);
    if (i < settings.general.shadow.length - 1) {
      shadow += ", ";
    }
  }

  e = document.querySelector("body");
  e.style.backgroundImage = buildRgbRgbLinGrad(
    settings.clock.background.pColor,
    settings.clock.background.sColor,
  );

  //Does not work: computed styles are read only.
  //e = getComputedStyle(e, 'before');
  //console.log(e);
  //colorP = settings.clock.hoverBackground.pColor;
  //colorS = settings.clock.hoverBackground.sColor;
  //e.backgroundImage = `linear-gradient(to right,
  //            rgb(${colorP.r}, ${colorP.g}, ${colorP.b}),
  //            rgb(${colorS.r}, ${colorS.g}, ${colorS.b}))`;

  //Does not work: removes "Number Pop" effect.
  //e = document.querySelectorAll('.number');
  //colorS = settings.general.sTextCol;
  //e.forEach(element => {
  //    element.style.color = `rgb(${colorS.r}, ${colorS.g}, ${colorS.b})`;
  //});

  //Does not work: computed styles are read only.
  //e = getComputedStyle(e,"pop");
  //e.color = settings.general.pTextCol;
  //e.style.backgroundColor = settings.general.background;
  //e.style.boxShadow = shadow;

  e = document.querySelectorAll(".strip");
  e.forEach((element) => {
    element.style.borderRadius = settings.general.borderRadius;
    element.style.backgroundColor = buildRGBA(settings.general.background);
    element.style.boxShadow = shadow;
  });

  e = document.querySelector(".player");
  e.style.backgroundImage = buildRgbaRgbaLinGrad(
    settings.player.fallbackBackground.pColor,
    settings.player.fallbackBackground.sColor,
  );
  e.style.boxShadow = shadow;
  e.style.width = settings.player.width;
  e.style.height = settings.player.height;
  e.style.bottom = settings.player.bottom;
  e.style.right = settings.player.right;
  e.style.padding = settings.general.padding;

  e = document.querySelector(".thumbnail");
  e.style.borderRadius = settings.general.borderRadius;
  e.style.marginRight = settings.general.padding;

  e = document.querySelector(".title");
  e.style.color = buildRGB(settings.general.pTextCol);

  e = document.querySelector(".desc");
  e.style.color = buildRGB(settings.general.sTextCol);

  e = document.querySelector(".button");
  e.style.color = buildRGB(settings.general.sTextCol);
  e.style.borderRadius = settings.general.borderRadius;
}

function buildRGBA(c) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}

function buildRGB(c) {
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

function buildRgbRgbLinGrad(p, s) {
  return `linear-gradient(to right,
                ${buildRGB(p)},
                ${buildRGB(s)})`;
}

function buildRgbaRgbaLinGrad(p, s) {
  return `linear-gradient(to right,
                ${buildRGBA(p)},
                ${buildRGBA(s)})`;
}
