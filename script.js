let maincont;
let ships;
let changelog;
let identid;
let identmain;
let language;
let languageid;
let f1 = undefined;
let f2 = undefined;
let f3 = undefined;
let f4 = undefined;
let f5 = undefined;
let arraysobj = {};
let changeloglastupdatedate;

async function langcookieread() {
 let cookieread = Cookies.get('language')
 return cookieread
}

function changelognotify() {
  if (Cookies.get('changelog') == undefined || Cookies.get('changelog') != changeloglastupdatedate) {
    document.getElementsByClassName("notification")[0].style.display = "block"
   }
}

async function languageselector() {
  document.getElementsByClassName("main")[0].style.display = "block"
  document.getElementsByClassName("main")[0].style.position = "unset"
  document.getElementsByClassName("bannertwo")[0].style.display = "none"
  document.getElementsByClassName("topbanner")[0].style.position = "inherit"
  htmldombuilder("div", "mainlanguageselector", {
    style: {
      top: "50%",
      left: "50%",
      margin: "-200px 0px 0px -285.79px",
      position: "absolute"
    }
  }, document.getElementsByClassName("main")[0])
  htmldombuilder("div", "languageselector", {
    style: {
      color: "white",
      textAlign: "center",
      fontSize: "50px",
      marginBottom: "35px"
    },
    addon: {
      innerText: "Please choose a language."
    }
  }, document.getElementsByClassName("mainlanguageselector")[0])
  htmldombuilder("div", "languagemain", {
    style: {
      marginLeft: "30.79px"
    }
  }, document.getElementsByClassName("mainlanguageselector")[0])
  htmldombuilder("img", "langen", {
    addon: {
      src: "Assets/LanguageFlags/English.svg"
    }
  }, document.getElementsByClassName("languagemain")[0])
  htmldombuilder("img", "langjp", {
    addon: {
      src: "Assets/LanguageFlags/Japanese.svg"
    }
  }, document.getElementsByClassName("languagemain")[0])
  htmldombuilder("img", "langkr", {
    addon: {
      src: "Assets/LanguageFlags/Korean.svg"
    }
  }, document.getElementsByClassName("languagemain")[0])
  htmldombuilder("img", "langcn", {
    addon: {
      src: "Assets/LanguageFlags/Chinese.svg"
    }
  }, document.getElementsByClassName("languagemain")[0])
  let langchange = document.querySelectorAll(".langen, .langjp, .langkr, .langcn");
  langchange.forEach(function (langadd) {
    langadd.addEventListener(
      "click",
      function () {
        setcookie(this.classList[0]);
      },
      false
    );
  });
}

async function setcookie(a1) {
  let str = a1.replace("lang", "")
  Cookies.set('language', str, { expires: 365 })
  languageid = str
  document.getElementsByClassName("main")[0].removeAttribute("style")
  document.getElementsByClassName("bannertwo")[0].removeAttribute("style")
  document.getElementsByClassName("topbanner")[0].removeAttribute("style")
  loaddata()
}

async function setcookieghost(a1) {
  let str = a1.replace("lang", "")
  Cookies.set('language', str, { expires: 365 })
  languageid = str
}

function scrollwidth() {
  if (window.scrollX <= 5000) {
  document.querySelector(".topbanner").style.left = window.scrollX + "px"
  document.querySelector(".bannertwo").style.left = window.scrollX + "px"
}
}

window.onload = async function () {
  let languagecheck = await langcookieread()
  if (languagecheck == undefined) {
    languageselector()
  } else {
    languageid = languagecheck
    loaddata()
  }
  window.addEventListener(
    "scroll",
    function () {
      scrollwidth();
    },
    false
  );

};

async function loaddata() {
  ships = await getjson("ships");
  changelog = await getjson("changelog");
  changeloglastupdatedate = Object.entries(changelog)[(Object.entries(changelog).length - 1)][1].updatedate
  changelognotify()
  let openChangelogButtons = document.querySelectorAll('[data-changelog-target]')
  let closeChangelogButtons = document.querySelectorAll('[data-close-button]')
  let overlay = document.getElementById('overlay')
  openChangelogButtons.forEach(button => {
    button.addEventListener('click', () => {
      const changelog = document.querySelector(button.dataset.changelogTarget)
      openChangelog(changelog)
    })
  })

  overlay.addEventListener('click', () => {
    const changelogs = document.querySelectorAll('.changelog.active')
    changelogs.forEach(changelog => {
      closeChangelog(changelog)
    })
  })

  closeChangelogButtons.forEach(button => {
    button.addEventListener('click', () => {
      const changelog = button.closest('.changelog')
      closeChangelog(changelog)
    })
  })

  fillchangelog(changelog, "changelog-body-left")
  let changelogleftitems = document.querySelectorAll(".changelog-body-left .item")
  nodrag("changelog-body-left");
  changelogleftitems.forEach(function (itemadd) {
    itemadd.addEventListener(
      "click",
      function () {
        getchangelog(this.id);
      },
      false
    );
  });

  maincont = document.getElementsByClassName("main")[0];

  let gethulltype = document.querySelectorAll(".hulltypefilter");
  nodrag("hulltypefilter");
  gethulltype.forEach(function (hulltypeadd) {
    hulltypeadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "hulltypefilter");
      },
      false
    );
  });
  let rarityfilter = document.querySelectorAll(".rarityfilter");
  nodrag("rarityfilter");
  rarityfilter.forEach(function (rarityadd) {
    rarityadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "rarityfilter");
      },
      false
    );
  });
  let tagfilter = document.querySelectorAll(".tagfilter_en, .tagfilter_cn");
  nodrag("tagfilter_en");
  nodrag("tagfilter_cn");
  tagfilter.forEach(function (tagadd) {
    tagadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "tagfilter");
      },
      false
    );
  });
  let tierfilter = document.querySelectorAll(".tierfilter");
  nodrag("tierfilter");
  tierfilter.forEach(function (tieradd) {
    tieradd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "tierfilter");
      },
      false
    );
  });
  let nationalityfilter = document.querySelectorAll(".nationality");
  nodrag("nationality");
  nationalityfilter.forEach(function (nationalityadd) {
    nationalityadd.addEventListener(
      "click",
      function () {
        mutifiltercheck(this.id, "nationality", this.classList[1]);
      },
      false
    );
  });
  // Namechange selector
  let langchange = document.querySelectorAll(".lang");
  langchange.forEach(function (langadd) {
    langadd.addEventListener(
      "click",
      function () {
        shipnamecheck(this.classList[1], this.id);
      },
      false
    );
  });
  buildhtmlall();

  function nodrag(a1) {
    var images = document.getElementsByClassName(a1);
    var i;
    for (i = 0; i < images.length; i++) {
      var addnodrag = images[i];
      if (addnodrag.draggable == true) {
        addnodrag.draggable = false;
      }
    }
  }
}

function fillchangelog(a1, a2) {
  var i = Object.entries(a1).length;
  while (i--) {
    var date = new Date(a1[Object.entries(a1)[i][0]].updatedate * 1000);
    let formateddate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear()
    htmldombuilder("div", "item", {
      addon: {
        innerHTML: `<span>#${a1[Object.entries(a1)[i][0]].number} <br> ${formateddate}</span>`,
        id: "item_" + a1[Object.entries(a1)[i][0]].number
      },
      style: {
        backgroundImage: `url("Assets/Misc/UsagiThumbnails/${a1[Object.entries(a1)[i][0]].number}.png")`
      }
    }, document.getElementsByClassName(a2)[0])
  }
}

function htmldombuilder(a1, a2, a3, a4) {
  let a = document.createElement(a1);
  a.className = a2;
  a.draggable = false;
  if (a1 == "img") {
    a.alt = ""
  }
  if (a3 != undefined) {
    if (a3.style != undefined) {
      for (let i = 0; i < Object.entries(a3.style).length; i++) {
        a.style[Object.entries(a3.style)[i][0]] = a3.style[Object.entries(a3.style)[i][0]];
      }
    }
    if (a3.addon != undefined) {
      for (let i = 0; i < Object.entries(a3.addon).length; i++) {
        if (Object.entries(a3.addon)[i][0] == "text") {
          let ttext = tiertext(a3.addon[Object.entries(a3.addon)[i][0]]);
          a.innerHTML = ttext
        }
        if (Object.entries(a3.addon)[i][0] == "innerHTML") {
          a.innerHTML = a3.addon[Object.entries(a3.addon)[i][0]]
        }
        if (Object.entries(a3.addon)[i][0] == "innerText") {
          a.innerText = a3.addon[Object.entries(a3.addon)[i][0]]
        }
        if (Object.entries(a3.addon)[i][0] == "src") {
          a.src = a3.addon[Object.entries(a3.addon)[i][0]]
        }
        if (Object.entries(a3.addon)[i][0] == "href") {
          a.href = a3.addon[Object.entries(a3.addon)[i][0]]
          a.target = "_blank"
          a.rel = "noopener"
          a.ariaLabel = a2
        }
        if (Object.entries(a3.addon)[i][0] == "id") {
          a.id = a3.addon[Object.entries(a3.addon)[i][0]]
        }
      }
    }
  }
  if (a4 != undefined) {
    a4.appendChild(a)
  } else {
    maincont.appendChild(a)
  }
}

function spantextbuild(a1, a2, a3) {
  for (let ii = 0; ii < 4; ii++) {
    let spanclassname
    let spanfontsize
    let spanlineheight
    switch (ii) {
      case 0:
        language = "en";
        lang = "en";
        break;
      case 1:
        language = "jp";
        lang = "jp";
        break;
      case 2:
        language = "cn";
        lang = "cn";
        break;
      case 3:
        language = "kr";
        lang = "kr";
        break;
    }
    if (a1[language] == null) {
      lang = "en";
      textcheck = texthandler(
        a2[lang].length,
        a2[lang],
        lang
      );
    } else {
      textcheck = texthandler(
        a1[lang].length,
        a1[lang],
        language
      );
    }
    if (textcheck.className != undefined) {
      spanclassname = textcheck.className;
    }
    if (textcheck.fontSize != undefined) {
      spanfontsize = textcheck.fontSize;
    }
    if (textcheck.lineHeight != undefined) {
      spanlineheight = textcheck.lineHeight;
    }
    htmldombuilder("span", spanclassname, {
      style: {
        fontSize: spanfontsize,
        lineHeight: spanlineheight
      },
      addon: {
        innerHTML: a1[lang]
      }
    }, a3.getElementsByClassName("text_" + language)[0])
  }
}

function getchangelog(a1) {
  a1 = a1.replace("item_", "")
  document.querySelectorAll(".item").forEach((e) => {
    if (e.id.includes(a1)) {
      if (!e.classList.contains("active")) {
        e.classList.add("active");
      }
    } else {
      if (e.classList.contains("active")) {
      e.classList.remove("active")
    }
  }
    })
  if (isNaN(a1) == false) {
    a1 = a1
  } else {
    a1 = this.value
  }

  document.getElementsByClassName("changelogmainbody")[0].innerHTML = "";
  document.getElementsByClassName("changelogmainheader")[0].innerHTML = "";
  document.getElementsByClassName("changelogbuttons")[0].innerHTML = "";
  
  htmldombuilder("div", "changelogtext", {
    addon: {
      text: changelog[a1].fullname
    }
  }, document.getElementsByClassName("changelogmainheader")[0])

  if (!changelog[a1].changes.new.length < 1) {
  htmldombuilder("button", "changelog-added-button", {
    addon: {
      innerText: "Added"
    }
  }, document.getElementsByClassName("changelogbuttons")[0])

  document.getElementsByClassName("changelog-added-button")[0].addEventListener(
    "click",
    function () {
      changedomanactive(this.innerText, "changelogmainblock");
    },
    false
  );
}

if(changelog[a1].changes.support != undefined) {
if (!changelog[a1].changes.support.length < 1) {
  htmldombuilder("button", "changelog-support-button", {
    addon: {
      innerText: "Support"
    }
  }, document.getElementsByClassName("changelogbuttons")[0])

  document.getElementsByClassName("changelog-support-button")[0].addEventListener(
    "click",
    function () {
      changedomanactive(this.innerText, "changelogmainsupport");
    },
    false
  );
}
}

if (!changelog[a1].changes.promotions.length < 1) {
  htmldombuilder("button", "changelog-promotions-button", {
    addon: {
      innerText: "Promotions"
    }
  }, document.getElementsByClassName("changelogbuttons")[0])

  document.getElementsByClassName("changelog-promotions-button")[0].addEventListener(
    "click",
    function () {
      changedomanactive(this.innerText, "changelogmainpromotions");
    },
    false
  );
}

if (!changelog[a1].changes.promotions.length < 1) {
  htmldombuilder("button", "changelog-demotions-button", {
    addon: {
      innerText: "Demotions"
    }
  }, document.getElementsByClassName("changelogbuttons")[0])

  document.getElementsByClassName("changelog-demotions-button")[0].addEventListener(
    "click",
    function () {
      changedomanactive(this.innerText, "changelogmaindemotions");
    },
    false
  );
}

  function changedomanactive(a1, a2) {
    document.querySelectorAll(".changelogbuttons button").forEach((e) => {
      if (e.innerText == a1) {
        if (!e.classList.contains("active")) {
          e.classList.add("active");
        }
      } else {
        if (e.classList.contains("active")) {
        e.classList.remove("active")
      }
    }
    })
    aeds1(a2)
  }

  function aeds1(a1) {
    document.querySelectorAll(".changelogmainbody [class^=changelogmain]").forEach((e) => {
      if (e.classList.contains(a1)) {
        if (!e.classList.contains("active")) {
        e.classList.add("active");
        }
      } else {
        if (e.classList.contains("active")) {
        e.classList.remove("active")
      }
    }
    })
  }


  htmldombuilder("div", "changelogmainblock", undefined, document.getElementsByClassName("changelogmainbody")[0])

  htmldombuilder("div", "changelogmainsupport", undefined, document.getElementsByClassName("changelogmainbody")[0])

  htmldombuilder("div", "changelogmainpromotions", undefined, document.getElementsByClassName("changelogmainbody")[0])

  htmldombuilder("div", "changelogmaindemotions", undefined, document.getElementsByClassName("changelogmainbody")[0])

  function getindexforship(b1, b2, b3, b4, b5, b6) {
    for (let a = 0; a < 8; a++) {
      if (ships[b2][Object.entries(ships[b2])[a][0]] != undefined) {
    for (let i = 0; i < ships[b2][Object.entries(ships[b2])[a][0]].length; i++) {
      if (ships[b2][Object.entries(ships[b2])[a][0]][i].names.en == b1) {
        buildchangelogships(b2, b3, i, b4, b5, b6, Object.entries(ships[b2])[a][0])
      }
    }
  }
}
  }

  for (let i = 0; i < changelog[a1].changes.new.length; i++) {
    getindexforship(changelog[a1].changes.new[i].shipname, changelog[a1].changes.new[i].shiptype, changelog[a1].changes.new[i].changedrank, i, "new")
  }

  if(changelog[a1].changes.support != undefined) {
  for (let i = 0; i < changelog[a1].changes.support.length; i++) {
    getindexforship(changelog[a1].changes.support[i].shipname, changelog[a1].changes.support[i].shiptype, changelog[a1].changes.support[i].changedrank, i, "support")
  }
}

  for (let i = 0; i < changelog[a1].changes.promotions.length; i++) {
    getindexforship(changelog[a1].changes.promotions[i].shipname, changelog[a1].changes.promotions[i].shiptype, changelog[a1].changes.promotions[i].changedrank, i, "promotions", changelog[a1].changes.promotions[i].oldrank)
  }

  for (let i = 0; i < changelog[a1].changes.demotions.length; i++) {
    getindexforship(changelog[a1].changes.demotions[i].shipname, changelog[a1].changes.demotions[i].shiptype, changelog[a1].changes.demotions[i].changedrank, i, "demotions", changelog[a1].changes.demotions[i].oldrank)
  }

  function buildchangelogships(a1, a2, i, b4, b5, b6, b7) {
    if (b5 == "new" || b5 == "support") {
      let newidf
      let fullidf
      if (b5 == "new") {
        newidf = "block"
        fullidf = "changelogparentadded"
      } else {
        newidf = "support"
        fullidf = "changelogparentsupport"
      }
      if (document.getElementsByClassName("changelogmain" + newidf)[0].getElementsByClassName(a2).length == 0) {
        htmldombuilder("div", a2, {
          style: {
            height: "120px",
            display: "inline-flex",
            marginBottom: "10px"
          }
        }, document.getElementsByClassName("changelogmain" + newidf)[0])

        htmldombuilder("div", "tierbanner", {
          style: {
            height: "120px",
            width: "55px",
            marginRight: "5px",
            marginTop: "5px",
            display: "flex"
          }
        }, document.getElementsByClassName("changelogmain" + newidf)[0].getElementsByClassName(a2)[0])
        htmldombuilder("span", "", {
          style: {
            alignSelf: "center",
            width: "55px",
            fontSize: "47px"
          },
          addon: {
            innerHTML: `${a2.charAt(0).toUpperCase()} <br> ${a2.charAt(1)}`
          }
        }, document.getElementsByClassName("changelogmain" + newidf)[0].getElementsByClassName(a2)[0].getElementsByClassName("tierbanner")[0])
      }

      //Main
      htmldombuilder("div", fullidf, undefined, document.getElementsByClassName("changelogmain" + newidf)[0].getElementsByClassName(a2)[0])
      //WikiUrl
      htmldombuilder("a", "link", {
        addon: {
          href: ships[`${a1}`][`${b7}`][i].wikiUrl
        }
      }, document.getElementsByClassName(fullidf)[b4])
      //Thumbnail
      htmldombuilder("img", "thumbnail", {
        addon: {
          src: ships[`${a1}`][`${b7}`][i].thumbnail
        }
      }, document.getElementsByClassName(fullidf)[b4])
      //Bannerleft
      if (ships[`${a1}`][`${b7}`][i].banneralt != null) {
        if (ships[`${a1}`][`${b7}`][i].banneralt == "NEW") {
        htmldombuilder("img", "bannerleft", {
          addon: {
            src: ships[`${a1}`][`${b7}`][i].banneraltlink
          }
        }, document.getElementsByClassName(fullidf)[b4])
      }
      }
      //Tags en
      if (languageid == "en" || languageid == "jp" || languageid == "kr") {
        htmldombuilder("div", "tags_en show", undefined, document.getElementsByClassName(fullidf)[b4])
      } else {
        htmldombuilder("div", "tags_en", undefined, document.getElementsByClassName(fullidf)[b4])
      }
      //Tags cn
      if (languageid == "cn") {
        htmldombuilder("div", "tags_cn show", undefined, document.getElementsByClassName(fullidf)[b4])
      } else {
        htmldombuilder("div", "tags_cn", undefined, document.getElementsByClassName(fullidf)[b4])
      }
      //Tags filler
      if (ships[`${a1}`][`${b7}`][i].tags != null) {
        for (let ii = 0; ii < ships[`${a1}`][`${b7}`][i].tags.length; ii++) {
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/EN/" + ships[`${a1}`][`${b7}`][i].tags[ii] + ".png"
              }
            }, document.getElementsByClassName(fullidf)[b4].getElementsByClassName("tags_en")[0])
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/CN/" + ships[`${a1}`][`${b7}`][i].tags[ii] + ".png"
              }
            }, document.getElementsByClassName(fullidf)[b4].getElementsByClassName("tags_cn")[0])
        }
      }
      //Namechange html
      //Textblock en
      if (languageid == "en") {
        htmldombuilder("div", "text_en show", undefined, document.getElementsByClassName(fullidf)[b4])
      } else {
        htmldombuilder("div", "text_en", undefined, document.getElementsByClassName(fullidf)[b4])
      }
      //Textblock jp
      if (languageid == "jp") {
        htmldombuilder("div", "text_jp show", undefined, document.getElementsByClassName(fullidf)[b4])
      } else {
        htmldombuilder("div", "text_jp", undefined, document.getElementsByClassName(fullidf)[b4])
      }
      //Textblock kr
      if (languageid == "kr") {
        htmldombuilder("div", "text_kr show", undefined, document.getElementsByClassName(fullidf)[b4])
      } else {
        htmldombuilder("div", "text_kr", undefined, document.getElementsByClassName(fullidf)[b4])
      }
      //Textblock cn
      if (languageid == "cn") {
        htmldombuilder("div", "text_cn show", undefined, document.getElementsByClassName(fullidf)[b4])
      } else {
        htmldombuilder("div", "text_cn", undefined, document.getElementsByClassName(fullidf)[b4])
      }
      // Span text
      spantextbuild(ships[`${a1}`][`${b7}`][i].names, ships[`${a1}`][`${b7}`][i].names, document.getElementsByClassName(fullidf)[b4])
    }
    if (b5 == "promotions" || b5 == "demotions") {
      //Main div
      htmldombuilder("div", "changelogparent", undefined, document.getElementsByClassName("changelogmain" + b5)[0])
      //WikiUrl
      htmldombuilder("a", "link", {
        addon: {
          href: ships[`${a1}`][`${b7}`][i].wikiUrl
        }
      }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      //Thumbnail
      htmldombuilder("img", "thumbnail", {
        addon: {
          src: ships[`${a1}`][`${b7}`][i].thumbnail
        }
      }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      //Bannerleft
      if (ships[`${a1}`][`${b7}`][i].banneralt != null) {
        if (ships[`${a1}`][`${b7}`][i].banneralt == "NEW") {
        htmldombuilder("img", "bannerleft", {
          addon: {
            src: ships[`${a1}`][`${b7}`][i].banneraltlink
          }
        }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
    }
      //Tags en
      if (languageid == "en" || languageid == "jp" || languageid == "kr") {
        htmldombuilder("div", "tags_en show", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      } else {
        htmldombuilder("div", "tags_en", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
      //Tags cn
      if (languageid == "cn") {
        htmldombuilder("div", "tags_cn show", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      } else {
        htmldombuilder("div", "tags_cn", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
      //Tags filler
      if (ships[`${a1}`][`${b7}`][i].tags != null) {
        for (let ii = 0; ii < ships[`${a1}`][`${b7}`][i].tags.length; ii++) {
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/EN/" + ships[`${a1}`][`${b7}`][i].tags[ii] + ".png"
              }
            }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4].getElementsByClassName("tags_en")[0])
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/CN/" + ships[`${a1}`][`${b7}`][i].tags[ii] + ".png"
              }
            }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4].getElementsByClassName("tags_cn")[0])
        }
      }
      //Namechange html
      //Textblock en
      if (languageid == "en") {
        htmldombuilder("div", "text_en show", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      } else {
        htmldombuilder("div", "text_en", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
      //Textblock jp
      if (languageid == "jp") {
        htmldombuilder("div", "text_jp show", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      } else {
        htmldombuilder("div", "text_jp", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
      //Textblock kr
      if (languageid == "kr") {
        htmldombuilder("div", "text_kr show", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      } else {
        htmldombuilder("div", "text_kr", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
      //Textblock cn
      if (languageid == "cn") {
        htmldombuilder("div", "text_cn show", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      } else {
        htmldombuilder("div", "text_cn", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      }
      // Span text
      spantextbuild(ships[`${a1}`][`${b7}`][i].names, ships[`${a1}`][`${b7}`][i].names, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      //Tierchanges
      htmldombuilder("div", "tierchanges", undefined, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4])
      htmldombuilder("div", "oldranktext", {
        addon: {
          innerText: b6.toUpperCase()
        }
      }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4].getElementsByClassName("tierchanges")[0])

      if (b5 == "promotions") {
        htmldombuilder("img", "rankiconup", {
          addon: {
            src: "Assets/Misc/Arrow.png"
          }
        }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4].getElementsByClassName("tierchanges")[0])
      } else if (b5 == "demotions") {
        htmldombuilder("img", "rankicondown", {
          addon: {
            src: "Assets/Misc/Arrow.png"
          }
        }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4].getElementsByClassName("tierchanges")[0])
      }
      htmldombuilder("div", "newranktext", {
        addon: {
          innerText: a2.toUpperCase()
        }
      }, document.getElementsByClassName("changelogmain" + b5)[0].getElementsByClassName("changelogparent")[b4].getElementsByClassName("tierchanges")[0])
    }
  }
}

function openChangelog(changelog) {
  if (changelog == null) return
  if (Cookies.get('changelog') != changeloglastupdatedate) {
    Cookies.set('changelog', changeloglastupdatedate, { expires: 365 })
    document.getElementsByClassName("notification")[0].style.display = "none"
  } else {
    document.getElementsByClassName("notification")[0].style.display = "none"
  }
  changelog.classList.add('active')
  overlay.classList.add('active')
  var htmlbody = document.body
  var oldWidth = htmlbody.clientWidth
  htmlbody.style.overflow = "hidden";
  htmlbody.style.width = oldWidth;
  document.getElementsByClassName("language")[0].style.marginRight = "13px";
}

function closeChangelog(changelog) {
  if (changelog == null) return
  changelog.classList.remove('active')
  overlay.classList.remove('active')
  var htmlbody = document.body
  htmlbody.style.overflow = "auto"
  htmlbody.style.width = "auto"
  document.getElementsByClassName("language")[0].style.marginRight = "5px";
}

function mutifiltercheck(a1, a2, a3) {
  let checker = [];
  let filters = [];
  if (a2 == "hulltypefilter") {
    if (document.getElementsByClassName("hulltypefilter active").length == 0) {
      document.getElementsByClassName("hulltypefilter")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("hulltypefilter active")[0].id == a1) {
        document.getElementsByClassName("hulltypefilter active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("hulltypefilter active")[0].classList.remove("active")
        document.getElementsByClassName("hulltypefilter")[a1].classList.add("active")
      }
    }
    f1 = a1
  }
  if (a2 == "rarityfilter") {
    if (document.getElementsByClassName("rarityfilter active").length == 0) {
      document.getElementsByClassName("rarityfilter")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("rarityfilter active")[0].id == a1) {
        document.getElementsByClassName("rarityfilter active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("rarityfilter active")[0].classList.remove("active")
        document.getElementsByClassName("rarityfilter")[a1].classList.add("active")
      }
    }
    f2 = a1
  }
  if (a2 == "tagfilter") {
    if (document.getElementsByClassName("tags-dropdown-content")[0].getElementsByClassName("show active").length == 0) {
      document.getElementsByClassName("tags-dropdown-content")[0].getElementsByClassName("show")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("tags-dropdown-content")[0].getElementsByClassName("show active")[0].id == a1) {
        document.getElementsByClassName("tags-dropdown-content")[0].getElementsByClassName("show active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("tags-dropdown-content")[0].getElementsByClassName("show active")[0].classList.remove("active")
        document.getElementsByClassName("tags-dropdown-content")[0].getElementsByClassName("show")[a1].classList.add("active")
      }
    }
    f3 = a1
  }
  if (a2 == "tierfilter") {
    if (document.getElementsByClassName("tierfilter active").length == 0) {
      document.getElementsByClassName("tierfilter")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("tierfilter active")[0].id == a1) {
        document.getElementsByClassName("tierfilter active")[0].classList.remove("active")
        a1 = undefined
      } else {
        document.getElementsByClassName("tierfilter active")[0].classList.remove("active")
        document.getElementsByClassName("tierfilter")[a1].classList.add("active")
      }
    }
    f4 = a1
  }
  if (a2 == "nationality") {
    if (document.getElementsByClassName("nationality active").length == 0) {
      document.getElementsByClassName("nationality")[a1].classList.add("active")
    } else {
      if (document.getElementsByClassName("nationality active")[0].id == a1) {
        document.getElementsByClassName("nationality active")[0].classList.remove("active")
        a3 = undefined
      } else {
        document.getElementsByClassName("nationality active")[0].classList.remove("active")
        document.getElementsByClassName("nationality")[a1].classList.add("active")
      }
    }
    f5 = a3
  }

  for (let i = 1; i < 6; i++) {
    switch (i) {
      case 1:
        if (f1 != undefined) {
          filters.push(f1)
          checker.push("f1")
        }
        break;
      case 2:
        if (f2 != undefined) {
          filters.push(f2)
          checker.push("f2")
        }
        break;
      case 3:
        if (f3 != undefined) {
          filters.push(f3)
          checker.push("f3")
        }
        break;
      case 4:
        if (f4 != undefined) {
          filters.push(f4)
          checker.push("f4")
        }
        break;
      case 5:
        if (f5 != undefined) {
          filters.push(f5)
          checker.push("f5")
        }
        break;
    }
  }
  if (filters.length != 0) {
      if (Object.entries(arraysobj).length == 0) {
        arraysobj = {
          battleship: {
            t0: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: [],
            t6: [],
            t7: []
          },
          carrier: {
            t0: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: [],
            t6: [],
            t7: []
          },
          heavycruiser: {
            t0: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: [],
            t6: [],
            t7: []
          },
          lightcruiser: {
            t0: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: [],
            t6: [],
            t7: []
          },
          destroyer: {
            t0: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: [],
            t6: [],
            t7: []
          },
          submarine: {
            t0: [],
            t1: [],
            t2: [],
            t3: [],
            t4: [],
            t5: [],
            t6: [],
            t7: []
          }
        }
      buildmultihtml(filters, checker)
    }
  } else {
    buildhtmlall();
  }
}

window.onclick = function (event) {
  if (
    !event.target.matches("." + identmain) &&
    !event.target.matches(".filter-dropdown-content") &&
    !event.target.matches(".tierfilterspan") &&
    !event.target.matches(".hulltypefilterspan") &&
    !event.target.matches(".rarityfilterspan") &&
    !event.target.matches(".nationalityfilterspan") &&
    !event.target.matches(".tagfilterspan") &&
    !event.target.matches(".tierfilter") &&
    !event.target.matches(".hulltypefilter") &&
    !event.target.matches(".rarityfilter") &&
    !event.target.matches(".nationalityfilter") &&
    !event.target.matches(".tagfilter_en") &&
    !event.target.matches(".tagfilter_ico") &&
    !event.target.matches(".tagfilter_cn") &&
    !event.target.matches(".tierfiltercont") &&
    !event.target.matches(".hulltypefiltercont") &&
    !event.target.matches(".rarityfiltercont") &&
    !event.target.matches(".nationalityfiltercont") &&
    !event.target.matches(".tagfiltercont")
  ) {
    var dropdowns = document.getElementsByClassName(identid + "-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    identmain = undefined;
    identid = undefined;
  }
  if (
    !event.target.matches(".legend-dot-dropbtn") &&
    !event.target.matches(".legend-dropdown-content") &&
    !event.target.matches(".legendicon_en") &&
    !event.target.matches(".legendicon_cn") &&
    !event.target.matches(".legendspan_en") &&
    !event.target.matches(".legendspan_cn")
  ) {
    var dropdowns = document.getElementsByClassName("legend-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function languagechangerfunc(a1) {
  setcookieghost(a1)

  document.querySelectorAll(".lang").forEach((e) => {
  if (e.classList.contains(a1) && !e.classList.contains("active")) {
    e.classList.add("active");
  } else {
    e.classList.remove("active")
  }
  })

  document.querySelectorAll("[class*='text_']").forEach((e) => {
    if (!e.classList.contains("text_" + a1)) {
      e.classList.remove("show")
    } else {
      e.classList.add("show")
    }
  })

  if (a1 == "en" || a1 == "cn") {
  document.querySelectorAll("[class*='tagfilter_'], [class*='legendicon_'], [class*='legendspan_'], [class*='tags_']").forEach((e) => {
    if (!e.classList.contains("show") && e.classList.contains("tagfilter_" + a1) || e.classList.contains("legendicon_" + a1) || e.classList.contains("legendspan_" + a1) || e.classList.contains("tags_" + a1)) {
      e.classList.add("show")
    } else {
      e.classList.remove("show")
    }
  })
}
}

// Namechange function
function shipnamecheck(a1, a2) {
  switch (a1) {
    case "en":
      languageid = "en";
      languagechangerfunc(languageid)
      break;
    case "jp":
      languageid = "jp";
      languagechangerfunc(languageid)
      break;
    case "cn":
      languageid = "cn";
      languagechangerfunc(languageid)
      break;
    case "kr":
      languageid = "kr";
      languagechangerfunc(languageid)
      break;
  }
}

function activehandler(a1) {
  if (a1 != identmain && identmain != undefined) {
    document.getElementById(identid).classList.remove("show");
    identmain = undefined;
    identid = undefined;
  }
  // identmain == *-dropbtn
  identmain = a1[0];
  // identid == *-dropdown
  identid = document.getElementsByClassName(identmain)[0].parentElement
    .classList[0];
  // adds show to *-dropdown
  document.getElementById(identid).classList.toggle("show");
}

function legenddropdown() {
  document.getElementById("legend-dropdown").classList.toggle("show");
}

async function getjson(a1) {
  try {
    let data = await fetch([a1] + ".json");
    let result = await data.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

function getAllIndexes(arr, val, search, useloop, index) {
  var indexes = [],
    i;
  if (useloop == false) {
    if (index != undefined) {
      for (i = 0; i < index.length; i++) {
        if (arr[index[i]][search] == val) {
          indexes.push(i);
        }
      }
    } else {
      for (i = 0; i < arr.length; i++)
        if (arr[i][search] == val) indexes.push(i);
    }
  } else {
    for (i = 0; i < arr.length; i++)
      if (arr[i][search] != null) {
        for (let ii = 0; ii < arr[i][search].length; ii++) {
          if (arr[i][search][ii] == val) indexes.push(i);
        }
      }
  }
  return indexes;
}

function countspaces(a1) {
  let count = a1.split(" ").length - 1;
  let countafter = a1.match(/^\s*(\S+)\s*(.*?)\s*$/).slice(1);
  return {
    count,
    countafter
  };
}

function removespaces(a1) {
  let result = a1.replace(" ", "");
  return result;
}

function tiersize(a1) {
  let result;
  let rawresult;
  let b1 = (a1 * 100) / 3;
  let b2 = Math.ceil(b1 / 100) * 100;
  let margin = b2 / 10;

  result = b2 + margin + "px";
  rawresult = b2 + margin;

  return {
    result,
    rawresult
  };
}

function texthandler(a1, a2, a3) {
  let className;
  let fontSize;
  let lineHeight;
  let countcheck = countspaces(a2);

  if (a3 == "en") {
    if (a1 >= 13) {
      className = "shipnamealt";
      // If the str has no empty spaces
      if ((countcheck.count) == 0) {
        fontSize = "10px";
        lineHeight = "2";
      }
      // Check if the str has at least one empty space
      if ((countcheck.count) == 1) {
        // If the second str is at least 9 => 10+ long
        if (
          (countcheck.countafter[1].length) == 10 &&
          (countcheck.countafter[1].length) > 8
        ) {
          fontSize = "11px";
        }
        // If the second str is longer then 10
        if ((countcheck.countafter[1].length) > 10) {
          fontSize = "10px";
        }
        // If the second str is smaller or 8 long
        if (countcheck.countafter[1].length <= 8) {
          fontSize = "12px";
        }
      } else if ((countcheck.count) == 2) {
        // If the second str is at least 9 => 10+ long
        if (
          (countcheck.countafter[1].length) == 10 &&
          (countcheck.countafter[1].length) > 8
        ) {
          fontSize = "11px";
        }
        // If the second str is longer then 10
        if ((countcheck.countafter[1].length) > 10) {
          fontSize = "10px";
        }
        // If the second str is smaller or 8 long
        if (countcheck.countafter[1].length <= 8) {
          fontSize = "12px";
        }
      } else {
        fontSize = "10px";
      }
      // If the sting is 17 or longer
      if (a1 >= 17) {
        fontSize = "11px";
      }
      if (a1 == 16) {
        fontSize = "10px";
      }
    } else {
      if ((countcheck.count) == 0 && a1 >= 12) {
        fontSize = "10px";
      }
      if ((countcheck.count) >= 1) {
        fontSize = "10px";
      }
      if ((countcheck.count) == 1 && a1 == 11) {
        fontSize = "10px";
        lineHeight = "20px";
      }
      className = "shipname";
      if ((countcheck.count) == 0 && a1 == 11) {
        fontSize = "11px";
      }
    }
  }

  if (a3 == "jp") {
    if (a1 < 7) {
      fontSize = "10px";
      lineHeight = "20px";
      className = "shipname";
    } else if (a1 > 11) {
      fontSize = "9px";
      lineHeight = "9px";
      className = "shipnamealt";
      if (a1 > 14) {
        fontSize = "8px";
        lineHeight = "9px";
        className = "shipnamealt";
      }
    } else {
      fontSize = "10px";
      lineHeight = "9px";
      className = "shipnamealt";
      if (a1 == 7) {
        fontSize = "11px";
        lineHeight = "9px";
        className = "shipnamealt";
      }
    }
  }

  if (a3 == "kr") {
    if (a1 < 9) {
      fontSize = "10px";
      lineHeight = "20px";
      className = "shipname";
      if (a1 <= 8) {
        fontSize = "9px";
        lineHeight = "20px";
        className = "shipnamealt";
      }
    } else {
      fontSize = "10px";
      lineHeight = "9px";
      className = "shipnamealt";
      if (countcheck.count == 1) {
        fontSize = "10px";
        lineHeight = "20px";
        className = "shipnamealt";
      }
    }
  }

  if (a3 == "cn") {
    if (a1 > 0 && a1 < 6) {
      fontSize = "12px";
      lineHeight = "20px";
      className = "shipname";
    }
    if (a1 > 5) {
      fontSize = "11px";
      lineHeight = "20px";
      className = "shipnamealt";
    }
    if (a1 > 6) {
      fontSize = "10px";
      lineHeight = "20px";
      className = "shipnamealt";
    }
    if (a1 > 7) {
      fontSize = "8px";
      lineHeight = "20px";
      className = "shipnamealt";
    }
  }
  return {
    className,
    fontSize,
    lineHeight
  };
}

function tiertext(a1) {
  var result = a1.toUpperCase();
  return result;
}

function buildmultihtml(a1, a2) {
  let hullfilterindex = {};
  let rarityfilterindex = {};
  let tagsfilterindex = {};
  let tierfilterindex = {};
  let nationalityfilterindex = {};
  let result = {};
  let index;
  let shipobj = Object.entries(ships);
  for (let z = 0; z < a1.length; z++) {
    if (a2[z] == "f1") {
      let tier;
      let hulltypeidf
      let idf
      switch (a1[z]) {
        case "battleship":
          hulltypeidf = "Battleship"
          filtername = "battleship"
          idf = 0
          break;
        case "carrier":
          hulltypeidf = "AircraftCarrier"
          filtername = "carrier"
          idf = 1
          break;
        case "heavycruiser":
          hulltypeidf = "HeavyCruiser"
          filtername = "heavycruiser"
          idf = 2
          break;
        case "lightcruiser":
          hulltypeidf = "LightCruiser"
          filtername = "lightcruiser"
          idf = 3
          break;
        case "destroyer":
          hulltypeidf = "Destroyer"
          filtername = "destroyer"
          idf = 4
          break;
        case "submarine":
          hulltypeidf = "Submarine"
          filtername = "submarine"
          idf = 5
          break;
        case "AviationBattleship":
          hulltypeidf = "AviationBattleship"
          filtername = "battleship"
          idf = 0
          break;
        case "Monitor":
          hulltypeidf = "Monitor"
          filtername = "battleship"
          idf = 0
          break;
        case "Repairship":
          hulltypeidf = "Repairship"
          filtername = "carrier"
          idf = 1
          break;
        case "SubmarineCarrier":
          hulltypeidf = "SubmarineCarrier"
          filtername = "submarine"
          idf = 5
          break;
      }
      hullfilterindex = {
        [filtername]: {}
      }
      for (let a = 0; a < 8; a++) {
        switch (a) {
          case 0:
            tier = "t0";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 1:
            tier = "t1";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 2:
            tier = "t2";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 3:
            tier = "t3";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 4:
            tier = "t4";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 5:
            tier = "t5";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 6:
            tier = "t6";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
          case 7:
            tier = "t7";
            index = getAllIndexes(shipobj[idf][1][tier], hulltypeidf, "hullTypeId", false);
            if (index.length != 0) {
              hullfilterindex[filtername][tier] = index
            }
            break;
        }
      }
      result["hullfilterindex"] = hullfilterindex
    }
    if (a2[z] == "f2") {
      if (a1[z] == "SuperRare") {
        a1[z] = "Super Rare";
      }
      for (let i = 0; i < shipobj.length; i++) {
        rarityfilterindex[shipobj[i][0]] = {}
        for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
          index = getAllIndexes(
            shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
            a1[z],
            "rarity",
            false
          );
          if (index.length != 0) {
            rarityfilterindex[shipobj[i][0]][
              [Object.keys(shipobj[i][1])[ii]]
            ] = index
          }
        }
      }
      let newrarityfilterindex = removeemptyarr(rarityfilterindex)
      result["rarityfilterindex"] = newrarityfilterindex
    }
    if (a2[z] == "f3") {
      a1[z] = a1[z].replace(" en", "");
      a1[z] = a1[z].replace(" jp", "");
      a1[z] = a1[z].replace(" cn", "");
      for (let i = 0; i < shipobj.length; i++) {
        tagsfilterindex[shipobj[i][0]] = {}
        for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
          index = getAllIndexes(
            shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
            a1[z],
            "tags",
            true
          );
          if (index.length != 0) {
            tagsfilterindex[shipobj[i][0]][
              [Object.keys(shipobj[i][1])[ii]]
            ] = index
          }
        }
      }
      let newtagsfilterindex = removeemptyarr(tagsfilterindex)
      result["tagsfilterindex"] = newtagsfilterindex
    }
    if (a2[z] == "f4") {
      let ii = a1[z].match(/\d+/)[0];

      for (let i = 0; i < shipobj.length; i++) {
        tierfilterindex[shipobj[i][0]] = {}
        let index = getAllIndexes(
          shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
          ii,
          "usagitier",
          false
        );
        if (index.length != 0) {
          tierfilterindex[shipobj[i][0]][
            [Object.keys(shipobj[i][1])[ii]]
          ] = index
        }
      }
      result["tierfilterindex"] = tierfilterindex
    }
    if (a2[z] == "f5") {
      a1[z] = a1[z].replace("_", " ");

      for (let i = 0; i < shipobj.length; i++) {
        nationalityfilterindex[shipobj[i][0]] = {}
        for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
          let index = getAllIndexes(
            shipobj[i][1][Object.keys(shipobj[i][1])[ii]],
            a1[z],
            "nationality",
            false
          );
          if (index.length != 0) {
            nationalityfilterindex[shipobj[i][0]][
              [Object.keys(shipobj[i][1])[ii]]
            ] = index
          }
        }
      }
      let newnationalityfilterindex = removeemptyarr(nationalityfilterindex)
      result["nationalityfilterindex"] = newnationalityfilterindex
    }
  }

  pushintoarray(result, a1.length)
}

function removeemptyarr(arr) {
  let newobj = {};
  let a1 = Object.entries(arr)
  var i = a1.length;
  while (i--) {
    if (Object.entries(a1[i][1]).length == 0) {
      a1.splice(i, 1);
    }
  }
  for (let a = 0; a < a1.length; a++) {
    newobj[a1[a][0]] = {};
    for (let aa = 0; aa < Object.entries(a1[a][1]).length; aa++) {
      newobj[a1[a][0]][Object.keys(a1[a][1])[aa]] = a1[a][1][Object.keys(a1[a][1])[aa]]
    }
  }
  return newobj
}

function arraysobjpusher(a1, i) {
  for (let a = 0; a < Object.entries(a1).length; a++) {
    for (let aa = 0; aa < Object.keys(a1[Object.entries(a1)[a][0]]).length; aa++) {
      arraysobj[Object.entries(a1)[a][0]][Object.keys(a1[Object.entries(a1)[a][0]])[aa]].push(a1[Object.entries(a1)[a][0]][Object.keys(a1[Object.entries(a1)[a][0]])[aa]])
    }
  }
}

function pushintoarray(result, b1) {
  let a1
  for (let i = 0; i < Object.entries(result).length; i++) {
    switch (Object.entries(result)[i][0]) {
      case "hullfilterindex":
        a1 = result[Object.entries(result)[i][0]]
        arraysobjpusher(a1, i)
        break;
      case "tierfilterindex":
        a1 = result[Object.entries(result)[i][0]]
        arraysobjpusher(a1, i)
        break;
      case "rarityfilterindex":
        a1 = result[Object.entries(result)[i][0]]
        arraysobjpusher(a1, i)
        break;
      case "tagsfilterindex":
        a1 = result[Object.entries(result)[i][0]]
        arraysobjpusher(a1, i)
        break;
      case "nationalityfilterindex":
        a1 = result[Object.entries(result)[i][0]]
        arraysobjpusher(a1, i)
        break;
    }
  }
  getmatchesfilter(result, b1)
}

function getmatchesfilter(a4, b1) {
  let a1 = arraysobj
  let a2
  let a3
  let hullobj;
  let returnfilterindex;
  let newshipobj = {
    battleship: {},
    carrier: {},
    heavycruiser: {},
    lightcruiser: {},
    destroyer: {},
    submarine: {}
  }
  for (let i = 0; i < Object.entries(a4).length; i++) {
    switch (Object.entries(a4)[i][0]) {
      case "hullfilterindex":
        let r1 = a4[Object.entries(a4)[i][0]]
        a2 = Object.keys(r1)[0]
        break;
      case "tierfilterindex":
        let r2 = a4[Object.entries(a4)[i][0]]
        a3 = Object.keys(r2[Object.entries(r2)[0][0]])[0]
        break;
    }
  }
  if (a2 != undefined) {
    hullobj = a1[a2];
    if (a3 != undefined) {
      if (hullobj[a3].length == Object.entries(a4).length) {
        returnfilterindex = filter(hullobj[a3])
        let shipobj = ships;
        let newhullobj = shipobj[a2][a3]
        if (returnfilterindex.length != 0) {
          buildfiltermainhtml(newhullobj, a2, a3, returnfilterindex)
        } else {
          document.getElementsByClassName("main")[0].innerHTML = "";
          htmldombuilder("h1", "nomatchestext", {
            addon: {
              innerText: "No matches found. Try again."
            }
          }, undefined)
          deleteProperties(arraysobj)
        }
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        htmldombuilder("h1", "nomatchestext", {
          addon: {
            innerText: "No matches found. Try again."
          }
        }, undefined)
        deleteProperties(arraysobj)
      }
    } else {
      for (let i = 0; i < Object.keys(hullobj).length; i++) {
        if (hullobj[Object.keys(hullobj)[i]].length == Object.entries(a4).length) {
          returnfilterindex = filter(hullobj[Object.keys(hullobj)[i]])
          if (returnfilterindex.length != 0) {
            newshipobj[a2][Object.keys(hullobj)[i]] = returnfilterindex
          }
        }
      }
      let filternewshipobj = removeemptyarr(newshipobj)
      if (Object.keys(filternewshipobj).length != 0) {
        let shipobj = ships;
        let newhullobj = shipobj[a2]
        buildfiltermainhtml(newhullobj, a2, a3, filternewshipobj)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        htmldombuilder("h1", "nomatchestext", {
          addon: {
            innerText: "No matches found. Try again."
          }
        }, undefined)
        deleteProperties(arraysobj)
      }
    }
  } else {
    if (a3 != undefined) {
      for (let i = 0; i < Object.keys(a1).length; i++) {
        hullobj = a1[Object.keys(a1)[i]]
        if (hullobj[a3].length == Object.entries(a4).length) {
          returnfilterindex = filter(hullobj[a3])
          if (returnfilterindex.length != 0) {
            newshipobj[Object.keys(a1)[i]][a3] = returnfilterindex
          }
        }
      }
      let filternewshipobj = removeemptyarr(newshipobj)
      if (Object.keys(filternewshipobj).length != 0) {
        let shipobj = ships;
        let newhullobj = shipobj
        buildfiltermainhtml(newhullobj, a2, a3, filternewshipobj)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        htmldombuilder("h1", "nomatchestext", {
          addon: {
            innerText: "No matches found. Try again."
          }
        }, undefined)
        deleteProperties(arraysobj)
      }
    } else {
      for (let i = 0; i < Object.keys(a1).length; i++) {
        hullobj = a1[Object.keys(a1)[i]]
        for (let ii = 0; ii < Object.entries(hullobj).length; ii++) {
          if (hullobj[Object.entries(hullobj)[ii][0]].length == Object.entries(a4).length) {
            returnfilterindex = filter(hullobj[Object.entries(hullobj)[ii][0]])
            if (returnfilterindex.length != 0) {
              newshipobj[Object.keys(a1)[i]][Object.entries(hullobj)[ii][0]] = returnfilterindex
            }
          }
        }
      }
      let filternewshipobj = removeemptyarr(newshipobj)
      if (Object.keys(filternewshipobj).length != 0) {
        let shipobj = ships;
        let newhullobj = shipobj
        buildfiltermainhtml(newhullobj, a2, a3, filternewshipobj)
      } else {
        document.getElementsByClassName("main")[0].innerHTML = "";
        htmldombuilder("h1", "nomatchestext", {
          addon: {
            innerText: "No matches found. Try again."
          }
        }, undefined)
        deleteProperties(arraysobj)
      }
    }
  }
}

function filter(b1) {
  var result = b1.shift().filter(function (v) {
    return b1.every(function (a) {
      return a.indexOf(v) !== -1;
    });
  });
  return result
}

function buildfiltermainhtml(a1, a2, a3, a4) {
  document.getElementsByClassName("main")[0].innerHTML = "";
  if (a2 != undefined) {
    if (a3 == undefined) {
      // Hulltype class
      htmldombuilder("div", a2 + " all", undefined, undefined)
      // Hulltype class banner
      let bsrc
      if (a2 == "heavycruiser") {
        bsrc = "Assets/TierClassBanner/HeavyCruiser.png";
      } else if (a2 == "lightcruiser") {
        bsrc = "Assets/TierClassBanner/LightCruiser.png";
      } else {
        bsrc =
          "Assets/TierClassBanner/" +
          a2.charAt(0).toUpperCase() +
          a2.slice(1) +
          ".png";
      }
      htmldombuilder("img", a2 + "banner", {
        style: {
          marginRight: "30px"
        },
        addon: {
          src: bsrc
        }
      }, document.getElementsByClassName(a2)[0])

      for (let i = 0; i < Object.keys(a4[a2]).length; i++) {
        // s == t0 t1 t2 usw
        let sizecheck = tiersize(a4[a2][Object.keys(a4[a2])[i]].length);
        htmldombuilder("div", Object.keys(a4[a2])[i], {
          style: {
            width: sizecheck.result,
            marginRight: "20px"
          }
        }, document.getElementsByClassName(a2)[0])
        htmldombuilder("div", "tierbanner", {
          style: {
            width: sizecheck.rawresult - 10 + "px"
          },
          addon: {
            text: Object.keys(a4[a2])[i]
          }
        }, document.getElementsByClassName(a2)[0].getElementsByClassName(Object.keys(a4[a2])[i])[0])
        filltier(a2, Object.keys(a4[a2])[i], a4[a2][Object.keys(a4[a2])[i]]);
      }
    } else {
      // Hulltype class
      htmldombuilder("div", a2 + " all", undefined, undefined)
      // Hulltype class banner
      let bsrc
      if (a2 == "heavycruiser") {
        bsrc = "Assets/TierClassBanner/HeavyCruiser.png";
      } else if (a2 == "lightcruiser") {
        bsrc = "Assets/TierClassBanner/LightCruiser.png";
      } else {
        bsrc =
          "Assets/TierClassBanner/" +
          a2.charAt(0).toUpperCase() +
          a2.slice(1) +
          ".png";
      }
      htmldombuilder("img", a2 + "banner", {
        style: {
          marginRight: "30px"
        },
        addon: {
          src: bsrc
        }
      }, document.getElementsByClassName(a2)[0])

      // s == t0 t1 t2 usw
      let sizecheck = tiersize(a4.length);
      htmldombuilder("div", a3, {
        style: {
          width: sizecheck.result,
          marginRight: "20px"
        }
      }, document.getElementsByClassName(a2)[0])
      htmldombuilder("div", "tierbanner", {
        style: {
          width: sizecheck.rawresult - 10 + "px"
        },
        addon: {
          text: a3
        }
      }, document.getElementsByClassName(a2)[0].getElementsByClassName(a3)[0])
      filltier(a2, a3, a4);
    }
  } else {
    if (a3 != undefined) {
      for (let i = 0; i < Object.keys(a4).length; i++) {
        // Hulltype class
        htmldombuilder("div", Object.keys(a4)[i] + " all", undefined, undefined)
        // Hulltype class banner
        let bsrc
        if (Object.keys(a4)[i] == "heavycruiser") {
          bsrc = "Assets/TierClassBanner/HeavyCruiser.png";
        } else if (Object.keys(a4)[i] == "lightcruiser") {
          bsrc = "Assets/TierClassBanner/LightCruiser.png";
        } else {
          bsrc =
            "Assets/TierClassBanner/" +
            Object.keys(a4)[i].charAt(0).toUpperCase() +
            Object.keys(a4)[i].slice(1) +
            ".png";
        }
        htmldombuilder("img", Object.keys(a4)[i] + "banner", {
          style: {
            marginRight: "30px"
          },
          addon: {
            src: bsrc
          }
        }, document.getElementsByClassName(Object.keys(a4)[i])[0])

        // s == t0 t1 t2 usw
        let sizecheck = tiersize(Object.entries(a4)[i][1][a3].length);
        htmldombuilder("div", a3, {
          style: {
            width: sizecheck.result,
            marginRight: "20px"
          }
        }, document.getElementsByClassName(Object.keys(a4)[i])[0])
        htmldombuilder("div", "tierbanner", {
          style: {
            width: sizecheck.rawresult - 10 + "px"
          },
          addon: {
            text: a3
          }
        }, document.getElementsByClassName(Object.keys(a4)[i])[0].getElementsByClassName(a3)[0])
        filltier(Object.keys(a4)[i], a3, Object.entries(a4)[i][1][a3]);
      }
    } else {
      for (let i = 0; i < Object.keys(a4).length; i++) {
        // Hulltype class
        htmldombuilder("div", Object.keys(a4)[i] + " all", undefined, undefined)
        // Hulltype class banner
        let bsrc
        if (Object.keys(a4)[i] == "heavycruiser") {
          bsrc = "Assets/TierClassBanner/HeavyCruiser.png";
        } else if (Object.keys(a4)[i] == "lightcruiser") {
          bsrc = "Assets/TierClassBanner/LightCruiser.png";
        } else {
          bsrc =
            "Assets/TierClassBanner/" +
            Object.keys(a4)[i].charAt(0).toUpperCase() +
            Object.keys(a4)[i].slice(1) +
            ".png";
        }
        htmldombuilder("img", Object.keys(a4)[i] + "banner", {
          style: {
            marginRight: "30px"
          },
          addon: {
            src: bsrc
          }
        }, document.getElementsByClassName(Object.keys(a4)[i])[0])

        for (let ii = 0; ii < Object.keys(Object.entries(a4)[i][1]).length; ii++) {
          // s == t0 t1 t2 usw
          let sizecheck = tiersize(Object.entries(a4)[i][1][Object.keys(Object.entries(a4)[i][1])[ii]].length);
          htmldombuilder("div", Object.keys(Object.entries(a4)[i][1])[ii], {
            style: {
              width: sizecheck.result,
              marginRight: "20px"
            }
          }, document.getElementsByClassName(Object.keys(a4)[i])[0])
          htmldombuilder("div", "tierbanner", {
            style: {
              width: sizecheck.rawresult - 10 + "px"
            },
            addon: {
              text: Object.keys(Object.entries(a4)[i][1])[ii]
            }
          }, document.getElementsByClassName(Object.keys(a4)[i])[0].getElementsByClassName(Object.keys(Object.entries(a4)[i][1])[ii])[0])
          filltier(Object.keys(a4)[i], Object.keys(Object.entries(a4)[i][1])[ii], Object.entries(a4)[i][1][Object.keys(Object.entries(a4)[i][1])[ii]]);
        }
      }
    }

  }
}

async function buildhtmlall() {
  let shipobj = Object.entries(ships);
  document.getElementsByClassName("main")[0].innerHTML = "";

  for (let i = 0; i < shipobj.length; i++) {
    // Hulltype class
    htmldombuilder("div", shipobj[i][0] + " all", undefined, undefined)
    // Hulltype class banner
    let bsrc
    if (shipobj[i][0] == "heavycruiser") {
      bsrc = "Assets/TierClassBanner/HeavyCruiser.png";
    } else if (shipobj[i][0] == "lightcruiser") {
      bsrc = "Assets/TierClassBanner/LightCruiser.png";
    } else {
      bsrc =
        "Assets/TierClassBanner/" +
        shipobj[i][0].charAt(0).toUpperCase() +
        shipobj[i][0].slice(1) +
        ".png";
    }
    htmldombuilder("img", shipobj[i][0] + "banner", {
      style: {
        marginRight: "30px"
      },
      addon: {
        src: bsrc
      }
    }, document.getElementsByClassName(shipobj[i][0])[0])

    for (let ii = 0; ii < Object.keys(shipobj[i][1]).length; ii++) {
      if (shipobj[i][1][Object.keys(shipobj[i][1])[ii]] != 0) {
        // s == t0 t1 t2 usw
        let sizecheck = tiersize(shipobj[i][1][Object.keys(shipobj[i][1])[ii]].length);
        htmldombuilder("div", Object.keys(shipobj[i][1])[ii], {
          style: {
            width: sizecheck.result,
            marginRight: "20px"
          }
        }, document.getElementsByClassName(shipobj[i][0])[0])
        htmldombuilder("div", "tierbanner", {
          style: {
            width: sizecheck.rawresult - 10 + "px"
          },
          addon: {
            text: Object.keys(shipobj[i][1])[ii]
          }
        }, document.getElementsByClassName(shipobj[i][0])[0].getElementsByClassName(Object.keys(shipobj[i][1])[ii])[0])
        filltier(shipobj[i][0], Object.keys(shipobj[i][1])[ii]);
      }
    }
  }
}

function filltier(a1, a2, a3) {
  let loopidf
  if (a3 == undefined) {
    loopidf = ships[`${a1}`][`${a2}`].length
  } else {
    loopidf = a3.length
  }
  for (let i = 0; i < loopidf; i++) {
    // Main div
    htmldombuilder("div", "parent", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0])
    // Tags en
    if (languageid == "en" || languageid == "jp" || languageid == "kr") {
      htmldombuilder("div", "tags_en show", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("div", "tags_en", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
    if (languageid == "cn") {
      htmldombuilder("div", "tags_cn show", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("div", "tags_cn", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
    // Namechange html builder
    // Textblock en
    if (languageid == "en") {
      htmldombuilder("div", "text_en show", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("div", "text_en", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
    // Textblock jp
    if (languageid == "jp") {
      htmldombuilder("div", "text_jp show", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("div", "text_jp", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
    // Textblock kr
    if (languageid == "kr") {
      htmldombuilder("div", "text_kr show", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("div", "text_kr", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
    // Textblock cn
    if (languageid == "kr") {
      htmldombuilder("div", "text_cn show", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("div", "text_cn", undefined, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
    if (a3 == undefined) {
      htmldombuilder("a", "link", {
        addon: {
          href: ships[`${a1}`][`${a2}`][i].wikiUrl
        }
      }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
      // thumbnail
      htmldombuilder("img", "thumbnail", {
        addon: {
          src: ships[`${a1}`][`${a2}`][i].thumbnail
        }
      }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
      // Bannerleft
      if (ships[`${a1}`][`${a2}`][i].banneralt != null) {
        if (ships[`${a1}`][`${a2}`][i].banneralt == "NEW") {
        htmldombuilder("img", "bannerleft", {
          addon: {
            src: ships[`${a1}`][`${a2}`][i].banneraltlink
          }
        }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
      }
    }
      // tags filler
      if (ships[`${a1}`][`${a2}`][i].tags != null) {
        for (let ii = 0; ii < ships[`${a1}`][`${a2}`][i].tags.length; ii++) {
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/EN/" + ships[`${a1}`][`${a2}`][i].tags[ii] + ".png"
              }
            }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("tags_en")[i])
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/CN/" + ships[`${a1}`][`${a2}`][i].tags[ii] + ".png"
              }
            }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("tags_cn")[i])
        }
      }
      // Span text
      spantextbuild(ships[`${a1}`][`${a2}`][i].names, ships[`${a1}`][`${a2}`][i].names, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    } else {
      htmldombuilder("a", "link", {
        addon: {
          href: ships[`${a1}`][`${a2}`][a3[i]].wikiUrl
        }
      }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
      htmldombuilder("img", "thumbnail", {
        addon: {
          src: ships[`${a1}`][`${a2}`][a3[i]].thumbnail
        }
      }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
      // Bannerleft
      if (ships[`${a1}`][`${a2}`][a3[i]].banneralt != null) {
        if (ships[`${a1}`][`${a2}`][i].banneralt == "NEW") {
        htmldombuilder("img", "bannerleft", {
          addon: {
            src: ships[`${a1}`][`${a2}`][a3[i]].banneraltlink
          }
        }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
      }
    }
      if (ships[`${a1}`][`${a2}`][a3[i]].tags != null) {
        for (let ii = 0; ii < ships[`${a1}`][`${a2}`][a3[i]].tags.length; ii++) {
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/EN/" + ships[`${a1}`][`${a2}`][a3[i]].tags[ii] + ".png"
              }
            }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("tags_en")[i])
            htmldombuilder("img", "tag" + (ii + 1), {
              addon: {
                src: "Assets/TagIcons/CN/" + ships[`${a1}`][`${a2}`][a3[i]].tags[ii] + ".png"
              }
            }, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("tags_cn")[i])
        }
      }
      spantextbuild(ships[`${a1}`][`${a2}`][a3[i]].names, ships[`${a1}`][`${a2}`][i].names, document.getElementsByClassName(a1)[0].getElementsByClassName(a2)[0].getElementsByClassName("parent")[i])
    }
  }
  deleteProperties(arraysobj)
}

function deleteProperties(cleanme) {
  for (var x in cleanme)
    if (cleanme.hasOwnProperty(x)) delete cleanme[x];
}