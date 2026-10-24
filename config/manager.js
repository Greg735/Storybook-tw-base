/**
 * @file Storybook manager helpers shared by the projects using storybook-tw-base.
 *
 * Usage in a project's .storybook/manager.js:
 *
 *   import { addons } from 'storybook/manager-api';
 *   import { sidebar } from 'storybook-tw-base/manager';
 *   addons.setConfig({ sidebar });
 *
 * In the sidebar, an icon marks the components that come from storybook-tw-base:
 * a box when the project uses them as is, a pencil when it overrides some of
 * their files (template, styles or behaviors). Project components have no icon.
 * The origin comes from the tags added by storybookIndexers() (storybook.js),
 * which can also be used in the sidebar tag filter.
 */
import { createElement } from 'react';
import { BoxIcon, EditIcon } from '@storybook/icons';

// Same values as BASE_TAG and OVERRIDDEN_TAG in storybook.js (Node side).
const BASE_TAG = 'storybook-tw-base';
const OVERRIDDEN_TAG = 'storybook-tw-base-overridden';

const ORIGINS = [
  {
    tag: OVERRIDDEN_TAG,
    Icon: EditIcon,
    color: '#d97706',
    title: 'storybook-tw-base component, overridden by the project',
  },
  { tag: BASE_TAG, Icon: BoxIcon, color: '#9ca3af', title: 'storybook-tw-base component, not overridden' },
];

/**
 * Sidebar label: the item name, followed by the origin icon on components and
 * groups whose stories all come from storybook-tw-base.
 */
export const renderLabel = (item) => {
  const origin = ['component', 'group'].includes(item.type) && ORIGINS.find(({ tag }) => item.tags?.includes(tag));
  if (!origin) {
    return item.name;
  }
  return createElement(
    'span',
    { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } },
    item.name,
    createElement(
      'span',
      { title: origin.title, 'aria-label': origin.title, style: { display: 'inline-flex', color: origin.color } },
      createElement(origin.Icon, { size: 12, 'aria-hidden': true }),
    ),
  );
};

export const sidebar = { renderLabel };
