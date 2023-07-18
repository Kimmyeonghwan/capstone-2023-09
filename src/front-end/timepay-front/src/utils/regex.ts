export const passwordRegex =
  /(?=.*\d{1,10})(?=.*[!@#$%^&*,./?]{1,20})(?=.*[a-zA-Z]{1,20}).{10,20}$/;

export const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;

export const companyRegistrationNumber = /^[0-9]{10}$/;

export const koreanRegex = /^[ㄱ-ㅎ가-힣]+$/;

export const englishRegex = /^[a-zA-Z]+$/;

export const numberRegex = /^[0-9]+$/;
