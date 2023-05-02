import { Role, User } from './types';

export const users: User[] = [
  {
    id: 1,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'khris@example.com',
    role: Role.USER,
    name: '강정모',
  },
  {
    id: 2,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'charles@example.com',
    role: Role.USER,
    name: '최용철',
  },
  {
    id: 3,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'chan@example.com',
    role: Role.USER,
    name: '임주찬',
  },
];

export const DOCUMENT_DUMMY = [
  {
    id: 1,
    title: '주민등록초본',
    file: '서류1', //나중에 다운받을 파일 넣어줘야..?
  },
  {
    id: 2,
    title: '가족관계증명서',
    file: '서류2', //나중에 다운받을 파일 넣어줘야..?
  },
  {
    id: 3,
    title: '지방세 세목별 과세증명서',
    file: '서류3', //나중에 다운받을 파일 넣어줘야..?
  },
];

export const POST_DUMMY = [
  {
    id: 1,
    titleShort: '정책명',
    titleLong: '콘텐츠 제목 어쩌구 저쩌구 이렇게 길게 씁니다 ',
    contentShort: '정책 간단 한 줄 소개',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
  },
];

export const TAB_DATA = [
  {
    id: 1,
    text: '주민등록등본과 초본',
    body: `내용상으로는 주민등록(표)등본은 가족의 내용이 모두 적혀있다면, 주민등록(표)초본은 개인을 중심으로한 내용이 적혀있어! 발급은 정부24에서 온라인으로도 받을 수 있어! \n `,
    imgPath: `residentCertificate.png`,
    imgSize: 32,
  },
  {
    id: 2,
    text: '중위소득',
    boldBody: `전 국민을 소득에 따라 1등부터 꼴등까지 줄 세웠을 때 중앙에 위치한 사람의 소득을 의미해. 보건복지부는 여기에 여러 경제지표를 고려해 ‘기준중위소득‘을 발표하는데, 이 지표를 정책 대상 선정에 많이 활용해. 아래 표는 2023년도 기준중위소득이야. \n`,
    body: `‘3인가구 기준 중위소득의 150% 이하’라는 기준이 있다면, 우리 가구 소득이 약 666만원(약 444만 원*1.5=666만)이면 해당하겠지!`,
    imgPath: `midIncome.png`,
    imgSize: 40,
  },
  {
    id: 3,
    text: '서류 발급',
    boldBody: '서류를 어디서 발급해야할지부터 모르겠다면?',
    body: '서류명을 클릭해 발급 사이트로 편리하게 이동해봐!',
    bodyComponent: 'LinkList',
  },
];

export const DOC_DOWNLOAD = [
  {
    id: 1,
    document: '가족관계증명서',
    url: 'https://efamily.scourt.go.kr/pt/PtFrrpApplrInfoInqW.do?menuFg=02',
  },
  {
    id: 2,
    document: '주민등록등본',
    url: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000015',
  },
  {
    id: 3,
    document: '주민등록초본',
    url: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000015',
  },
  {
    id: 4,
    document: '지방세 세목별 과세증명서',
    url: '지방세 세목별 과세증명서',
  },
  {
    id: 5,
    document: '소득금액증명원',
    url: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=&CappBizCD=12100000021',
  },
  {
    id: 6,
    document: '기초생활수급자 증명서',
    url: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=&CappBizCD=14600000280',
  },
  {
    id: 7,
    document: '한부모 가족 증명서',
    url: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=&CappBizCD=10601000001',
  },
  {
    id: 8,
    document: '동물등록증 재발급',
    url: 'https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09008&CappBizCD=15410000007&tp_seq=01',
  },
  {
    id: 9,
    document: '국가동물정보보호시스템',
    url: 'https://www.animal.go.kr/front/awtis/mypage/registAnimalList.do?menuNo=8000300009',
  },
];
