export enum HeadType {
  CHAT = 'chat',
  FEELING = 'feeling',
  IDEA = 'idea',
}

export const HEAD_TYPE_KOREAN = {
  [HeadType.CHAT]: '정책콘텐츠',
  [HeadType.FEELING]: '일상',
  [HeadType.IDEA]: '아이디어',
};
