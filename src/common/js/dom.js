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
