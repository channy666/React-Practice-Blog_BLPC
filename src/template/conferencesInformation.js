import conferenceImg1211 from "../utils/images/ConferencesPage/20181211/講座會議.jpeg";
import conferenceImg from "../utils/images/ConferencesPage/講座會議圖.jpg";
import poster1001 from "../utils/images/ConferencesPage/20181001/poster.jpeg";
import image10011 from "../utils/images/ConferencesPage/20181001/會場.jpeg";
import image10012 from "../utils/images/ConferencesPage/20181001/范建得主任.jpeg";
import poster1026 from "../utils/images/ConferencesPage/20181026/poster.jpeg";
import image10261 from "../utils/images/ConferencesPage/20181026/范建得主任.jpeg";
import image10262 from "../utils/images/ConferencesPage/20181026/與談.jpeg";
import image10263 from "../utils/images/ConferencesPage/20181026/大合照.jpeg";
import poster1211 from "../utils/images/ConferencesPage/20181211/poster.jpg";
import image12111 from "../utils/images/ConferencesPage/20181211/ProfMerges.jpeg";
import image12112 from "../utils/images/ConferencesPage/20181211/ProfCohen.jpeg";
import image12113 from "../utils/images/ConferencesPage/20181211/合照.jpeg";

const conferencesInformation = [
  {
    date: "2018-12-11",
    title:
      "人工智慧與區塊鏈的創新紀元：法律及政策扮演的角色 Advancing Innovation in the Era of AI and Blockchain：The Role of Law and Policy",
    coverImage: conferenceImg1211,
    poster: poster1211,
    content: `
    (1) 時間：2018.12.11(二) 13:00 – 17:00
    (2) 地點：國立清華大學名人堂
    (3) 簡介：本中心很榮幸邀請到 UC Berkeley School of Law 的 Prof. Robert Merges 跟 Prof. Mark Cohen 參與「Advancing Innovation in the Era of AI and Blockchain：The Role of Law and Policy 人工智慧與區塊鏈的創新紀元：法律與政策扮演的角色」研討會。`,
    images: [
      {
        img: image12111,
      },
      {
        img: image12112,
      },
      {
        img: image12113,
      },
    ],
    minute: {
      title: "20181211- 會議記錄",
      url:
        "https://blpc.site.nthu.edu.tw/var/file/390/1390/img/3667/123668670.pdf",
    },
  },
  {
    date: "2018-10-26",
    title:
      "藉監理沙盒來促進台灣的能源轉型 --- 2018 年區塊鏈及加密貨幣監理沙盒倡議研習會",
    coverImage: conferenceImg,
    poster: poster1026,
    content: `Let Regulatory Sandboxes Facilitate Taiwan’s Energy Transition --- 2018 Workshop on Regulatory Sandboxes for Blockchain & Cryptocurrency Initiation
    (1) 時間：2018.10.26(五) 13:00 – 17:30    
    (2) 地點：國立清華大學名人堂`,
    images: [
      {
        img: image10261,
      },
      {
        img: image10262,
      },
      {
        img: image10263,
      },
    ],
    minute: {
      title: "20181026- 會議記錄",
      url:
        "https://blpc.site.nthu.edu.tw/var/file/390/1390/img/3667/123668670.pdf",
    },
  },
  {
    date: "2018-10-01",
    title: "2018年區塊鏈於專門職業領域之應用研習會",
    coverImage: conferenceImg,
    poster: poster1001,
    content: `
    (1) 時間：2018.10.01(一) 13:00 – 17:00
    (2) 地點：國立清華大學旺宏館三樓遠距教室B
    (3) 簡介："2018 年區塊鏈於專門職業領域之應用研習會"，由清大科法所范建得教授兼所長開場後，即展開精彩演講。本次的演講者跟與談者分別為：Malcolm Tan/ 新加坡 ICO 律師、楊明勳律師/眾勤法律事務所所長兼海納百川區塊鏈法律研究中心首席法律顧問、鄭淑芬副總/勤業眾信風險管理顧問股份有限公司、張孟傑經理/勤業眾信風險管理諮詢股份有限公司、王衍盛副總/東方億泰資本有限公司、朱俊嘉執行長/FundersToken 公司`,
    images: [
      {
        img: image10011,
      },
      {
        img: image10012,
      },
    ],
  },
];

export default conferencesInformation;
