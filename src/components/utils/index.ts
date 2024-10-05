import moment from 'moment'

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

/**
 * 格式化时间
 * @param time - 时间字符串
 * @returns 格式化后的时间
 */
export const formatterTime = (timestamp :string ) => {
  if (!timestamp) {
    return ''
  }

  // 确保时间戳为毫秒级别
  let createTime = parseInt(timestamp, 10)
  if (timestamp.length === 10) {
    createTime *= 1000 // 秒级时间戳转成毫秒
  }

  const now = moment()
  const inputTime = moment(createTime)
  const diffInMinutes = now.diff(inputTime, 'minutes')
  const diffInHours = now.diff(inputTime, 'hours')

  if (diffInMinutes < 60) {
    return `${diffInMinutes} 分钟前`
  } else if (diffInHours < 24) {
    return `${diffInHours} 小时前`
  } else {
    return inputTime.format('YYYY-MM-DD')
  }
}
