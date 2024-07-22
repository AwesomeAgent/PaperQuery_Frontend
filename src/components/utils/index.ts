// src/components/utils/index.ts
export function cn(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}

/**
 * 计算字符串的实际显示长度
 * @param str - 要计算的字符串
 * @returns 实际显示长度
 */
export const calculateLength = (str: string): number => {
  let length = 0;
  for (let char of str) {
    if (char.match(/[^\x00-\xff]/)) {
      // 中文字符长度为2
      length += 2;
    } else {
      // 英文字符长度为1
      length += 1;
    }
  }
  return length;
};

/**
 * 根据最大长度截取字符串
 * @param str - 要截取的字符串
 * @param maxLength - 最大长度
 * @returns 截取后的字符串
 */
export const truncateString = (str: string, maxLength: number): string => {
  let length = 0;
  let result = '';
  for (let char of str) {
    if (char.match(/[^\x00-\xff]/)) {
      if (length + 2 > maxLength) {
        return result + '...';
      }
      length += 2;
    } else {
      if (length + 1 > maxLength) {
        return result + '...';
      }
      length += 1;
    }
    result += char;
  }
  return result;
};

/**
 * 格式化名称，超过指定长度显示省略号
 * @param name - 要格式化的名称
 * @param maxLength - 最大长度
 * @returns 格式化后的名称
 */
export const formatName = (name: string, maxLength: number): string => {
  if (calculateLength(name) > maxLength) {
    return truncateString(name, maxLength);
  } else {
    return name;
  }
};
