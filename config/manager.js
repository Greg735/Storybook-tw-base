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
 *
 * Importing this module also hides the addon panel on the stories tagged
 * "no-panel" (the Introduction), and shows it again on the other stories.
 */
import { createElement } from 'react';
import { BoxIcon, EditIcon } from '@storybook/icons';
import { STORY_CHANGED, STORY_RENDERED } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';

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

// Stories tagged with it have no addon panel (story parameters cannot do it:
// the panel options of a story are only applied on the first page load).
export const NO_PANEL_TAG = 'no-panel';

addons.register('storybook-tw-base/no-panel', (api) => {
  const update = () => {
    const story = api.getCurrentStoryData();
    if (story?.type !== 'story') {
      return;
    }
    const hide = Boolean(story.tags?.includes(NO_PANEL_TAG));
    if (api.getIsPanelShown() === hide) {
      api.togglePanel(!hide);
    }
  };
  // STORY_CHANGED is not emitted for the first story of the page load.
  api.on(STORY_CHANGED, update);
  api.on(STORY_RENDERED, update);
});
