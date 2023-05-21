export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^\d+$/;
export const GROUP_REGEXP = /^group-[0-9]{1,3}/;
export const VALIDATE_CONFIG = {
   requiredMessage: "Обязательное поле",
   emailMessage: "Email не соотвествует формату электронной почты",
   passwordMesssage: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру",
   groupMesssage: "Группа должна соответствовать формату group- N группы"
}
export const INITIAL_VALUE_RATING = 1;
export const SORTED = {
   LOW: "low",
   CHEAP: "cheap",
   SALE: "sale"
}