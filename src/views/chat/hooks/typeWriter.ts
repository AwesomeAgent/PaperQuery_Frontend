export class TypewriterQueue {
  private queue: string[] = []
  private store: any
  constructor(queue: string[], store: any) {
    this.queue = queue
    this.store = store
  }

  // 将字符串中的每个字符依次放入队列
  addString(str: string): void {
    for (const char of str) {
      this.queue.push(char)
    }
  }

  // 模拟打字效果，delay控制每个字符之间的延迟时间

  typeOut(delay: number = 100): void {
    const index = this.store.state.messageList.length - 1
    const typeNextChar = () => {
      if (this.queue.length > 0) {
        const char = this.queue.shift()
        if (char !== undefined) {
          this.store.commit('appendMessageByIndex', {
            index: index,
            text: char,
          })
          // console.log(char)
          setTimeout(typeNextChar, delay)
        }
      } else {
        console.log() // 打印换行
      }
    }
    typeNextChar()
  }
}
