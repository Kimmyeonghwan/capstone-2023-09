export const API_URL = {
  DEAL_BOARDS: '/api/deal-boards',
  DEAL_BOARDS_DELETE: '/api/deal-boards/delete',
  DEAL_BOARDS__SEARCH: 'deal-boards/search',
  DEAL_REPORT: '/deal-boards/:id/report',
  DEAL_BOARDS_COMMENT: '/api/deal-boards/comments',
  DEAL_BOARDS_COMMENT_APPLIED: (boardId: number) =>
    `api/deal-boards/comments/${boardId}/applied`,
  DEAL_BOARDS_COMMENT_WRITE: '/api/deal-boards/comments/write',
  DEAL_BOARDS_COMMENT_DELETE: '/api/deal-boards/comments/delete',
  DEAL_BOARDS_COMMENTS_ADOPTED: (boardId: number) =>
    `/api/deal-boards/comments/${boardId}/adopted`,
  FREE_BOARDS: '/api/free-boards',
  FREE_BOARDS_WRITE: '/api/deal-boards/write/helper', // 같이쓰기
  DEAL_BOARDS_WRITE: '/api/deal-boards/write/help', // 도움받기
  INQUIRY_WRITE: '/api/inquiry-boards/write',
  INQUIRY: 'api/inquiry-boards',
  NOTIFICATIONS: 'api/notifications',
  ORGANIZATIONS_REGISTER: '/api/organizations/register',
  ORGANIZATIONS_LOGIN: '/api/organizations/login',
  ORGANIZATIONS_LOGOUT: '/api/organizations/logout',
  ORGANIZATIONS_EDIT: '/api/organizations/update',
  ORGANIZATIONS_DELETE: '/api/organizations/delete',
  USER_INFO_GET: '/api/users/mypage/',
  USER_INFO_POST: '/api/users/create/',
  USER_INFO_PUT: '/api/users/mypage/update',
  MY_VOLUNTEER: '/api/users/mypage/certification',
  USERS__CATEGORY: '/api/users/category',
  API_USERS__MYPAGE__BOARD: '/api/users/mypage/board',
  API_USERS__MYPAGE__COMMENT: '/api/users/mypage/comment',
  LOGOUT: '/api/users/logout',
  DELETE: '/api/users/delete',
  INSTANT_MATCHING: '/api/instant-matching',
  DEVICE_UPDATE: '/api/users/mypage/update/token',
  DONATION_WRITE: '/api/organizations/donate/write',
  DONATION_BOARD_ID: '/api/donate',
  DONATE_TIMEPAY: '/api/donate/timepay',
  DONATE_BOARDS: '/api/donate',
  AGENT: '/api/users/applicants', //신청인이 대리인을 조회
  AGENT__REGISTER: '/api/users/applicants/register', //신청인이 대리인을 등록
  AGENT__DELETE: '/api/users/applicants', //신청인이 대리인을 삭제
  APPLICANT: '/api/users/agents', //대리인이 신청인을 조회 및 관리
  APPLICANT__WAITING: '/api/users/agents/waiting', //대리인이 받은 신청 목록을 조회
  APPLICANT__APPLY: '/api/users/agents/waiting/apply', //대리인이 신청을 수락 및 거절
  APPLICANT__TRANS: '/api/users/agents/trans', //대리인의 신청인의 계정으로 전환
  DONATION_BOARD_EDIT: '/api/organizations/donate/update',
  DONATION_BOARD_DELETE: '/api/organizations/donate/delete',
  ORGANIZATION__MY_PAGE__CERTIFICATE: '/api/organizations/mypage/certificate', // 특정활동 게시글 봉사활동 인증서 발급 현황
  ORGANIZATION__MY_PAGE__PUBLISH:
    '/api/organizations/mypage/certificate/publish', // 특정 유저 게시글 봉사활동 인증서 발급
  MY_CERTIFICATION: '/api/users/mypage/certification',
  ORGANIZATION_DONATE_MY_PAGE: '/api/organizations/donate/mypage',
};

// 토큰 필요 없는 애들
export const HEADER_NOT_REQUIRED_URLS = [
  API_URL.DEAL_BOARDS,
  API_URL.ORGANIZATIONS_REGISTER,
  API_URL.ORGANIZATIONS_LOGIN,
];

// form data로 전송 필요한 url
export const FORM_DATA_REQUIRED_URLS = [
  API_URL.ORGANIZATIONS_REGISTER,
  API_URL.ORGANIZATIONS_EDIT,
  API_URL.USER_INFO_POST,
  API_URL.USER_INFO_PUT,
  API_URL.DEAL_BOARDS_WRITE,
  API_URL.FREE_BOARDS_WRITE,
  API_URL.ORGANIZATION__MY_PAGE__PUBLISH,
];
