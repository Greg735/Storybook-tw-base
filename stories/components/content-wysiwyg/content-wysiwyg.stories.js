import TwigContentWysiwyg from '@components/content-wysiwyg/content-wysiwyg.twig';
import ContentWysiwygDocs from './content-wysiwyg.docs.md?raw';
import ContentWysiwygSource from '@components/content-wysiwyg/content-wysiwyg.twig?raw';

export default {
  title: 'Components/Content WYSIWYG',
  parameters: {
    componentSource: {
      code: ContentWysiwygSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: ContentWysiwygDocs,
      },
    },
  },
  argTypes: {
    content: {
      name: 'Wysiyig content',
      description: 'Simple html text from wysiwyg editor',
      control: {
        type: 'text',
      },
    },
    content_classes: {
      control: 'array',
      description: 'Array of classes',
      table: {
        type: { summary: 'array' },
      },
    },
  },
  args: {
    content:
      '<p>Nullam at felis ac lacus hendrerit ultricies. <a href="#">Nullam consectetur vitae</a> massa non aliquet. Nunc et felis diam. Nam efficitur auctor finibus. Nullam ullamcorper nisi vel quam ultricies, vestibulum sodales odio condimentum. Sed bibendum magna in pulvinar efficitur. Vestibulum faucibus tortor quis ex iaculis, a semper felis tincidunt. Quisque imperdiet aliquet nulla, in auctor mauris faucibus eu. In sed dapibus turpis. Vestibulum dictum pulvinar mauris, sit amet vulputate justo venenatis in. In hac habitasse platea dictumst.</p><ul><li>List one</li><li>List two</li></ul><ol><li>Ordered List one</li><li>Ordered List two</li></ol><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus purus eget libero tempor, imperdiet mollis velit finibus. Curabitur in sollicitudin libero. Phasellus accumsan nisi ac orci viverra, ac laoreet nisl consequat. Nullam dignissim nec purus et semper. Curabitur lacinia leo ut sapien laoreet, et pulvinar nulla tristique. Donec tempus leo vitae dolor fringilla sagittis. Nulla maximus feugiat vestibulum. Donec bibendum non nulla ut accumsan. Fusce et erat in dui tincidunt imperdiet eu in odio. Pellentesque euismod rhoncus ex, quis pulvinar tortor rhoncus eget. Vivamus ac massa id massa finibus gravida. In in sodales dolor. Quisque iaculis volutpat egestas.</p><p>Suspendisse vulputate fermentum neque, vel dictum massa consequat a. Integer convallis purus et volutpat luctus. Nam consequat urna eget ornare accumsan. Curabitur pharetra enim in sapien aliquam semper. Vestibulum ut urna euismod, ullamcorper ex nec, posuere felis. Sed ut quam et sem malesuada blandit. Mauris id interdum lectus, quis ultrices lorem. Duis pellentesque egestas lectus vel sollicitudin. Ut blandit volutpat orci.</p>',
    content_classes: [''],
  },
};

const Template = (args) => TwigContentWysiwyg(args);

export const Default = Template.bind({});

export const Lighter = Template.bind({});
Lighter.args = {
  ...Default.args,
  content_classes: ['[font-weight:lighter]'],
};
