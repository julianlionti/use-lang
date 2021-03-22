import React from 'react'

const searchForTag = (
  str: string,
  finalElements: JSX.Element[],
  element?: JSX.Element | null,
): JSX.Element[] => {
  const indexAttr = str.indexOf('<')
  const indexAttrFinal = str.indexOf('>')
  const firstSub = str.substring(0, indexAttr)

  if (!firstSub.includes('<') && indexAttr > 0) {
    finalElements.push(<span key={firstSub}>{firstSub}</span>)
    str = str.substring(indexAttr, str.length)

    if (str) {
      return searchForTag(str, finalElements)
    }
  }

  if (indexAttr === 0) {
    const tag = str.substring(indexAttr + 1, indexAttrFinal)
    const isA = tag.includes('a')
    let href = ''
    const finalTag = `</${tag}>`
    const indexOfFinal = str.indexOf(isA ? '</a>' : `</${tag}>`)
    const innerText = str.substring(indexAttrFinal + 1, indexOfFinal)

    if (isA) {
      const [link] = str.match(/href="(.*?)"/g) || []
      href = link.replace('href=', '').replaceAll('"', '').replaceAll("'", '')
    }

    const hasInnerTag = innerText.includes('<')
    const finalElemet = React.createElement(isA ? 'a' : tag, {
      children: innerText,
      key: innerText,
      href,
      target: isA ? '_blank' : undefined,
    })

    if (hasInnerTag) {
      finalElements.push(finalElemet)
      searchForTag(innerText, finalElements, finalElemet)
    }

    if (!element && !hasInnerTag) {
      finalElements.push(finalElemet)
    }

    if (element && !hasInnerTag) {
      const indexOfAct = finalElements.indexOf(element)
      finalElements[indexOfAct] = React.cloneElement(element, { children: finalElemet })
    }

    str = str.substring(indexOfFinal + finalTag.length, str.length)
    if (str) {
      return searchForTag(str, finalElements)
    }
  } else {
    finalElements.push(<span key={str}>{str}</span>)
    return finalElements
  }

  return finalElements
}

export const AttrString = (str: string): JSX.Element[] => {
  return str
    .replace(/<\/p>/gi, '')
    .split('<p>')
    .filter((e) => e)
    .map((para) => {
      const elems: JSX.Element[] = []
      searchForTag(para, elems)
      return React.createElement('p', { children: elems })
    })
}
