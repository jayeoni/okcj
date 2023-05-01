export enum HeadType {
  CONTENTS = 'CONTENTS',
  DAILY = 'DAILY',
  IDEA = 'IDEA',
}

export const HEAD_TYPE_KOREAN = {
  [HeadType.CONTENTS]: '정책콘텐츠',
  [HeadType.DAILY]: '일상',
  [HeadType.IDEA]: '아이디어',
};
