import * as treemap from './treemap';

/**
 * This file implements the "old" webtreemap API, which provided a single
 * "appendTreemap" function on window.
 */

/** OldData is the shape of the old data format. */
export interface OldData {
  data: {
    '$area': number,
  };
  name: string;
  children?: OldData[];
}

/** transform transforms the old data format to the new one. */
export function transform(old: OldData): treemap.Data {
  return {
    size: old.data['$area'],
    caption: old.name,
    children: old.children ? old.children.map(transform) : undefined,
  };
}

/** render implements the backward-compatible API. */
export function render(
    container: HTMLElement, oldData: OldData,
    options = treemap.newCaptionOptions()) {
  const tm = new treemap.TreeMap(transform(oldData), options);
  tm.render(container);
}
