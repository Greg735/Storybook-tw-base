import animationsDocs from './animations.docs.md?raw';

export default {
  title: 'Utilities/Animations',
  parameters: {
    docs: {
      description: {
        component: animationsDocs,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    offset: {
      control: { type: 'number' },
      description: 'Offset to trigger animation (default: 100)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 100 },
      },
    },
    duration: {
      control: { type: 'number' },
      description: 'Duration of the animation in milliseconds (default: 400)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 800 },
      },
    },
    animation: {
      control: { type: 'select' },
      options: [
        'fadeIn',
        'slideInLeft',
        'slideInRight',
        'slideInDown',
        'slideInUp',
        'zoomIn',
        'zoomOut',
        'rotateIn',
        'bounceIn',
        'bounceInLeft',
        'bounceInRight',
        'bounceInDown',
        'bounceInUp',
        'flipInX',
        'flipInY',
      ],
      description: 'The type of animation',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'fadeIn' },
      },
    },
  },
};

const Template = (args) => {
  return `
    <div class="text-bg-primary px-12 py-28" >
      <h1 data-cue="${args.animation}" data-duration="${args.duration}">Animated Content <br>${args.animation}<br>${args.duration} ms</h1>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
  offset: 100,
  duration: 800,
  animation: 'fadeIn',
};

export const SlideInUp = Template.bind({});
SlideInUp.args = {
  offset: 150,
  duration: 800,
  animation: 'slideInUp',
};

export const SlideInRight = Template.bind({});
SlideInRight.args = {
  offset: 150,
  duration: 800,
  animation: 'slideInRight',
};

export const SlideInLeft = Template.bind({});
SlideInLeft.args = {
  offset: 150,
  duration: 800,
  animation: 'slideInLeft',
};

export const SlideInDown = Template.bind({});
SlideInDown.args = {
  offset: 150,
  duration: 800,
  animation: 'slideInDown',
};

export const ZoomIn = Template.bind({});
ZoomIn.args = {
  offset: 200,
  duration: 800,
  animation: 'zoomIn',
};

export const ZoomOut = Template.bind({});
ZoomOut.args = {
  offset: 200,
  duration: 800,
  animation: 'zoomOut',
};

export const RotateIn = Template.bind({});
RotateIn.args = {
  offset: 250,
  duration: 1000,
  animation: 'rotateIn',
};

export const BounceIn = Template.bind({});
BounceIn.args = {
  offset: 250,
  duration: 1000,
  animation: 'bounceIn',
};

export const BounceInLeft = Template.bind({});
BounceInLeft.args = {
  offset: 250,
  duration: 1000,
  animation: 'bounceInLeft',
};

export const BounceInRight = Template.bind({});
BounceInRight.args = {
  offset: 250,
  duration: 1000,
  animation: 'bounceInRight',
};

export const BounceInUp = Template.bind({});
BounceInUp.args = {
  offset: 250,
  duration: 1000,
  animation: 'bounceInUp',
};

export const BounceInDown = Template.bind({});
BounceInDown.args = {
  offset: 250,
  duration: 1000,
  animation: 'bounceInDown',
};

export const FlipInX = Template.bind({});
FlipInX.args = {
  offset: 250,
  duration: 1000,
  animation: 'flipInX',
};

export const FlipInY = Template.bind({});
FlipInY.args = {
  offset: 250,
  duration: 1000,
  animation: 'flipInY',
};
