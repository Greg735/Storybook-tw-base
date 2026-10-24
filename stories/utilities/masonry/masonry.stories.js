import masonryDocs from './masonry.docs.md?raw';

export default {
  title: 'Utilities/Masonry',
  parameters: {
    docs: {
      description: {
        component: masonryDocs,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

const Template = () => {
  return `
<section class="py-12">
    <div class="container">
        <div class="-mx-0.5 -mt-1 flex flex-wrap" data-masonry='{"percentPosition": true }'>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
                <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/391-1920x1080.jpg" alt="image" width="1920" height="1080">
            </div>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
                <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/390-1920x1080.jpg" alt="image" width="1920" height="1080">
            </div>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
                <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/22-700x415.jpg" alt="image" width="700" height="415">
            </div>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
                <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/1-1920x1080.jpg" alt="image" width="1920" height="1080">
            </div>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
                <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/2-700x900.jpg" alt="image" width="700" height="900">
            </div>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
            <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/3-1920x1080.jpg" alt="image" width="1920" height="1080">
            </div>
            <div class="mt-1 w-full px-0.5 sm:w-1/2 md:w-1/3">
                <img data-cue="fadeIn" data-duration="1800" loading="lazy" class="h-auto max-w-full" src="/img/stories/picsum/4-700x1200.jpg" alt="image" width="700" height="1200">
            </div>
        </div>
    </div>
</section>
  `;
};

export const Default = Template.bind({});
