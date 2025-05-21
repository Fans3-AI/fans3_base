/**
* @function Add an event listener to the target element
* @description Add an event listener to the target element
* @param {HTMLElement} The element that needs to be monitored, if empty, defaults to window.document
* @param {String} event name
* @param {Function} Callback
* @param {Object} Options for listening to events
* @return {void} Returns the function to stop listening
* @example
*   useListenEvent(btnEl, 'click', () => { console.log('click btn');});
*/
export function useListenEvent(event: string, handler: Function, options: object): () => any;
export function useListenEvent(
  target: HTMLElement, event: string, handler: Function, options: object,
): () => any;
export function useListenEvent(...args: any[]) {
  let target = window?.document;
  let event = '';
  let handler = () => {};
  let options = {};

  if (typeof args[0] === 'string') {
    [event, handler, options] = args;
  } else {
    [target, event, handler, options] = args;
  }

  if (!target) {
    return;
  }

  target?.addEventListener(event, handler, options);

  return () => {
    target?.removeEventListener(event, handler, options);
  };
}
