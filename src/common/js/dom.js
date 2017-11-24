export function hasclass(el, classname) {
  let reg = new RegExp('(^|\\s)' + classname + '(\\s|$)')
  return reg.test(el.className)
}
export function addclass(el, className) {
  if (hasclass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function getData(element, name, value) {
  let prefix = 'data-'
  if (value) {
    return element.setAttribute(prefix + name, value)
  }
  return element.getAttribute(prefix + name)
}