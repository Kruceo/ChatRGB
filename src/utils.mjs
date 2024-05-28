/**
 * split the message in a part with the first command, and the args concatenated
 * @param {Message} discordMessage 
 * @returns {[string,string]}
 */
export function contentSplitter(discordMessage) {
    return discordMessage.content.split(" ").reduce((acc, next, i) => {
      if (i == 0) {
        acc[0] = next
        acc[1] = ""
      }
      else {
        acc[1] += " " + next
        acc[1] = acc[1].trim()
      }
      return acc
    }, [])
  }