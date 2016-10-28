const memwatch = require('memwatch-next');

// Take first snapshot
const a = {
  "code": 1000,
  "message": "",
  "data": {
    "timeStamp": "1477538108858",
    "list": [
      {
        "id": 1,
        "name": "总承包",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/zong%403x.png",
        "subList": [
          {
            "id": 1,
            "name": "建筑工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 2,
            "name": "市政工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 3,
            "name": "公路工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 4,
            "name": "铁路工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 5,
            "name": "机电工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 6,
            "name": "电力工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 7,
            "name": "通信工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 8,
            "name": "冶金工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 9,
            "name": "矿山工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 10,
            "name": "水利水电工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 11,
            "name": "石油化工工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 12,
            "name": "港口航道工程信息",
            "parentId": "1",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          }
        ]
      },
      {
        "id": 2,
        "name": "专业承包",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/zhuan%403x.png",
        "subList": [
          {
            "id": 13,
            "name": "地基基础工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 14,
            "name": "建筑装修装饰工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 15,
            "name": "建筑幕墙工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 16,
            "name": "预拌混凝土信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 17,
            "name": "园林古建筑工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 18,
            "name": "钢结构工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 19,
            "name": "消防设施工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 20,
            "name": "防水防腐保温工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 21,
            "name": "模板脚手架信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 22,
            "name": "起重设备安装工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 23,
            "name": "建筑机电安装工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 24,
            "name": "环保工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 25,
            "name": "桥梁工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 26,
            "name": "隧道工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 27,
            "name": "公路路面工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 28,
            "name": "公路路基工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 29,
            "name": "公路交通工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 30,
            "name": "铁路电务工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 31,
            "name": "铁路铺轨架梁工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 32,
            "name": "铁路电气化工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 33,
            "name": "输变电工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 34,
            "name": "电子与智能化工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 35,
            "name": "机场场道工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 36,
            "name": "机场空管工程及航站楼弱电系统工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 37,
            "name": "机场目视助航工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 38,
            "name": "港口与海岸工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 39,
            "name": "港航设备安装及水上交管工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 40,
            "name": "航道工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 41,
            "name": "通航建筑物工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 42,
            "name": "水工金属结构制作与安装工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 43,
            "name": "水利水电机电设备安装工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 44,
            "name": "核工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 45,
            "name": "海洋石油工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 46,
            "name": "城市及道路照明工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 47,
            "name": "特种专业工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 48,
            "name": "河湖整治工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 253,
            "name": "园林绿化工程信息",
            "parentId": "2",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          }
        ]
      },
      {
        "id": 3,
        "name": "施工劳务",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/laowubanzu%403x.png",
        "subList": [
          {
            "id": 49,
            "name": "建筑工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 50,
            "name": "市政工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 51,
            "name": "公路工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 52,
            "name": "铁路工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 53,
            "name": "机电工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 54,
            "name": "电力工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 55,
            "name": "通信工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 56,
            "name": "冶金工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 57,
            "name": "矿山工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 58,
            "name": "水利水电工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 59,
            "name": "石油化工工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 60,
            "name": "港口航道工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 61,
            "name": "地基基础工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 62,
            "name": "建筑装修装饰工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 63,
            "name": "建筑幕墙工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 64,
            "name": "预拌混凝土信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 65,
            "name": "园林古建筑工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 66,
            "name": "钢结构工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 67,
            "name": "消防设施工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 68,
            "name": "防水防腐保温工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 69,
            "name": "模板脚手架信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 70,
            "name": "起重设备安装工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 71,
            "name": "建筑机电安装工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 72,
            "name": "环保工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 73,
            "name": "桥梁工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 74,
            "name": "隧道工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 75,
            "name": "公路路面工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 76,
            "name": "公路路基工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 77,
            "name": "公路交通工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 78,
            "name": "铁路电务工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 79,
            "name": "铁路铺轨架梁工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 80,
            "name": "铁路电气化工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 81,
            "name": "输变电工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 82,
            "name": "电子与智能化工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 83,
            "name": "机场场道工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 84,
            "name": "机场空管工程及航站楼弱电系统工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 85,
            "name": "机场目视助航工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 86,
            "name": "港口与海岸工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 87,
            "name": "港航设备安装及水上交管工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 88,
            "name": "航道工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 89,
            "name": "通航建筑物工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 90,
            "name": "水工金属结构制作与安装工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 91,
            "name": "水利水电机电设备安装工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 92,
            "name": "核工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 93,
            "name": "海洋石油工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 94,
            "name": "城市及道路照明工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 95,
            "name": "特种专业工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 96,
            "name": "河湖整治工程信息",
            "parentId": "3",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          }
        ]
      },
      {
        "id": 4,
        "name": "采购租赁",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/caigou%403x.png",
        "subList": [
          {
            "id": 97,
            "name": "基础建材信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 98,
            "name": "钢材信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 99,
            "name": "防水材料信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 100,
            "name": "石材信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 101,
            "name": "管材管件信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 102,
            "name": "玻璃信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 103,
            "name": "木业信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 104,
            "name": "节能环保信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 105,
            "name": "新型建材信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 106,
            "name": "电工电气信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 107,
            "name": "阀门信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 108,
            "name": "园艺信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 109,
            "name": "钢结构信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 110,
            "name": "铁艺信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 111,
            "name": "电梯信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 112,
            "name": "门窗信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 113,
            "name": "地板信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 114,
            "name": "洁具信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 115,
            "name": "陶瓷信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 116,
            "name": "涂料信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 117,
            "name": "油漆信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 118,
            "name": "吊顶信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 119,
            "name": "楼梯信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 120,
            "name": "灯具信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 121,
            "name": "五金信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 122,
            "name": "铝型材信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 123,
            "name": "板材信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 124,
            "name": "橱柜厨具信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 125,
            "name": "家具信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 126,
            "name": "家电信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 127,
            "name": "家居信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 128,
            "name": "家纺信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 129,
            "name": "窗帘信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 130,
            "name": "布艺信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 131,
            "name": "幕墙壁纸信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 132,
            "name": "采暖信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 133,
            "name": "锁具信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 134,
            "name": "地下工程机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 135,
            "name": "水平运输机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 136,
            "name": "垂直运输机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 137,
            "name": "土石方机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 138,
            "name": "周转材料信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 139,
            "name": "路面机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 140,
            "name": "桩工机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 141,
            "name": "起重机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 142,
            "name": "轨道机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 143,
            "name": "加工机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 144,
            "name": "作业辅助机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 145,
            "name": "混凝土机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 146,
            "name": "焊接机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 147,
            "name": "泵类机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 148,
            "name": "动力设备信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          },
          {
            "id": 149,
            "name": "其他机械信息",
            "parentId": "4",
            "forCompany": true,
            "forPerson": true,
            "needQualify": false
          }
        ]
      },
      {
        "id": 5,
        "name": "工程勘察",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/kancha%403x.png",
        "subList": [
          {
            "id": 150,
            "name": "岩土工程信息",
            "parentId": "5",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 151,
            "name": "水文地质信息",
            "parentId": "5",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 152,
            "name": "工程测量信息",
            "parentId": "5",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          }
        ]
      },
      {
        "id": 6,
        "name": "工程设计",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/sheji%403x.png",
        "subList": [
          {
            "id": 153,
            "name": "建筑信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 154,
            "name": "公路信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 155,
            "name": "铁道信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 156,
            "name": "市政信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 157,
            "name": "电力信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 158,
            "name": "煤炭信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 159,
            "name": "冶金信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 160,
            "name": "军工信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 161,
            "name": "机械信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 162,
            "name": "轻纺信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 163,
            "name": "建材信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 164,
            "name": "水运信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 165,
            "name": "农林信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 166,
            "name": "水利信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 167,
            "name": "海洋信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 168,
            "name": "民航信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 169,
            "name": "商物粮信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 170,
            "name": "核工业信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 171,
            "name": "石油天然气信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 172,
            "name": "化工石化医药信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 173,
            "name": "电子通信广电信息",
            "parentId": "6",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          }
        ]
      },
      {
        "id": 7,
        "name": "工程监理",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/jianli%403x.png",
        "subList": [
          {
            "id": 174,
            "name": "房屋建筑工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 175,
            "name": "市政公用工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 176,
            "name": "机电安装工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 177,
            "name": "公路工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 178,
            "name": "铁路工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 179,
            "name": "电力工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 180,
            "name": "冶炼工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 181,
            "name": "矿山工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 182,
            "name": "农林工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 183,
            "name": "通信工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 184,
            "name": "化工石油工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 185,
            "name": "水利水电工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 186,
            "name": "航天航空工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 187,
            "name": "港口与航道工程信息",
            "parentId": "7",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          }
        ]
      },
      {
        "id": 8,
        "name": "造价服务",
        "iconUrl": "http://ljapp1.oss-cn-shenzhen.aliyuncs.com/zaojia%403x.png",
        "subList": [
          {
            "id": 188,
            "name": "建筑工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 189,
            "name": "市政工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 190,
            "name": "公路工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 191,
            "name": "铁路工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 192,
            "name": "机电工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 193,
            "name": "电力工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 194,
            "name": "通信工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 195,
            "name": "冶金工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 196,
            "name": "矿山工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 197,
            "name": "水利水电工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 198,
            "name": "石油化工工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          },
          {
            "id": 199,
            "name": "港口航道工程信息",
            "parentId": "8",
            "forCompany": true,
            "forPerson": false,
            "needQualify": true
          }
        ]
      }
    ]
  }
};

const hd = new memwatch.HeapDiff();

function b() {
  this.c = Object.assign({}, a);
  this.c.a = a;
  return this.c;
}

for (let i = 0; i < 1000000; i++) {
  b();
}
// Take the second snapshot and compute the diff
const diff = hd.end();

console.log(diff);
